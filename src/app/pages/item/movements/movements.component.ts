import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { groupBy, maxBy } from 'lodash-es'
import { Movement } from 'src/app/interfaces/movement';
import { Place } from 'src/app/interfaces/place';
import { MovementsService } from 'src/app/services/movements.service';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent {
  public itemIDSearch: string = ''
  public placeID: string = ''

  public places: Place[] = []
  public selectedPlace: Place = {} as Place
  public movementsByItem: Movement[] = []
  public movementsByPlace: Movement[] = []

  constructor(
    private placesService: PlacesService,
    private movementsService: MovementsService,
    private matSnackBar: MatSnackBar
  ) {
    this.loadPlaces()
  }

  async loadMovementsByItem() {
    try {
      const res = await this.movementsService.readMovementsByItem(this.itemIDSearch)
      const mapMovements = res.docs.map(r => {
        return {
          id: r.id, 
          ...r.data()
        } as Movement
      })

      if(mapMovements.length == 0) {
        this.presentSnackBar('No se encontraron movimientos para este item')
        return
      }

      mapMovements.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })

      this.movementsByItem = mapMovements
    } catch (error) {
      console.log(error)
    }
  }

  loadMovementsByPlace() {
    this.movementsService.readMovements()
    .then(res => {
      let foundMovements: Movement[] = []
      const mapMovements = res.docs.map(r => {
        return {
          id: r.id, 
          ...r.data()
        } as Movement
      })

      const grouped = groupBy(mapMovements, 'item.id')
      console.log(grouped)
      
      for (let key in grouped) {
        let max = maxBy(grouped[key], (o) => {
          return o.createdAt
        })

        if(max) {
          foundMovements.push(max)
        }
      }


      this.movementsByPlace = foundMovements.filter(row => {
        return row.place.id === this.selectedPlace.id
      })
    })
    .catch(err => {

    })
  }

  loadPlaces() {
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
  }

  onItemInputKeypress(event: any) {
    this.loadMovementsByItem()
  }

  onPlaceChange(event: any) {
    this.loadMovementsByPlace()
  }

  onSearchItem() {
    this.loadMovementsByItem()
  }

  presentSnackBar(message: string) {
    this.matSnackBar.open(message, undefined, {
      duration: 3000
    });
  }
}
