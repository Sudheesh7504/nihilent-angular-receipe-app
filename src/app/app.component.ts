import { Component } from '@angular/core';



type Receipe = {
  id: string;
  receipeName: string;
  poster: string;
  cuisine: string;
  ingredients: Array<string>;
  instructions: string;
  receipeImage: string;
  foodVlog: string;
  like: number;
  dislike: number;
  uploadedDate: string;
  recommended: boolean;
  rating: number;

  // filteredSearches: Array<string>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
class AppComponent {
  title = 'nihilent-angular-receipe-app';
}


export { Receipe, AppComponent };