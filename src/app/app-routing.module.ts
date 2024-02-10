import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './pages/item/add-item/add-item.component';
import { MoveItemComponent } from './pages/item/move-item/move-item.component';
import { MovementsComponent } from './pages/item/movements/movements.component';
import { OperatorComponent } from './pages/admin/operator/operator.component';
import { LoginComponent } from './pages/auth/login/login.component';

import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'item/add',
    component: AddItemComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['auth/login'])}
  },
  {
    path: 'item/move',
    component: MoveItemComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['auth/login'])}
  },
  {
    path: 'item/movements',
    component: MovementsComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['auth/login'])}
  },
  {
    path: 'admin/operators',
    component: OperatorComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['auth/login'])}
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo(['item/add'])}
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
