import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ReceipeListComponent } from './receipe-list/receipe-list.component';
import { AddReceipeComponent } from './add-receipe/add-receipe.component';
import { EditReceipeComponent } from './edit-receipe/edit-receipe.component';
import { ReceipeDetailsComponent } from './receipe-details/receipe-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: WelcomeComponent },
  { path: 'receipes', component: ReceipeListComponent },
  { path: 'add', component: AddReceipeComponent },
  { path: 'receipes/edit/:id', component: EditReceipeComponent },
  { path: 'recipes/:id', component: ReceipeDetailsComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
