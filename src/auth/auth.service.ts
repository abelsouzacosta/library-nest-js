import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserRepository } from 'src/users/domain/repositories/user.repository';
import { CreateAuthDto } from './application/dto/create-auth.dto';
import { JwtPayloadInterface } from './infra/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly repository: UserRepository,
  ) {}

  async validatePassword(password: string, hash: string) {
    const isValid = await compare(password, hash);

    if (!isValid) throw new UnauthorizedException();
  }

  async create(data: CreateAuthDto): Promise<{ accessToken: string }> {
    const { password: hash } = await this.repository.findByEmail(data.email);

    await this.validatePassword(data.password, hash);

    const tokenPayload: JwtPayloadInterface = { email: data.email };
    const accessToken: string = this.jwtService.sign(tokenPayload);

    return {
      accessToken,
    };
  }
}
