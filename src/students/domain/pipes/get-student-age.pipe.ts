import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { parse, differenceInYears } from 'date-fns';

@Injectable()
export class GetStudentAgePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const parsedBirthDate = parse(value.date_birth, 'dd/MM/yyyy', new Date());

    const age = differenceInYears(new Date(), parsedBirthDate);

    value.age = age;
    value.date_birth = parsedBirthDate;

    return value;
  }
}
