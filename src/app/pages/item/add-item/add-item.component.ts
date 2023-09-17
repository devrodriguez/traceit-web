import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/interfaces/item';
import { Type } from 'src/app/interfaces/type';
import { Variety } from 'src/app/interfaces/variety';
import { Color } from 'src/app/interfaces/color';
import { ItemFormComponent } from 'src/app/components/item-form/item-form.component';
import { ItemService } from 'src/app/services/item.service';

/** Data */
import types from '../../../mock-data/type.json';
import varieties from '../../../mock-data/variety.json';
import colours from '../../../mock-data/color.json';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  public newItem: Item = {} as Item
  public items: Item[] = []
  public types: Type[] = []
  public varieties: Variety[] = []
  public colours: Color[] = []

  constructor(
    private itemService: ItemService,
    public matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {
    this.types = types
    this.varieties = varieties
    this.colours = colours

    this.loadItems()
    
  }

  loadItems() {
    this.itemService.readItemsSnap()
    .subscribe(items => {
      this.items = items
    }, err => {
      console.log(err)
    })
  }

  onCreateItem() {
    this.newItem.createdAt = new Date().toISOString()
    this.itemService.saveItem(this.newItem)
    .then(res => {
      this.presentSnackBar('Item creado')
      this.resetForm()
    })
    .catch(err => {
      console.log(err)
    })
  }

  onShowModalQR(item: any) {
    const qrImage = item.qrcElement.nativeElement.getElementsByTagName('img')[0].currentSrc
    const qrWindow = window.open("", "_blank")
    qrWindow?.document.write("<img style=\"min-width: 200px;\" src=\""+qrImage+"\">");
    setTimeout(()=> {
      qrWindow?.print()
      qrWindow?.close()
    }, 100)
    
  }

  onShowModalAddItem() {
    this.matDialog.open(ItemFormComponent, {
      data: {
        types: this.types,
        varieties: this.varieties,
        colours: this.colours
      }
    })
  } 

  onCopy(item: Item) {
    navigator.clipboard.writeText(item.id || '')
    this.presentSnackBar('ID de item copiado al portapapeles')
  }

  /** Utils */
  resetForm() {
    this.newItem.type = {} as Type
    this.newItem.variety = {} as Variety
    this.newItem.color = {} as Color
    this.newItem.amount = 0
  }

  presentSnackBar(message: string) {
    this.matSnackBar.open(message, undefined, {
      duration: 3000
    });
  }
}
