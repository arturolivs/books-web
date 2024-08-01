import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { GenreService } from '../../services/genre.service';
import { Genre } from '../../models/genre.model';
import { RemoveGenreDialogComponent } from '../remove-genre-dialog/remove-genre-dialog.component';

@Component({
  selector: 'app-genres-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './genres-list.component.html',
  styleUrl: './genres-list.component.scss'
})
export class GenresListComponent {
  displayedColumns: string[] = ['name', 'actions'];
  genres: Genre[] = [];

  constructor(
     private genreService: GenreService,
     public dialog: MatDialog,
     private router: Router
  ) {}

  ngOnInit(): void {
     this.genreService.getAll().subscribe(genres => {
       this.genres = genres;
     });
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/editar-genero', id]);
  }

  openRemoveDialog(genre: Genre): void {
    const dialogRef = this.dialog.open(RemoveGenreDialogComponent, {
      data: genre
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.genreService.remove(genre.id).subscribe(() => {
          this.genreService.getAll().subscribe(genres => {
            this.genres = genres;
          });
        });
      }
    });
  }
}

