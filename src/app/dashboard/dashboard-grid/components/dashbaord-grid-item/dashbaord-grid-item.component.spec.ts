import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbaordGridItemComponent } from './dashbaord-grid-item.component';

describe('DashbaordGridItemComponent', () => {
  let component: DashbaordGridItemComponent;
  let fixture: ComponentFixture<DashbaordGridItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbaordGridItemComponent],
    });
    fixture = TestBed.createComponent(DashbaordGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
