import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, filterKeys: string[]): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLocaleLowerCase();

    return items.filter(item => {
      return filterKeys.some(key => {
        if (item[key]) {
          return item[key].toLocaleLowerCase().includes(searchText);
        }
        return false;
      });
    });
  }
}
