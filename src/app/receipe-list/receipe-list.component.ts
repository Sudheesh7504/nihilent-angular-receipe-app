
import { Component, OnInit } from '@angular/core';
import { ReceipeDataService } from '../receipe-data.service';
import { Receipe } from '../app.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

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

  sortType: string = 'default'; // default, title, or date
  order: string = ''; // asc or desc
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
        switchMap((name) =>
          this.receipeDataService.searchReceipeList(name || '')
        )
      )
      .subscribe((mvList) => {
        this.receipes = mvList;
      });

    this.loadReceipesData();
  }

  loadReceipesData() {
    this.receipeDataService
      .getReceipeListFromMockAPI()
      .subscribe((rcList) => {
        this.receipes = rcList;
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
  }

  onOrderChange(event: MatSelectChange): void {
    this.order = event.value;
  }

  onNewItems(newItems: Receipe[]): void {
    if (newItems.length === 0) {
      this.receipes = [];
    } else {
      this.receipes = [...this.receipes, ...newItems];
    }
  }

  onLoadingChange(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  //   clearSearch() {
  //     const searchValue = this.searchForm.get('search')?.value;
  //     if (searchValue) {
  //       this.previousSearches.push(searchValue);
  //     }
  //     this.searchForm.get('search')?.setValue('');
  //   }
  // }

}

