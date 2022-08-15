import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { parse, differenceInYears } from 'date-fns';

@Injectable()
export class GetStudentAgePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const birthDay = parse(value.birth_date, 'dd/MM/yyyy', new Date());

    const age = differenceInYears(birthDay, new Date());

    value.age = age;

    return value;
  }
}
