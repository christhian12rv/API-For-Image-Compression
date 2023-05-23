import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../../filters/httpException.filter';
import { ImageExifService } from './imageExif.service';
import { CompressView } from './view/compress.view';

@Controller('imageExif')
@UseFilters(new HttpExceptionFilter())
export class ImageExifController {
  constructor(private service: ImageExifService) {}

  @Post('compress')
  compress(@Body() compressData: CompressView) {
    return this.service.compress(compressData);
  }
}
