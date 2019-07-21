import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pipsFormatter' })
export class PipsFormatter  implements PipeTransform {
  transform(price: number) {
    return price;
  }
}
