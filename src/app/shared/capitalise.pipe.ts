import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'capitalise'
})
export class CapitalisePipe implements PipeTransform{
    transform(value: string){
        var splitStr = value.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }
}