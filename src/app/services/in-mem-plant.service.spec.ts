import { TestBed, inject } from '@angular/core/testing';

import { InMemPlantService } from './in-mem-plant.service';

describe('InMemPlantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemPlantService]
    });
  });

  it('should be created', inject([InMemPlantService], (service: InMemPlantService) => {
    expect(service).toBeTruthy();
  }));
});
