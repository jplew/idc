import { TestBed, inject } from '@angular/core/testing'

import { MapAccessorService } from './map-accessor.service'

describe('MapAccessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapAccessorService]
    })
  })

  it('should be created', inject([MapAccessorService], (service: MapAccessorService) => {
    expect(service).toBeTruthy()
  }))
})
