import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Receipe } from '../app.component';
import { Router } from '@angular/router';
import { ReceipeDataService } from '../receipe-data.service';
import { debounceTime, Subject, switchMap } from 'rxjs';



@Component({
  selector: 'app-receipe',
  templateUrl: './receipe.component.html',
  styleUrls: ['./receipe.component.scss']
})
export class ReceipeComponent {
  @Input() receipes: Receipe[] = [];
  @Input() receipe: Receipe = {
    id: '',
    receipeName: '',
    poster: '',
    cuisine: '',
    ingredients: [],
    instructions: '',
    receipeImage: '',
    foodVlog: '',
    like: 0,
    dislike: 0,
    uploadedDate: '',
    recommended: false,
    rating: 0,

  };


  @Input() idx: number = 0;
  // @Output() MrmIdx = new EventEmitter<number>();
  @Output() removeReceipe = new EventEmitter();
  likeSubject = new Subject<number>();
  disLikeSubject = new Subject<number>();



  constructor(private router: Router, private receipeDataService: ReceipeDataService) {
    this.likeSubject.pipe(debounceTime(1000),
      switchMap((likeCount) => {
        this.receipe = { ...this.receipe, like: likeCount }
        return this.receipeDataService.updateReceipe(this.receipe, this.receipe.id);
      })).subscribe();

    this.disLikeSubject.pipe(debounceTime(1000),
      switchMap((dislikeCount) => {
        this.receipe = { ...this.receipe, dislike: dislikeCount }
        return this.receipeDataService.updateReceipe(this.receipe, this.receipe.id);
      })).subscribe();

  }


  deleteReceipe() {
    this.receipeDataService.deleteReceipesById(this.receipe.id).subscribe(() => {
      console.log('Receipe deleted successfully');
      this.removeReceipe.emit();
    });
    // go refresh -> Parent
  }

  updateLikes(likeCount: number) {

    this.likeSubject.next(likeCount);

  }

  updateDislikes(dislikeCount: number) {
    this.disLikeSubject.next(dislikeCount);

  }

  editReceipe() {
    this.router.navigate(['/receipes/edit', this.receipe.id]);
  }

  show = true;
  toggleInstructions() {
    this.show = !this.show;
  }




  getdetails() {
    this.router.navigate(['/receipes', this.receipe.id]);
  }





}


