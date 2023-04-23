import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Asset {
  @Prop()
  name: string;

  @Prop()
  chipId: string;

  @Prop()
  model: string;
}
export const AssetSchema = SchemaFactory.createForClass(Asset);
