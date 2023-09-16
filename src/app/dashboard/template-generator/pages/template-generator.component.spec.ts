import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateGeneratorComponent } from './template-generator.component';

describe('TemplateComponent', () => {
  let component: TemplateGeneratorComponent;
  let fixture: ComponentFixture<TemplateGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateGeneratorComponent]
    });
    fixture = TestBed.createComponent(TemplateGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
