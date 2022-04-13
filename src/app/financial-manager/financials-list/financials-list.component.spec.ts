import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialsListComponent } from './financials-list.component';

describe('FinancialsListComponent', () => {
  let component: FinancialsListComponent;
  let fixture: ComponentFixture<FinancialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
