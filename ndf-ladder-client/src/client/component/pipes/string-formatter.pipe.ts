import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stringFormatter' })
export class StringFormatter  implements PipeTransform {
  transform(value: string, insertIndx: number, insertValue: string) {
    return `${value.substring(0, insertIndx)}
            ${insertValue}
            ${value.substring(insertIndx, value.length)}`;
  }
}
