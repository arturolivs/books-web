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
  selector: 'app-genre-edit-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: imports,
  templateUrl: './genre-edit-form.component.html',
  styleUrl: './genre-edit-form.component.scss'
})
export class GenreFormEditComponent {
  genreForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private genreService: GenreService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {

      this.genreForm = this.fb.group({
        name: ['', Validators.required],
       });

 }

 ngOnInit(): void {
  const genreId = this.route.snapshot.paramMap.get('id');

  if (genreId) {
    this.loadData(genreId);
  }
 }

 loadData(genreId: string): void {
  this.genreService.getById(genreId).subscribe(genre => {
     this.genreForm.setValue({
      name: genre.name,
     });
  });
 }

 onSubmit(): void {
  if (this.genreForm.valid) {
    const genreId = this.route.snapshot.paramMap.get('id');
  if (genreId) {
    this.updateGenre(genreId, this.genreForm.value);

  }
  } else {
    this.genreForm.markAsTouched();
    console.log('Formulário inválido');
  }
}

updateGenre(genreId: string, genreData: Genre): void {
  this.genreService.update(genreId, genreData).subscribe({
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
