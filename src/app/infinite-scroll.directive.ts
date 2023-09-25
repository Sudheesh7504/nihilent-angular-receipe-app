
import { Directive, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { ReceipeDataService } from './receipe-data.service';
import { Receipe } from './app.component';
@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit {

  @Output() items: EventEmitter<Receipe[]> = new EventEmitter();
  @Output() loading: EventEmitter<boolean> = new EventEmitter();
  // @Input() apiEndpoint: string;
  @Input() pageSize!: number;
  private _searchTerm!: string;
  private currentPage: number = 1;
  private isLoading: boolean = false;
  private hasMoreItems: boolean = true;


  @Input()
  set searchTerm(term: string) {
    if (this._searchTerm !== term) {
      this._searchTerm = term;
      this.currentPage = 1;
      this.hasMoreItems = true; // Reset the flag when search term changes
      this.items.emit([]);
      this.loadMoreData();
    }
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  constructor(private receipeDataService: ReceipeDataService) { }

  ngOnInit(): void {
    this.loadInitialData();
    this.listenForScroll();
  }

  private loadInitialData(): void {
    this.loadMoreData();
  }

  private listenForScroll(): void {
    window.addEventListener('scroll', () => {
      const pos =
        (document.documentElement.scrollTop || document.body.scrollTop) +
        document.documentElement.offsetHeight;
      const max = document.documentElement.scrollHeight;

      if (pos >= max - 100 && !this.isLoading && this.hasMoreItems) {
        this.loadMoreData();
      }
    });
  }

  private loadMoreData(): void {
    if (!this.hasMoreItems) return; // Don't load more data if flag is false

    this.isLoading = true;
    this.loading.emit(this.isLoading);

    this.receipeDataService
      .getReceipeListPagination(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe((data) => {
        if (data.length < this.pageSize) {
          this.hasMoreItems = false; // Set flag to false if fewer items are returned
        }
        this.items.emit(data);
        this.currentPage++;
        this.isLoading = false;
        this.loading.emit(this.isLoading);
      });
  }


}
