import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'unhtml' })
export class UnhtmlPipe implements PipeTransform {
  transform(value: string, ...args: any[]) {
    return value.replace(/<\/?[^>]+(>|$)/g, "");
  }

}
