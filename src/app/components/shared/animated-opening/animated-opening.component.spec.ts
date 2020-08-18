import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedOpeningComponent } from './animated-opening.component';

describe('AnimatedOpeningComponent', () => {
  let component: AnimatedOpeningComponent;
  let fixture: ComponentFixture<AnimatedOpeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedOpeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
