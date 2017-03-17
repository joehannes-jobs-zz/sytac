import { TestBed, inject } from '@angular/core/testing';

import { MeisterDtOService } from './meister-dt-o.service';

describe('MeisterDtOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeisterDtOService]
    });
  });

  it('should ...', inject([MeisterDtOService], (service: MeisterDtOService) => {
    expect(service).toBeTruthy();
  }));
});
