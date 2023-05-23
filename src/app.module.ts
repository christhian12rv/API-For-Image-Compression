import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './configs/config';
import { ImageExifModule } from './modules/imageExif/imageExif.module';

@Module({
  imports: [MongooseModule.forRoot(config.databaseURL), ImageExifModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
