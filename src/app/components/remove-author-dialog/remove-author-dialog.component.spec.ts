import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveGenreDialogComponent } from './remove-genre-dialog.component';

describe('RemoveGenreDialogComponent', () => {
  let component: RemoveGenreDialogComponent;
  let fixture: ComponentFixture<RemoveGenreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveGenreDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveGenreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
