import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReceipeComponent } from './receipe/receipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { CounterComponent } from './counter/counter.component';
import { ReceipeListComponent } from './receipe-list/receipe-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddReceipeComponent } from './add-receipe/add-receipe.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { EditReceipeComponent } from './edit-receipe/edit-receipe.component';
import { ReceipeDetailsComponent } from './receipe-details/receipe-details.component';





@NgModule({
  declarations: [
    AppComponent,
    ReceipeComponent,


    CounterComponent,
    ReceipeListComponent,
    WelcomeComponent,
    AddReceipeComponent,
    EditReceipeComponent,
    ReceipeDetailsComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatIconModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatCardModule,
    MatBadgeModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
