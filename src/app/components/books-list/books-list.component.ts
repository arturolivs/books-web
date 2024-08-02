import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { RemoveBookDialogComponent } from '../remove-book-dialog/remove-book-dialog.component';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss'
})
export class BooksListComponent {
  displayedColumns: string[] = ['title','author','genre','publicationYear', 'actions'];
  books: Book[] = [];

  constructor(
     private bookService: BookService,
     public dialog: MatDialog,
     private router: Router
  ) {}

  ngOnInit(): void {
     this.bookService.getAll().subscribe(books => {
       this.books = books;
     });
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/editar-livro', id]);
  }

  openRemoveDialog(book: Book): void {
    const dialogRef = this.dialog.open(RemoveBookDialogComponent, {
      data: book
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.remove(book.id).subscribe(() => {
          this.bookService.getAll().subscribe(books => {
            this.books = books;
          });
        });
      }
    });
  }
}

