import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Asset } from 'src/assets/entities/asset.entity';
import { User } from 'src/users/entity/user.entity';

@Schema()
export class Device {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  command: string;

  @Prop()
  locked: boolean;

  @Prop({ ref: 'User' })
  userId: User;

  @Prop({ ref: 'Asset' })
  assetId: Asset;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
