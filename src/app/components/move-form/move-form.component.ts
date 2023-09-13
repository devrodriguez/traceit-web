import { Component } from '@angular/core';

import { Place } from 'src/app/interfaces/place';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-move-form',
  templateUrl: './move-form.component.html',
  styleUrls: ['./move-form.component.scss']
})
export class MoveFormComponent {
  public selectedPlace: Place = {} as Place
  public places: Place[] = []
  public amountMoved: number = 0

  constructor(
    private placesService: PlacesService
  ) {

  }

  getPlaces() {
    this.placesService.readPlaces()
    .then(res => {
      const mapPlaces = res.docs.map(r => {
        return {
          id: r.id, 
          ...r.data()
        } as Place
      })

      this.places = mapPlaces
    })
    .catch(err => {
      console.log(err)
    })
  }

  onMoveItem() {

  }
}
