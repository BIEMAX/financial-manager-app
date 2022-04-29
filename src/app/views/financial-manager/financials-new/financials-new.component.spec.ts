import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialsNewComponent } from './financials-new.component';

describe('FinancialsNewComponent', () => {
  let component: FinancialsNewComponent;
  let fixture: ComponentFixture<FinancialsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
