import { Component } from '@angular/core';
import {  Router, RouterModule } from '@angular/router';

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
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthorService  } from '../../services/author.service';
import { Author } from '../../models/author.model';


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
  selector: 'app-author-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports,
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.scss'
})
export class AuthorFormComponent {
  authorForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private authorService: AuthorService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar) {

    this.authorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],

     });
  }

  onSubmit(): void {
    if (this.authorForm.valid) {
      this.create(this.authorForm.value);
    } else {
      this.authorForm.markAsTouched();
      console.log('Formulário inválido');
    }
  }

  create(author: Author): void {
    this.authorService.create(author).subscribe({
      next: (response) => {
        this.router.navigate(['/autores']);
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