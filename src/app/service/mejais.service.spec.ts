import { TestBed } from '@angular/core/testing';

import { MejaisService } from './mejais.service';

describe('MejaisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MejaisService = TestBed.get(MejaisService);
    expect(service).toBeTruthy();
  });
});
