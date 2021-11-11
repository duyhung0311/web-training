import { TestBed } from '@angular/core/testing';

import { CommnunicatetionService } from './commnunicatetion.service';

describe('CommnunicatetionService', () => {
  let service: CommnunicatetionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommnunicatetionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
