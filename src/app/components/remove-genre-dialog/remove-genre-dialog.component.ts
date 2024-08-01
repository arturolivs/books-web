import { Component, Inject } from '@angular/core';
import { MatDialogRef,MatDialogContent,MatDialogActions ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Genre } from '../../models/genre.model';

@Component({
  selector: 'app-remove-genre-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './remove-genre-dialog.component.html',
  styleUrl: './remove-genre-dialog.component.scss'
})
export class RemoveGenreDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RemoveGenreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Genre
 ) {}

 onNoClick(): void {
    this.dialogRef.close();
 }
}

