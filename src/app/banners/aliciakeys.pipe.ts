import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'aliciaKeys'
})
export class AliciaKeys implements PipeTransform {
  transform(obj: any, arg: string[]): string {
    return obj
      ? Object.entries(obj)
        .filter(([key, value]) => !!value)
        .map(([key]) => key)
        .join(', ')
      : '';
  }
}
