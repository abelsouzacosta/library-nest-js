import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { addDays, format } from 'date-fns';

@Injectable()
export class SetDevolutionDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const today = new Date();

    const devolution_date = addDays(today, 7);
    const formattedDevolutionDate = format(devolution_date, 'dd/MM/yyyy');

    value.devolution_date = formattedDevolutionDate;

    return value;
  }
}
