import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUsermanagementComponent } from './dialog-edit-usermanagement.component';

describe('DialogEditUsermanagementComponent', () => {
  let component: DialogEditUsermanagementComponent;
  let fixture: ComponentFixture<DialogEditUsermanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditUsermanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditUsermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
