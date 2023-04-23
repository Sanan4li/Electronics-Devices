import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export interface CredentialsInterface {
  username: string;
  password: string;
}
export class LoginDto {
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
  constructor(credentials: CredentialsInterface) {
    if (credentials) {
      this.username = credentials.username;
      this.password = credentials.password;
    }
  }
}
