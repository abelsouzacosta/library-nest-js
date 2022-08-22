import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UserRepository } from 'src/users/domain/repositories/user.repository';
import { ForbiddenUserException } from '../exceptions/forbidden-user.exception';

interface IDecodedToken {
  email: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly repository: UserRepository,
  ) {}

  getEmailFromDecodedToken(decodedToken: IDecodedToken): string {
    const parsedToken = JSON.parse(JSON.stringify(decodedToken));

    return parsedToken.email;
  }

  decodeToken(token: string): IDecodedToken {
    return this.jwtService.decode(token) as IDecodedToken;
  }

  async ensureUserExistsOrThrowsException(token: string): Promise<void> {
    const decodedToken = this.decodeToken(token);

    const email = this.getEmailFromDecodedToken(decodedToken);

    const user = await this.repository.findByEmail(email);

    if (!user) throw new ForbiddenUserException(email);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    const bearerToken = authorizationHeader.split(' ');

    const [, token] = bearerToken;

    await this.ensureUserExistsOrThrowsException(token);

    next();
  }
}
