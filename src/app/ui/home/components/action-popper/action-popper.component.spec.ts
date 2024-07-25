import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPopperComponent } from './action-popper.component';

describe('ActionPopperComponent', () => {
  let component: ActionPopperComponent;
  let fixture: ComponentFixture<ActionPopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionPopperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionPopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
