import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceipesRoutingModule } from './receipes-routing.module';

import { AddReceipeComponent } from '../add-receipe/add-receipe.component';
import { CounterComponent } from '../counter/counter.component';
import { EditReceipeComponent } from '../edit-receipe/edit-receipe.component';
import { ReceipeDetailsComponent } from '../receipe-details/receipe-details.component';
import { ReceipeListComponent } from '../receipe-list/receipe-list.component';
import { ReceipeComponent } from '../receipe/receipe.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InfiniteScrollDirective } from '../infinite-scroll.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatDialogModule,
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';








@NgModule({
  declarations: [

    ReceipeComponent,


    CounterComponent,
    ReceipeListComponent,

    AddReceipeComponent,
    EditReceipeComponent,
    ReceipeDetailsComponent,
    InfiniteScrollDirective,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    ReceipesRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatBadgeModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatChipsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers: [
    // MatDialog
  ]
})
export class ReceipesModule { }


