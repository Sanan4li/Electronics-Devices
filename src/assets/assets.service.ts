import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Asset } from './entities/asset.entity';
import { Model } from 'mongoose';

@Injectable()
export class AssetsService {
  constructor(
    @InjectModel(Asset.name) private readonly assetModel: Model<Asset>,
  ) {}
  async create(createAssetDto: CreateAssetDto) {
    try {
      const asset = await new this.assetModel(createAssetDto).save();
      return asset;
    } catch (e) {
      console.log(e);
    }
  }

  async findAll() {
    const assets = await this.assetModel.find();
    if (!assets) {
      throw new NotFoundException('Assets not found');
    }
    return assets;
  }

  async findOne(id: string) {
    const asset = await this.assetModel.findById({ _id: id });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }
    return asset;
  }

  async update(id: string, updateAssetDto: UpdateAssetDto) {
    const asset = await this.assetModel.findById({ _id: id });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }
    const updatedData = await this.assetModel
      .findOneAndUpdate({ _id: id }, { ...updateAssetDto }, { new: true })
      .lean();

    return updatedData;
  }

  remove(id: string) {
    const asset = this.assetModel.findById({ _id: id });
    if (!asset) {
      throw new NotFoundException('Asset not found');
    }
    const updatedAsset = this.assetModel.findByIdAndDelete({ _id: id });
    return updatedAsset;
  }
}
