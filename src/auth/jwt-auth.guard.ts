import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { validate } from 'class-validator';
import { CredentialsInterface, LoginDto } from './auth.dto';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const credentials: CredentialsInterface = new LoginDto(req.body);

    const errors = await validate(credentials);
    if (errors.length) {
      throw new BadRequestException('Bad Request');
    }
    console.log(context);

    const result: boolean = (await super.canActivate(context)) as boolean;
    await super.logIn(req);
    console.log(result);

    return result;
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
