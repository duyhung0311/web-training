import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateSalesorderComponent } from './dialog-create-salesorder.component';

describe('DialogCreateSalesorderComponent', () => {
  let component: DialogCreateSalesorderComponent;
  let fixture: ComponentFixture<DialogCreateSalesorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateSalesorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateSalesorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
