import { Directive, ViewContainerRef } from '@angular/core';

/**
 * Directiva para poder agregar componentes dentro de otros componentes dinamicamente.
 */
@Directive({
  selector: '[adHost]',
})
export class AdDirective {
  /**
   * Constructor de la directiva.
   *
   * @param viewContainerRef - Contenedor de la vista actual.
   */
  constructor(public viewContainerRef: ViewContainerRef) {}
}
