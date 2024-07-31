import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

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
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';

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
        RouterOutlet,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ]

@Component({
  selector: 'app-book-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: imports,
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {
  bookForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar) {

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
     });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.createBook(this.bookForm.value);
    } else {
      this.bookForm.markAsTouched();
      console.log('Formulário inválido');
    }
  }

  createBook(bookData: Book): void {
    this.bookService.create(bookData).subscribe({
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
