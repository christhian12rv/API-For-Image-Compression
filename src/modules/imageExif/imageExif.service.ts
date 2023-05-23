import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageExif } from './model/imageExif.model';
import { CompressView } from './view/compress.view';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class ImageExifService {
  constructor(
    @InjectModel('ImageExif')
    private readonly imageExifModel: Model<ImageExif>,
  ) {}

  async compress(compressData: CompressView): Promise<object> {
    const { url, compress } = compressData;

    if (compress < 0 || compress > 0.9) {
      throw new BadRequestException(
        'O fator de compressão deve ser entre 0 e 0.9',
      );
    }

    if (!url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/g)) {
      throw new BadRequestException('A url é incorreta ou não é uma imagem');
    }

    const extname = path.extname(url);

    const response = await fetch(url);

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const randomFileName = this.getRandomFileName();
    const pathToOriginalFile = `${path.resolve()}/images/${
      randomFileName + extname
    }`;

    await fs.writeFileSync(pathToOriginalFile, buffer);

    const sharpImage = await sharp(buffer);
    const originalSharpImage = sharpImage;
    const originalMetaData = await sharpImage.metadata();

    const largerDimension =
      originalMetaData.height > originalMetaData.width ? 'height' : 'width';

    if (originalMetaData[largerDimension] > 720) {
      sharpImage.resize({
        ...{ [largerDimension]: 720 },
      });
    }

    sharpImage.png({
      compressionLevel: compress * 10,
    });

    const compressedImageBuffer = await sharpImage.toBuffer();

    const pathToCompressedFile = `${path.resolve()}/images/${randomFileName}_thumb${path.extname(
      url,
    )}`;

    await fs.writeFileSync(pathToCompressedFile, compressedImageBuffer);

    await this.imageExifModel.create({
      name: randomFileName,
      path: pathToOriginalFile,
      compressedPath: pathToCompressedFile,
      exif: !!originalMetaData.exif
        ? JSON.stringify(originalMetaData.exif)
        : '',
    });

    return {
      localPath: {
        original: pathToOriginalFile,
        thumb: pathToCompressedFile,
      },
      metadata: {
        ...(await originalSharpImage.metadata()).exif,
      },
    };
  }

  private getRandomFileName(): string {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const random = ('' + Math.random()).substring(2, 8);
    const randomNumber = timestamp + random;
    return randomNumber;
  }
}
