import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapChildComponent } from './map-child.component';

describe('MapChildComponent', () => {
  let component: MapChildComponent;
  let fixture: ComponentFixture<MapChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
