import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceipeListComponent } from '../receipe-list/receipe-list.component';
import { AddReceipeComponent } from '../add-receipe/add-receipe.component';
import { EditReceipeComponent } from '../edit-receipe/edit-receipe.component';
import { ReceipeDetailsComponent } from '../receipe-details/receipe-details.component';

const routes: Routes = [
  { path: '', component: ReceipeListComponent, pathMatch: 'full' },
  { path: 'add', component: AddReceipeComponent },
  { path: 'edit/:id', component: EditReceipeComponent },
  { path: ':id', component: ReceipeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceipesRoutingModule { }
