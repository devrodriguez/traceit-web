import { Component } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { Movement } from 'src/app/interfaces/movement';
import { Place } from 'src/app/interfaces/place';

@Component({
  selector: 'app-move-item',
  templateUrl: './move-item.component.html',
  styleUrls: ['./move-item.component.scss']
})
export class MoveItemComponent {
  public selectedPlace: Place = {} as Place
  public itemFound: Item = {} as Item
  public places: Place[] = [
    {
      name: 'Cuarto Frio 1'
    },
    {
      name: 'Entrada Finca X'
    }
  ]
  public currentMovement: Movement = {} as Movement

  onMoveItem(){
    this.currentMovement.item = this.itemFound
    this.currentMovement.place = this.selectedPlace
  }
}
