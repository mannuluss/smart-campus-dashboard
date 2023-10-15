import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSelectCompleteComponent } from './mat-select-complete.component';

describe('MatSelectCompleteComponent', () => {
  let component: MatSelectCompleteComponent;
  let fixture: ComponentFixture<MatSelectCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatSelectCompleteComponent],
    });
    fixture = TestBed.createComponent(MatSelectCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
