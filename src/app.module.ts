import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AssetsModule } from './assets/assets.module';
import { DevicesModule } from './devices/devices.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/electronics', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    AssetsModule,
    DevicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
