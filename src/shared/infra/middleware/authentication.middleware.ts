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

  decodeToken(token: string): IDecodedToken {
    return this.jwtService.decode(token) as IDecodedToken;
  }

  getEmailFromDecodedToken(decodedToken: IDecodedToken): string {
    const { email }: IDecodedToken = JSON.parse(JSON.stringify(decodedToken));

    return email;
  }

  async ensureUserExistsOrThrowsException(token: string) {
    const decodedToken = this.decodeToken(token);

    const email = this.getEmailFromDecodedToken(decodedToken);

    const user = await this.repository.findByEmail(email);

    if (!user) throw new ForbiddenUserException(email);

    return user;
  }

  async getIdFromUser(token: string): Promise<string> {
    const { _id } = await this.ensureUserExistsOrThrowsException(token);

    return _id.toString();
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    const bearerToken = authorizationHeader.split(' ');

    const [, token] = bearerToken;

    const user = await this.getIdFromUser(token);

    req.body.user = user;

    next();
  }
}
