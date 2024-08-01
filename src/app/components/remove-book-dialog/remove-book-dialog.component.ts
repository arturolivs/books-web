import { Component, Inject } from '@angular/core';
import { MatDialogRef,MatDialogContent,MatDialogActions ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Book } from '../../models/book.model';

@Component({
  selector: 'app-remove-book-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './remove-book-dialog.component.html',
  styleUrl: './remove-book-dialog.component.scss'
})
export class RemoveBookDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RemoveBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
 ) {}

 onNoClick(): void {
    this.dialogRef.close();
 }
}

