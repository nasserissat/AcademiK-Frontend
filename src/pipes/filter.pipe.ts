import { Pipe, PipeTransform } from '@angular/core';
import { Student } from "src/Models/models";

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  transform(items: Student[], searchText: string): Student[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(student => {
      const matchesFirstName = student.firstName.toLocaleLowerCase().includes(searchText);
      const matchesLastName = student.lastName.toLocaleLowerCase().includes(searchText);
      return matchesFirstName || matchesLastName;
    });
  }
}
