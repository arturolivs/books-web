import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormEditComponent } from './book-edit-form.component';

describe('BookFormEditComponent', () => {
  let component: BookFormEditComponent;
  let fixture: ComponentFixture<BookFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookFormEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
