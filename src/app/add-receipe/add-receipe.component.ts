import { Component } from '@angular/core';
import { Receipe } from '../app.component';
import { ReceipeDataService } from '../receipe-data.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-receipe',
  templateUrl: './add-receipe.component.html',
  styleUrls: ['./add-receipe.component.scss']
})
export class AddReceipeComponent {

  separatorKeysCodes: number[] = [ENTER, COMMA];

  receipeForm = this.fb.group({
    receipeName: ['', [Validators.required, Validators.minLength(5)]],
    cuisine: ['', [Validators.required, Validators.minLength(5)]],
    featured: [false],
    rating: [0, [Validators.required, Validators.min(1), Validators.max(10)]],
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

  receipeList;


  // DI - Dependency Injection
  constructor(
    private receipeDataService: ReceipeDataService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.receipeList = receipeDataService.getReceipes();
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

  addReceipe() {
    console.log(this.receipeForm.status);

    if (this.receipeForm.valid) {
      const newReceipe = this.receipeForm.value;
      console.log(newReceipe);
      // this.movieService.setMovieList(newMovie as Movie);
      this.receipeDataService.createMovie(newReceipe as Receipe).subscribe(() => {
        this.router.navigate(['/receipes']);
      });
    }
  }


}
