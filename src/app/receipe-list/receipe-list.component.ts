
import { Component, OnInit } from '@angular/core';
import { ReceipeDataService } from '../receipe-data.service';
import { Receipe } from '../app.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  startWith,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';

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
  sortType: string = 'recipeName';
  order: string = 'asc';
  previousSearches: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(
    private receipeDataService: ReceipeDataService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: '',
    });
  }

  ngOnInit() {
    this.filteredOptions = this.searchForm.get('search')!.valueChanges.pipe(
      startWith(''),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((name) => {
        this.searchTerm = name;
        this.applySorting();
        return this.receipeDataService.searchReceipeList(name || '')
      }),
      map((mvList) => mvList.map((rc) => rc.receipeName))
    );

    // this.loadReceipesData();
  }

  loadReceipesData() {
    this.receipeDataService.getReceipeListFromMockAPI().subscribe((rcList) => {
      this.receipes = rcList;
      this.applySorting();
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
    this.receipes = this.receipes.filter(recipe => {
      const matchesSearch = !this.searchTerm || recipe.receipeName.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesSearch;
    });
    if (this.sortType && this.order) {
      this.receipes.sort((a: Receipe, b: Receipe) => {
        const sortOrder = this.order === 'asc' ? 1 : -1;
        if (this.sortType === 'receipeName') {
          return a.receipeName.localeCompare(b.receipeName) * sortOrder;
        } else if (this.sortType === 'rating') {
          return (a.rating - b.rating) * sortOrder;
        } else if (this.sortType === 'uploadedDate') {
          // Add logic for sorting by uploadedDate if needed
        }
        return 0;
      });
    }
  }

  // onNewItems(newItems: Receipe[]): void {
  //   if (newItems.length === 0) {
  //     // Handle empty newItems array if needed
  //     return;
  //   }

  //   for (const newItem of newItems) {
  //     const isDuplicate = this.receipes.some(existingItem => existingItem.id === newItem.id);
  //     if (!isDuplicate) {
  //       this.receipes.push(newItem);
  //     }
  //   }

  //   this.applySorting();
  // }


  onNewItems(newItems: Receipe[]): void {
    const existingsongs = new Set(this.receipes.map((rc) => rc.id))
    // if (newItems.length === 0) {
    //   return;
    // }
    const uniqueNewItems = newItems.filter(
      (newItem) => !existingsongs.has(newItem.id)
    );
    // const uniqueNewItems = newItems.filter(newItem => !this.musiclist.some(existingItem => existingItem.id === newItem.id));

    this.receipes = [...this.receipes, ...uniqueNewItems];
    this.applySorting();
  }

  onLoadingChange(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  clearSearch() {
    this.searchForm.get('search')?.setValue('');
  }
}

