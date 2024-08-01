import { Component, Inject } from '@angular/core';
import { MatDialogRef,MatDialogContent,MatDialogActions ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Author } from '../../models/author.model';

@Component({
  selector: 'app-remove-author-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './remove-author-dialog.component.html',
  styleUrl: './remove-author-dialog.component.scss'
})
export class RemoveAuthorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RemoveAuthorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Author
 ) {}

 onNoClick(): void {
    this.dialogRef.close();
 }
}

