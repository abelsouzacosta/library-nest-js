import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { InvalidIsbnException } from '../exceptions/invalid-isbn.exception';

@Injectable()
export class ValidateIsbnPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    if (
      !/^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$/.test(
        value.isbn,
      )
    )
      throw new InvalidIsbnException(value.isbn);

    return value;
  }
}
