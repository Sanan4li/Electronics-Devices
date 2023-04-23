import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Model } from 'mongoose';
import { Device } from './entities/device.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/entity/user.entity';
import { Asset } from 'src/assets/entities/asset.entity';
@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private readonly deviceModal: Model<Device>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Asset.name) private readonly assetModel: Model<Asset>,
  ) {}
  async create(createDeviceDto: CreateDeviceDto) {
    const { name, type, command, locked, userId, assetId } = createDeviceDto;

    const user = await this.userModel.findById(userId);
    const asset = await this.assetModel.findById(assetId);

    const createdDevice = new this.deviceModal({
      name,
      type,
      command,
      locked,
      userId: user,
      assetId: asset,
    });

    return createdDevice.save();
  }

  async findAll() {
    const devices = await this.deviceModal.find();
    if (!devices) {
      throw new NotFoundException('Devices not found');
    }
    return devices;
  }

  async findOne(id: string) {
    const device = await this.deviceModal.findById({ _id: id });
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    this.findOne(id);
    const updatedData = await this.deviceModal
      .findOneAndUpdate({ _id: id }, { ...updateDeviceDto }, { new: true })
      .lean();
    return updatedData;
  }

  remove(id: string) {
    this.findOne(id);
    const updatedDevice = this.deviceModal.findByIdAndDelete({ _id: id });
    return updatedDevice;
  }
}
