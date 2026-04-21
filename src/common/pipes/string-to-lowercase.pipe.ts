import {
  type ArgumentMetadata,
  type PipeTransform,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class StringToLowercasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    if (typeof value === 'string') {
      return value.toLowerCase();
    }

    return value;
  }
}
