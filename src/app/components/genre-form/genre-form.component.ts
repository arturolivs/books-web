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
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../models/genre.model';


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
  selector: 'app-genre-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports,
  templateUrl: './genre-form.component.html',
  styleUrl: './genre-form.component.scss'
})
export class GenreFormComponent {
  genreForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private genreService: GenreService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar) {

    this.genreForm = this.fb.group({
      name: ['', Validators.required],
     });
  }

  onSubmit(): void {
    if (this.genreForm.valid) {
      this.create(this.genreForm.value);
    } else {
      this.genreForm.markAsTouched();
      console.log('Formulário inválido');
    }
  }

  create(genre: Genre): void {
    this.genreService.create(genre).subscribe({
      next: (response) => {
        this.router.navigate(['/generos']);
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
