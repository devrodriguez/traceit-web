import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './pages/item/add-item/add-item.component';
import { MoveItemComponent } from './pages/item/move-item/move-item.component';

const routes: Routes = [
  {
    path: 'item/add',
    component: AddItemComponent
  },
  {
    path: 'item/move',
    component: MoveItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
