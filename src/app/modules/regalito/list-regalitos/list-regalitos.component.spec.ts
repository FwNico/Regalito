import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegalitosComponent } from './list-regalitos.component';

describe('ListRegalitosComponent', () => {
  let component: ListRegalitosComponent;
  let fixture: ComponentFixture<ListRegalitosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRegalitosComponent]
    });
    fixture = TestBed.createComponent(ListRegalitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
