
import {
  Directive,
  Output,
  EventEmitter,
  OnInit,
  Input, HostListener
} from '@angular/core';
import { ReceipeDataService } from './receipe-data.service';
import { Receipe } from './app.component';
import { finalize } from 'rxjs/operators';
@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit {

  @Output() items = new EventEmitter<Receipe[]>();
  @Output() loading = new EventEmitter<boolean>();
  @Input() pageSize!: number;
  private _searchTerm!: string;
  private currentPage = 1;
  private isLoading = false;
  private hasMoreItems = true;
  private _order: string = 'asc'; // asc or desc
  private _sortType: string = 'default'; // default, title, or date

  @Input()
  set sortType(type: string) {
    if (this._sortType !== type) {
      this._sortType = type;
      this.resetAndLoad();
    }
  }

  get sortType(): string {
    return this._sortType;
  }

  @Input()
  set searchTerm(term: string) {
    if (this._searchTerm !== term) {
      this._searchTerm = term;
      this.resetAndLoad();
    }
  }

  @Input()
  set order(value: string) {
    if (this._order !== value) {
      this._order = value;
      this.resetAndLoad();
    }
  }

  get order(): string {
    return this._order;
  }

  constructor(private receipeDataService: ReceipeDataService) { }

  ngOnInit(): void {
    this.resetAndLoad();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const isBottom =
      document.documentElement.scrollTop +
      document.documentElement.offsetHeight >=
      document.documentElement.scrollHeight - 100;
    if (isBottom && !this.isLoading && this.hasMoreItems) {
      this.loadMoreData();
    }
  }

  private resetAndLoad(): void {
    this.currentPage = 1;
    this.hasMoreItems = true;
    this.items.emit([]);
    this.loadMoreData();
  }

  private loadMoreData(): void {
    if (!this.hasMoreItems) return;

    this.isLoading = true;
    this.loading.emit(true);

    this.receipeDataService
      .getReceipeListPagination(
        this.currentPage,
        this.pageSize,
        this._searchTerm,
        this._sortType,
        this._order
      )
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loading.emit(false);
        })
      )
      .subscribe((data) => {
        this.hasMoreItems = data.length >= this.pageSize;
        this.items.emit(data);
        this.currentPage++;
      });
  }
}



