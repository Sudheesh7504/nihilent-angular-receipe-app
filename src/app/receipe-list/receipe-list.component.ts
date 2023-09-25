import { Component, EventEmitter, Output } from '@angular/core';
import { ReceipeDataService } from '../receipe-data.service';
import { Receipe } from '../app.component';
import { FormBuilder } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  receipes: Array<Receipe> = [];
  getMovieList: Subscription | any;
  isLoading: boolean = false;
  searchTerm!: string;
  searchForm = this.fb.group({
    search: '',
  });


  get search() {
    return this.searchForm.get('search');
  }

  delete(idx: number) {
    this.receipes.splice(idx, 1);
  }


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


  onNewItems(newItems: Receipe[]): void {
    if (newItems.length === 0) {
      this.receipes = []; // Reset the list if an empty array is received
    } else {
      this.receipes = [...this.receipes, ...newItems];
    }
  }

  onLoadingChange(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  ngOnDestroy() {
    console.log('Destory');
    this.getMovieList.unsubscribe();
  }
}

