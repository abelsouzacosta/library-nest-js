import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { format } from 'date-fns';

@Injectable()
export class SetLoanDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const today = new Date();

    const formattedLoanDate = format(today, 'dd/MM/yyyy');

    value.loan_date = formattedLoanDate;

    return value;
  }
}
