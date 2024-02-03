import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddItemComponent } from './pages/item/add-item/add-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { QRCodeModule } from 'angularx-qrcode'

/** Material */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
 

import { QrComponent } from './components/qr/qr.component';
import { MoveItemComponent } from './pages/item/move-item/move-item.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { getApp, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore, CACHE_SIZE_UNLIMITED, initializeFirestore, persistentLocalCache } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { MoveFormComponent } from './components/move-form/move-form.component';
import { MovementsComponent } from './pages/item/movements/movements.component';
import { OperatorComponent } from './pages/admin/operator/operator.component';

@NgModule({
  declarations: [
    AppComponent,
    AddItemComponent,
    QrComponent,
    MoveItemComponent,
    ItemFormComponent,
    MoveFormComponent,
    MovementsComponent,
    OperatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideAuth(() => getAuth()),
    provideFirestore(() => {
      const firestore = initializeFirestore(
        getApp(),
        {
          localCache: persistentLocalCache({
            cacheSizeBytes: CACHE_SIZE_UNLIMITED
          }),
        }
      )

      return firestore
    }),
    // provideFunctions(() => getFunctions()),
    // provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
