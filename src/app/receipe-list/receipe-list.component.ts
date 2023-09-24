import { Component, EventEmitter, Output } from '@angular/core';
import { ReceipeDataService } from '../receipe-data.service';
import { Receipe } from '../app.component';
import { FormBuilder } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs';


@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.scss']
})
export class ReceipeListComponent {

  searchForm = this.fb.group({
    search: '',
  });


  get search() {
    return this.searchForm.get('search');
  }

  delete(idx: number) {
    this.receipes.splice(idx, 1);
  }

  receipes: Array<Receipe> = [];
  getMovieList: Subscription | any;
  constructor(private receipeDataService: ReceipeDataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.search?.valueChanges
      .pipe(
        debounceTime(1500),
        distinctUntilChanged(),
        switchMap((name) => this.receipeDataService.searchReceipeList(name || ''))
      )
      .subscribe((mvList) => {
        this.receipes = mvList;
      });
    this.loadReceipesData();
  }

  loadReceipesData() {
    this.getMovieList = this.receipeDataService
      .getReceipeListFromMockAPI()
      .subscribe((rcList) => {
        this.receipes = rcList;
      });
  }

  ngOnDestroy() {
    console.log('Destory');
    this.getMovieList.unsubscribe();
  }
}

