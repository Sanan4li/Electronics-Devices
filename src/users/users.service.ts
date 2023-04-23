import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOne(username: string) {
    return this.userModel.findOne({ username });
  }

  async addUser(username: string, password: string) {
    const user = await new this.userModel({ username, password }).save();
    return user;
  }
}
