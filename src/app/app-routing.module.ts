import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './pages/item/add-item/add-item.component';
import { MoveItemComponent } from './pages/item/move-item/move-item.component';
import { MovementsComponent } from './pages/item/movements/movements.component';
import { OperatorComponent } from './pages/admin/operator/operator.component';

const routes: Routes = [
  {
    path: 'item/add',
    component: AddItemComponent
  },
  {
    path: 'item/move',
    component: MoveItemComponent
  },
  {
    path: 'item/movements',
    component: MovementsComponent
  },
  {
    path: 'admin/operators',
    component: OperatorComponent
  },
  {
    path: '**', 
    pathMatch: 'full', 
    redirectTo: 'item/add' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
