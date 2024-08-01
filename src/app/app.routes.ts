import { Routes } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookFormEditComponent } from './components/book-edit-form/book-edit-form.component';
import { GenresListComponent } from './components/genres-list/genres-list.component';
import { GenreFormComponent } from './components/genre-form/genre-form.component';
import { GenreFormEditComponent } from './components/genre-edit-form/genre-edit-form.component';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { AuthorFormEditComponent } from './components/author-edit-form/author-edit-form.component';

export const routes: Routes = [
  {path: 'livros', component: BooksListComponent},
  {path: 'novo-livro', component: BookFormComponent},
  { path: 'editar-livro/:id', component: BookFormEditComponent },

  {path: 'generos', component: GenresListComponent},
  {path: 'novo-genero', component: GenreFormComponent},
  { path: 'editar-genero/:id', component: GenreFormEditComponent },

  {path: 'autores', component: AuthorsListComponent},
  {path: 'novo-autor', component: AuthorFormComponent},
  { path: 'editar-autor/:id', component: AuthorFormEditComponent },
];
