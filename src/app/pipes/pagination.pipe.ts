import { Pipe, PipeTransform } from '@angular/core';
import { IContacts } from '../interfaces/contacts';
import { log } from 'util';

@Pipe({
  name: 'pagination'
})

export class PaginationPipe implements PipeTransform {
  pagination: IContacts;

  transform(values: any, args?: any): any {
    let pages = args.Pages;
    let returnable = [];
    values.forEach((element, i) => {
      if (i >= args.ItemsPerPage * (args.CurrentPage - 1) && i < args.ItemsPerPage * args.CurrentPage) {
        returnable.push(element);
      }
    });
    return returnable;
  }
}
