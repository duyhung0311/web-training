import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditSalesorderComponent } from './dialog-edit-salesorder.component';

describe('DialogEditSalesorderComponent', () => {
  let component: DialogEditSalesorderComponent;
  let fixture: ComponentFixture<DialogEditSalesorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditSalesorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditSalesorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
