import { Pipe, PipeTransform } from '@angular/core';

/**
 * pipe para filtrar un array de objetos, utilizado para los inputs de filtrar.
 */
@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  /**
   *
   * @param items arreglo de objetos a filtrar
   * @param searchText texto a buscar en las key(s) del objeto
   * @param key key(s) del objeto a buscar
   * @returns
   */
  transform(items: any[], searchText: string, key: string[] | string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText || searchText.length == 0 || key.length == 0) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    return items.filter((it) => {
      if (Array.isArray(key)) {
        return key.some(
          (k) => String(it[k])?.toLocaleLowerCase().includes(searchText),
        );
      } else {
        return it[key].toLocaleLowerCase().includes(searchText);
      }
    });
  }
}
