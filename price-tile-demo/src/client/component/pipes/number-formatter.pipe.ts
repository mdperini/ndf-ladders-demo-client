import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numberFormatter' })
export class NumericFormatter  implements PipeTransform {
  transform(inputValue: number) {
    return inputValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

}

