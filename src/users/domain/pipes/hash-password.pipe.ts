import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/users/application/dto/create-user.dto';
import { genSalt, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  constructor(private readonly configService: ConfigService) {}

  async transform(
    value: any,
    metadata: ArgumentMetadata,
  ): Promise<CreateUserDto> {
    if (metadata.type !== 'body') return value;

    const roundNumber = this.configService.get<number>('PASSWORD_HASH_SALT');
    const salt = await genSalt(roundNumber);
    value.password = await hash(value.password, salt);

    return value;
  }
}
