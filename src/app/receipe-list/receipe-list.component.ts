


import { Component, OnInit } from '@angular/core';
import { ReceipeDataService } from '../receipe-data.service';
import { Receipe } from '../app.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.scss'],
})
export class ReceipeListComponent implements OnInit {
  receipes: Array<Receipe> = [];
  isLoading: boolean = false;
  searchTerm!: string;
  searchForm: FormGroup;

  sortType: string = 'recipeName'; // Default sorting field
  order: string = 'asc'; // Default sorting order
  previousSearches: string[] = [];

  constructor(
    private receipeDataService: ReceipeDataService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: '',
    });
  }

  ngOnInit() {
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(1500),
        distinctUntilChanged(),
        switchMap((name) => this.receipeDataService.searchReceipeList(name || ''))
      )
      .subscribe((mvList) => {
        this.receipes = mvList;
        this.applySorting();
      });

    // this.loadReceipesData();
  }

  loadReceipesData() {
    this.receipeDataService
      .getReceipeListFromMockAPI()
      .subscribe((rcList) => {
        this.receipes = rcList;
        this.applySorting(); // Apply sorting after loading data
      });
  }

  deleteReceipe(receipe: Receipe, idx: number) {
    const deletedReceipe = this.receipes[idx];
    this.receipes.splice(idx, 1);

    this.receipeDataService.deleteReceipesById(receipe.id).subscribe(
      () => {
        console.log('Recipe deleted successfully');
      },
      (error) => {
        this.receipes.splice(idx, 0, deletedReceipe);
        console.error('Delete failed, restoring recipe', error);
      }
    );
  }

  onSortChange(event: MatSelectChange): void {
    this.sortType = event.value;
    this.applySorting();
  }

  onOrderChange(event: MatSelectChange): void {
    this.order = event.value;
    this.applySorting();
  }

  applySorting() {
    if (this.sortType && this.order) {

      this.receipes.sort((a: Receipe, b: Receipe) => {
        const sortOrder = this.order === 'asc' ? 1 : -1;
        if (this.sortType === 'receipeName') {
          return a.receipeName.localeCompare(b.receipeName) * sortOrder;
        } else if (this.sortType === 'rating') {
          return (a.rating - b.rating) * sortOrder;
        } else if (this.sortType === 'uploadedDate') {

        }
        return 0;
      });
    }
  }

  onNewItems(newItems: Receipe[]): void {
    if (newItems.length === 0) {
      // this.receipes = [];
    } else {
      this.receipes = [...this.receipes, ...newItems];
      this.applySorting();
    }
  }

  onLoadingChange(isLoading: boolean): void {
    this.isLoading = isLoading;
  }
}