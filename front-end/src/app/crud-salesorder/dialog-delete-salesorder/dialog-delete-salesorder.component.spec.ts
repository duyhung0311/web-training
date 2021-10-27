import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteSalesorderComponent } from './dialog-delete-salesorder.component';

describe('DialogDeleteSalesorderComponent', () => {
  let component: DialogDeleteSalesorderComponent;
  let fixture: ComponentFixture<DialogDeleteSalesorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteSalesorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteSalesorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
