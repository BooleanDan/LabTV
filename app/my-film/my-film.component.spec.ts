import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFilmComponent } from './my-film.component';

describe('MyFilmComponent', () => {
  let component: MyFilmComponent;
  let fixture: ComponentFixture<MyFilmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyFilmComponent]
    });
    fixture = TestBed.createComponent(MyFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
