import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipeComponent } from './receipe.component';

describe('ReceipeComponent', () => {
  let component: ReceipeComponent;
  let fixture: ComponentFixture<ReceipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceipeComponent]
    });
    fixture = TestBed.createComponent(ReceipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
