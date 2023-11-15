import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselWhislistComponent } from './carousel-whislist.component';

describe('CarouselWhislistComponent', () => {
  let component: CarouselWhislistComponent;
  let fixture: ComponentFixture<CarouselWhislistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselWhislistComponent]
    });
    fixture = TestBed.createComponent(CarouselWhislistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
