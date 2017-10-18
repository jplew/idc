import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ListDialogPlantComponent } from './list-dialog-plant.component'

describe('ListDialogPlantComponent', () => {
  let component: ListDialogPlantComponent
  let fixture: ComponentFixture<ListDialogPlantComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDialogPlantComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDialogPlantComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
