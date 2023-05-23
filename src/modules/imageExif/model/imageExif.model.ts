import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

// export const ImageExifModel = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     path: {
//       type: String,
//       required: true,
//     },
//     compressedPath: {
//       type: String,
//       required: true,
//     },
//     exif: {
//       type: String,
//       required: false,
//     },
//   },
//   { timestamps: true },
// );

@Schema({ collection: 'ImageExif', timestamps: true })
export class ImageExif extends mongoose.Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  compressedPath: string;

  @Prop({ required: false })
  exif: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const ImageExifModel = SchemaFactory.createForClass(ImageExif);
