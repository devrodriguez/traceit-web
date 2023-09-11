import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent {
  public newItem: Item = {} as Item

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  onCreateItem() {
  }
}
