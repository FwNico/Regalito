import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselFavComponent } from './carousel-fav.component';

describe('CarouselFavComponent', () => {
  let component: CarouselFavComponent;
  let fixture: ComponentFixture<CarouselFavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselFavComponent]
    });
    fixture = TestBed.createComponent(CarouselFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
