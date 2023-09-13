import { Component } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

/** Data */
import types from '../../../mock-data/type.json';
import varieties from '../../../mock-data/variety.json';
import colours from '../../../mock-data/color.json';
import { Item } from 'src/app/interfaces/item';
import { Type } from 'src/app/interfaces/type';
import { Variety } from 'src/app/interfaces/variety';
import { Color } from 'src/app/interfaces/color';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { ItemFormComponent } from 'src/app/components/item-form/item-form.component';
import { ItemService } from 'src/app/services/item.service';

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
    public matDialog: MatDialog
  ) {
    this.types = types
    this.varieties = varieties
    this.colours = colours

    this.getItems()
  }

  getItems() {
    this.itemService.readItems()
    .then(res => {
      const mapItem = res.docs.map(r => {
        return {
          id: r.id, 
          ...r.data()
        } as Item
      })

      this.items = mapItem
    })
  }

  onCreateItem() {
    this.itemService.saveItem(this.newItem)
    .then(res => {
      console.log('ITEM SAVED!!', res)
    })
    .catch(err => {
    })
  }

  onShowModalQR(item: Item) {
    this.matDialog.open(QrComponent, {
      data: {
        qrData: item.id
      }
    })
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
    navigator.clipboard.writeText(item.id)
  }
}
