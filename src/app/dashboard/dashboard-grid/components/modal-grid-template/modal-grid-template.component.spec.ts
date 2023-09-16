import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGridTemplateComponent } from './modal-grid-template.component';

describe('ModalGridTemplateComponent', () => {
  let component: ModalGridTemplateComponent;
  let fixture: ComponentFixture<ModalGridTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalGridTemplateComponent]
    });
    fixture = TestBed.createComponent(ModalGridTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
