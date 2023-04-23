import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  chipId: string;

  @IsString()
  @IsNotEmpty()
  model: string;
}
