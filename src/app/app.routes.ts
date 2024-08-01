import { Routes } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookFormEditComponent } from './components/book-edit-form/book-edit-form.component';

export const routes: Routes = [
  {path: 'livros', component: BooksListComponent},
  {path: 'novo-livro', component: BookFormComponent},
  { path: 'editar-livro/:id', component: BookFormEditComponent },
];
