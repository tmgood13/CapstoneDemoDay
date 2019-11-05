import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bool'
})
export class BooldispPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? "Yes" : "-";
  }

}
