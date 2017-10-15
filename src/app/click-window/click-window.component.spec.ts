import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickWindowComponent } from './click-window.component';

describe('ClickWindowComponent', () => {
  let component: ClickWindowComponent;
  let fixture: ComponentFixture<ClickWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
