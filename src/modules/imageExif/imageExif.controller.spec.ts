import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ImageExifController } from './imageExif.controller';
import { ImageExifService } from './imageExif.service';

describe('ImageExifController', () => {
  let controller: ImageExifController;
  let service: ImageExifService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageExifController],
      providers: [
        ImageExifService,
        {
          provide: getModelToken('ImageExif'),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ImageExifController>(ImageExifController);
    service = module.get<ImageExifService>(ImageExifService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('compress', () => {
    it('should return an local path and metadata exif', async () => {
      const serviceCompressSpy = jest.spyOn(service, 'compress');

      const body = {
        url: 'https://assets.storage.trakto.io/AkpvCuxXGMf3npYXajyEZ8A2APn2/0e406885-9d03-4c72-bd92-c6411fbe5c49.jpeg',
        compress: 0.8,
      };

      const response = await controller.compress(body);

      expect(serviceCompressSpy).toHaveBeenCalled();

      expect(response).toEqual(
        expect.objectContaining({
          localPath: {
            original: expect.any(String),
            thumb: expect.any(String),
          },
          metadata: expect.any(Object),
        }),
      );
    });

    it('should return an error with 400 status code and message', async () => {
      const serviceCompressSpy = jest.spyOn(service, 'compress');

      const body = {
        url: 'https://assets.storage.trakto.io/AkpvCuxXGMf3npYXajyEZ8A2APn2/0e406885-9d03-4c72-bd92-c6411fbe5c49.jpe',
        compress: 0.8,
      };

      try {
        await controller.compress(body);
      } catch (error) {
        expect(serviceCompressSpy).toHaveBeenCalled();
        expect(error.response).toEqual(
          expect.objectContaining({
            statusCode: 400,
            message: 'A url é incorreta ou não é uma imagem',
            error: 'Bad Request',
          }),
        );
      }
    });
  });
});
