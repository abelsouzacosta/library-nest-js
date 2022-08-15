import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { format, parseISO } from 'date-fns';

@Injectable()
export class ParseStringDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const parsedDateString = parseISO(value.date_birth);
    const formattedBirthDate = format(parsedDateString, 'dd/MM/yyyy');

    value.date_birth = formattedBirthDate;

    return value;
  }
}
