import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreFormEditComponent } from './genre-edit-form.component';

describe('GenreFormEditComponent', () => {
  let component: GenreFormEditComponent;
  let fixture: ComponentFixture<GenreFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreFormEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
