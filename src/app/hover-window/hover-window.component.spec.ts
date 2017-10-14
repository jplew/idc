import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverWindowComponent } from './hover-window.component';

describe('HoverWindowComponent', () => {
  let component: HoverWindowComponent;
  let fixture: ComponentFixture<HoverWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoverWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoverWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
