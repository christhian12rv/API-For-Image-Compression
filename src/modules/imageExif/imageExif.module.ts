import { Module } from '@nestjs/common';
import { ImageExifService } from './imageExif.service';
import { ImageExifController } from './imageExif.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageExifModel } from './model/imageExif.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ImageExif',
        schema: ImageExifModel,
      },
    ]),
  ],
  providers: [ImageExifService],
  controllers: [ImageExifController],
})
export class ImageExifModule {}
