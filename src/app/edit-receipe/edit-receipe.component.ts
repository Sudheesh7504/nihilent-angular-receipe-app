import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receipe } from '../app.component';
import { ReceipeDataService } from '../receipe-data.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-receipe',
  templateUrl: './edit-receipe.component.html',
  styleUrls: ['./edit-receipe.component.scss']
})
export class EditReceipeComponent {
  id: string = '';
  separatorKeysCodes: number[] = [ENTER, COMMA];


  receipeForm = this.fb.group({
    receipeName: ['', [Validators.required, Validators.minLength(5)]],
    cuisine: ['', [Validators.required, Validators.minLength(5)]],
    recommended: [false],
    rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
    uploadedDate: ['', [Validators.required]],
    like: 0,
    dislike: 0,


    ingredients: this.fb.array([]),

    receipeImage: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^http.*'),
      ],
    ],
    instructions: ['', [Validators.required, Validators.minLength(20)]],
    foodVlog: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^http.*'),
      ],
    ],

  });


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private receipeDataService: ReceipeDataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const { id } = this.route.snapshot.params;
    this.id = id;
  }

  ngOnInit() {
    this.receipeDataService.getReceipeById(this.id).subscribe((rc: any) => {
      console.log(rc);
      this.receipeForm.patchValue(rc);

      rc.ingredients.forEach((name: string) => {
        this.ingredients.push(this.fb.control(name));


      });
    });

  }

  get receipeName() {
    return this.receipeForm?.get('receipeName');
  }

  get cuisine() {
    return this.receipeForm?.get('cuisine');
  }

  get rating() {
    return this.receipeForm?.get('rating');
  }

  get receipeImage() {
    return this.receipeForm?.get('receipeImage');
  }

  get instructions() {
    return this.receipeForm?.get('instructions');
  }

  get foodVlog() {
    return this.receipeForm?.get('foodVlog');
  }

  get ingredients() {
    return this.receipeForm.get('ingredients') as FormArray;
  }

  addIngredients(event: MatChipInputEvent) {
    const name = (event.value || '').trim();
    if (name) {
      this.ingredients.push(this.fb.control(name));
    }

    event.chipInput!.clear();
  }

  removeIngredients(index: number) {
    this.ingredients.removeAt(index);
  }

  UpdateReceipeById() {
    console.log(this.receipeForm.status);

    if (this.receipeForm.valid) {
      const updatedReceipe = this.receipeForm.value;
      console.log(updatedReceipe);

      this.receipeDataService.updateReceipeById(updatedReceipe as Receipe).subscribe(() => {
        this.router.navigate(['/receipes']);


        this.snackBar.open(`Recipe edited successfully`, 'Close', {
          duration: 5000,
          panelClass: ['snackbar-success'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
        console.log(this.receipeName);
      });
    }
  }
}
