import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss'
})
export class BooksListComponent {
  displayedColumns: string[] = ['title', 'actions'];
  data: Book[] = [];

  constructor(
     private bookService: BookService,
     public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
     this.bookService.getAll().subscribe(books => {
       this.data = books;
     });
  }
 }

