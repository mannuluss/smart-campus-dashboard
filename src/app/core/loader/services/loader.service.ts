import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { defer, NEVER } from 'rxjs';
import { finalize, share } from 'rxjs/operators';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { BloqueadorComponent } from '../components/bloqueador/bloqueador.component';
import { LoaderModule } from '../loader.module';
/**
 * Servicio para mostrar loaders
 *
 * @export
 * @class LoaderService
 */
@Injectable({
  providedIn: LoaderModule,
})
export class LoaderService {
  /**
   * Background color del bloqueador loader.
   */
  backgroundColor: string = `rgba(255, 255, 255, 0.8)`;

  /**
   * Observable que se muestra para peticiones GET
   */
  public readonly spinner$ = defer(() => {
    this.show();
    return NEVER.pipe(
      finalize(() => {
        this.hide();
      }),
    );
  }).pipe(share());
  /**
   * Observable que se muestra para peticiones NO GET
   */
  public readonly spinnerNoGet$ = defer(() => {
    this.showNoGet();
    return NEVER.pipe(
      finalize(() => {
        this.hide();
      }),
    );
  }).pipe(share());
  /**
   * @ignore
   */
  private overlayRef: OverlayRef | undefined = undefined;
  /**
   * @ignore
   */
  constructor(private overlay: Overlay) {}

  /**
   * Muestra un loader GET
   */
  public show(): void {
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        minWidth: 100,
        positionStrategy: this.overlay.position().global(),
        hasBackdrop: false,
      });
      this.overlayRef.attach(new ComponentPortal(SpinnerComponent));
    });
  }
  /**
   * Muestra un loader NO GET
   */
  public showNoGet(): void {
    // Hack avoiding `ExpressionChangedAfterItHasBeenCheckedError` error
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        minWidth: 100,
        positionStrategy: this.overlay.position().global(),
        hasBackdrop: false,
      });
      const componentPortal = new ComponentPortal(BloqueadorComponent);
      const attachedComp = this.overlayRef.attach(componentPortal);
    });
  }
  /**
   * Oculta el loader actual
   */
  public hide(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
    this.overlayRef = undefined;
  }
}
