import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { Device, DeviceSchema } from './entities/device.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entity/user.entity';
import { Asset, AssetSchema } from 'src/assets/entities/asset.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Device.name, schema: DeviceSchema },
      { name: User.name, schema: UserSchema },
      { name: Asset.name, schema: AssetSchema },
    ]),
  ],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
