import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateUsermanagementComponent } from './dialog-create-usermanagement.component';

describe('DialogCreateUsermanagementComponent', () => {
  let component: DialogCreateUsermanagementComponent;
  let fixture: ComponentFixture<DialogCreateUsermanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateUsermanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateUsermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
