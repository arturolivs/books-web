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
import { AuthorService } from '../../services/author.service';
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
  selector: 'app-author-edit-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: imports,
  templateUrl: './author-edit-form.component.html',
  styleUrl: './author-edit-form.component.scss'
})
export class AuthorFormEditComponent {
  authorForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private authorService: AuthorService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {

      this.authorForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        birthDate: ['', Validators.required],
       });

 }

 ngOnInit(): void {
  const authorId = this.route.snapshot.paramMap.get('id');

  if (authorId) {
    this.loadData(authorId);
  }
 }

 loadData(authorId: string): void {
  this.authorService.getById(authorId).subscribe(author => {
     this.authorForm.setValue({
      firstName: author.firstName,
      lastName: author.lastName,
      birthDate: author.birthDate,
     });
  });
 }

 onSubmit(): void {
  if (this.authorForm.valid) {
    const authorId = this.route.snapshot.paramMap.get('id');
  if (authorId) {
    this.updateAuthor(authorId, this.authorForm.value);

  }
  } else {
    this.authorForm.markAsTouched();
    console.log('Formulário inválido');
  }
}

updateAuthor(authorId: string, authorData: Author): void {
  this.authorService.update(authorId, authorData).subscribe({
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
