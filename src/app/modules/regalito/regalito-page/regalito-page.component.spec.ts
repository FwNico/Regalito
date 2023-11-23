import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegalitoPageComponent } from './regalito-page.component';

describe('RegalitoPageComponent', () => {
  let component: RegalitoPageComponent;
  let fixture: ComponentFixture<RegalitoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegalitoPageComponent]
    });
    fixture = TestBed.createComponent(RegalitoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
