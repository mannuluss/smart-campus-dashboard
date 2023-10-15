import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueadorComponent } from './bloqueador.component';

describe('BloqueadorComponent', () => {
  let component: BloqueadorComponent;
  let fixture: ComponentFixture<BloqueadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BloqueadorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BloqueadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
