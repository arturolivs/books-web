import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBookDialogComponent } from './remove-book-dialog.component';

describe('RemoveBookDialogComponent', () => {
  let component: RemoveBookDialogComponent;
  let fixture: ComponentFixture<RemoveBookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveBookDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
