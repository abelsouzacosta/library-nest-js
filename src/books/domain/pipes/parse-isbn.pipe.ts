import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { InvalidIsbnException } from '../exceptions/invalid-isbn.exception';

const default_isbn_digits = 13;

@Injectable()
export class ParseIsbnPipe implements PipeTransform {
  validateLenght(isbn: string): boolean {
    if (isbn.length !== default_isbn_digits) return false;

    return true;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const isValidLength = this.validateLenght(value.isbn);

    if (!isValidLength) throw new InvalidIsbnException(value.isbn);

    const firstSlice = value.isbn.slice(0, 3);
    const secondSlice = value.isbn.slice(3, 5);
    const thirdSlice = value.isbn.slice(5, 10);
    const fourthSlice = value.isbn.slice(10, 12);
    const fifthSlice = value.isbn.slice(12, 13);

    const validIsbnString = `${firstSlice}-${secondSlice}-${thirdSlice}-${fourthSlice}-${fifthSlice}`;

    value.isbn = validIsbnString;

    return value;
  }
}
