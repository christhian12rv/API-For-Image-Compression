import { Body, Controller, Post } from '@nestjs/common';
import { ImageExifService } from './imageExif.service';
import { CompressView } from './view/compress.view';

@Controller('imageExif')
export class ImageExifController {
  constructor(private service: ImageExifService) {}

  @Post('compress')
  compress(@Body() compressData: CompressView) {
    return this.service.compress(compressData);
  }
}
