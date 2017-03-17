import { TestBed, inject } from '@angular/core/testing';

import { MeisterDtOResolverService } from './meister-dt-oresolver.service';

describe('MeisterDtOResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeisterDtOResolverService]
    });
  });

  it('should ...', inject([MeisterDtOResolverService], (service: MeisterDtOResolverService) => {
    expect(service).toBeTruthy();
  }));
});
