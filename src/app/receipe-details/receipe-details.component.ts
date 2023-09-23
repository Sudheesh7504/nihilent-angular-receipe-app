import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';
import { Receipe } from '../app.component';
import { Subscription } from 'rxjs';
import { ReceipeDataService } from '../receipe-data.service';
@Component({
  selector: 'app-receipe-details',
  templateUrl: './receipe-details.component.html',
  styleUrls: ['./receipe-details.component.scss']
})
export class ReceipeDetailsComponent {
  id: string = '';
  receipe: any;

  receipes: Array<Receipe> = [];
  getReceipeById: Subscription | any;
  constructor(private router: ActivatedRoute, private receipeDataService: ReceipeDataService, private sanitizer: DomSanitizer) {
    const { id } = this.router.snapshot.params;
    this.id = id;

    console.log(receipeDataService.getReceipes());
    console.log(this.id);


  }

  ngOnInit() {
    this.receipeDataService.getReceipeById(this.id).subscribe((rc: any) => {
      console.log(rc);
      this.receipe = rc;
      this.receipe.foodVlog = this.sanitizer.bypassSecurityTrustResourceUrl(rc.foodVlog);


    })
  }

  show = true;
  toggleInstructions() {
    this.show = !this.show;
  }
}
