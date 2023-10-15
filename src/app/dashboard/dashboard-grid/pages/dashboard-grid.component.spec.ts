import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGridComponent } from './dashboard-grid.component';

describe('DashboardGridComponent', () => {
  let component: DashboardGridComponent;
  let fixture: ComponentFixture<DashboardGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardGridComponent],
    });
    fixture = TestBed.createComponent(DashboardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
