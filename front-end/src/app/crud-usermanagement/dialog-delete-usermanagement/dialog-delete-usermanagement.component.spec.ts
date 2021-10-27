import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteUsermanagementComponent } from './dialog-delete-usermanagement.component';

describe('DialogDeleteUsermanagementComponent', () => {
  let component: DialogDeleteUsermanagementComponent;
  let fixture: ComponentFixture<DialogDeleteUsermanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteUsermanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteUsermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
