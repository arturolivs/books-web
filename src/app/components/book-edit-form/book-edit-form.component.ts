import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const imports = [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        MatListModule,
    ]

@Component({
  selector: 'app-book-edit-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: imports,
  templateUrl: './book-edit-form.component.html',
  styleUrl: './book-edit-form.component.scss'
})
export class BookFormEditComponent {
  bookForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {

      this.bookForm = this.fb.group({
        title: ['', Validators.required],
        authorId: ['', Validators.required],
        genreId: ['', Validators.required],
        description: ['', Validators.required],
        publicationYear: ['', Validators.required],
       });

 }

 ngOnInit(): void {
  const bookId = this.route.snapshot.paramMap.get('id');

  if (bookId) {
    this.loadData(bookId);
  }
 }

 loadData(bookId: string): void {
  this.bookService.getById(bookId).subscribe(book => {
     this.bookForm.setValue({
      title: book.title,
      authorId: book.authorId,
      genreId: book.genreId,
      description:book.description,
      publicationYear:book.publicationYear,
     });
  });
 }

 onSubmit(): void {
  if (this.bookForm.valid) {
    const bookId = this.route.snapshot.paramMap.get('id');
  if (bookId) {
    this.updateBook(bookId, this.bookForm.value);

  }
  } else {
    this.bookForm.markAsTouched();
    console.log('Formulário inválido');
  }
}

updateBook(bookId: string, BookData: Book): void {
  this.bookService.update(bookId, BookData).subscribe({
    next: (response) => {
       this.router.navigate(['/livros']);
    },
    error: ({ error }) => {
       this.snackBar.open(error.message, 'Fechar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
   });
  }

}
