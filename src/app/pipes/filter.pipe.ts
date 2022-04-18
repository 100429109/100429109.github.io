import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultElemento = [];
    for (const elemento of value){
      if (elemento.localidad.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultElemento.push(elemento);
      };
    };
    return resultElemento;
  }

}
