import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MoveFormComponent } from 'src/app/components/move-form/move-form.component';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { Item } from 'src/app/interfaces/item';
import { Movement } from 'src/app/interfaces/movement';
import { Place } from 'src/app/interfaces/place';
import { ItemService } from 'src/app/services/item.service';
import { MovementsService } from 'src/app/services/movements.service';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-move-item',
  templateUrl: './move-item.component.html',
  styleUrls: ['./move-item.component.scss']
})
export class MoveItemComponent {
  public placeID: string = ''
  public itemIDSearch: string = ''
  public placeFound: Place = {} as Place
  public itemFound: Item = {} as Item
  public currentMovement: Movement = {} as Movement

  constructor(
    private itemService: ItemService,
    private placesService: PlacesService,
    private momenetsService: MovementsService,
    public matDialog: MatDialog,
    private matSnackBar: MatSnackBar) {
    
  }

  async loadItemByID(itemID: string) {
    
    try {
      const res = await this.itemService.readItemByID(itemID)
      
      const mapItem = {
        id: res.id, 
        ...res.data()
      } as Item

      console.log(mapItem)

      this.itemFound = mapItem
    } catch (error) {
      
    }
  }

  getPlaceByID(id: string) {
    this.placesService.readPlaceByID(id)
    .then(res => {
      const mapPlace = {
        id: res.id, 
        ...res.data()
      } as Place

      console.log(mapPlace)

      this.placeFound = mapPlace
    })
    .catch(err => {
      console.log(err)
    })
  }

  moveItem(){
    this.currentMovement.item = this.itemFound
    this.currentMovement.place = this.placeFound
    this.currentMovement.createdAt = new Date().toISOString()

    this.momenetsService.createMovement(this.currentMovement)
    .then(res => {
      this.presentSnackBar('Item ingresado')
    })
    .catch(err => {
      console.log(err)
    })
  }

  async onItemInputKeypress(event: any) {
    await this.loadItemByID(this.itemIDSearch)
    if (!this.itemFound.type) {
      this.presentSnackBar('Item no encontrado')
      return
    }
    this.moveItem()
  }

  onPlaceKeypress(event: any) {
    this.getPlaceByID(this.placeID)
    this.placeID = ''
  }

  async onEnterItem() {
    await this.loadItemByID(this.itemIDSearch)
    if (!this.itemFound.type) {
      this.presentSnackBar('Item no encontrado')
      return
    }

    this.moveItem()
  }

  onShowModalQR(item: Item) {
    this.matDialog.open(QrComponent, {
      data: {
        qrData: item.id
      }
    })
  }

  onChangePlace() {
    this.placeFound = {} as Place
  }

  presentSnackBar(message: string) {
    this.matSnackBar.open(message, undefined, {
      duration: 3000
    });
  }
}
