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
    public matDialog: MatDialog
  ) {
    this.types = types
    this.varieties = varieties
    this.colours = colours
  }

  onCreateItem() {
    console.log('new item', this.newItem)
    this.items.push(this.newItem)
    this.newItem = {} as Item
  }

  onShowModalQR(item: Item) {
    this.matDialog.open(QrComponent, {
      data: {
        qrData: this.getItemRaw(item)
      }
    })
  }

  getItemRaw(item: Item) {
    return `${item.type.name}|${item.variety.name}|${item.color.name}`
  }
  
}
