import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWishListComponent } from './add-wish-list.component';

describe('AddWishListComponent', () => {
  let component: AddWishListComponent;
  let fixture: ComponentFixture<AddWishListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWishListComponent]
    });
    fixture = TestBed.createComponent(AddWishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});