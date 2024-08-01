import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RemoveAuthorDialogComponent } from '../remove-author-dialog/remove-author-dialog.component';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';


@Component({
  selector: 'app-authors-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './authors-list.component.html',
  styleUrl: './authors-list.component.scss'
})
export class AuthorsListComponent {
  displayedColumns: string[] = ['firstName','lastName','birthDate' ,'actions'];
  authors: Author[] = [];

  constructor(
     private authorService: AuthorService,
     public dialog: MatDialog,
     private router: Router
  ) {}

  ngOnInit(): void {
     this.authorService.getAll().subscribe(authors => {
       this.authors = authors;
     });
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/editar-autor', id]);
  }

  openRemoveDialog(author: Author): void {
    const dialogRef = this.dialog.open(RemoveAuthorDialogComponent, {
      data: author
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authorService.remove(author.id).subscribe(() => {
          this.authorService.getAll().subscribe(authors => {
            this.authors = authors;
          });
        });
      }
    });
  }
}

