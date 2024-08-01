import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorFormEditComponent } from './author-edit-form.component';

describe('AuthorFormEditComponent', () => {
  let component: AuthorFormEditComponent;
  let fixture: ComponentFixture<AuthorFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorFormEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
