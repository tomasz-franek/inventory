import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notActive',
})
@Injectable()
export class NotActivePipe implements PipeTransform {
  transform(items: any[] | null, active: boolean | null): any[] {
    if (!items) {
      return [];
    }
    if (!active) {
      return items;
    }

    return items.filter((it) => it['active'] || !active);
  }
}
