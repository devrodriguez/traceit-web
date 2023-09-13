import { Component } from '@angular/core';
import { Movement } from 'src/app/interfaces/movement';
import { MovementsService } from 'src/app/services/movements.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent {
  public itemIDSearch: string = ''

  public movements: Movement[] = []

  constructor(
    private movementsService: MovementsService
  ) {

  }

  async loadMovements() {
    try {
      const res = await this.movementsService.readMovementsByItem(this.itemIDSearch)
      const mapMovements = res.docs.map(r => {
        return {
          id: r.id, 
          ...r.data()
        } as Movement
      })

      this.movements = mapMovements
    } catch (error) {
      console.log(error)
    }
  }

  onItemInputKeypress(event: any) {
    this.loadMovements()
  }

  onSearchItem() {
    this.loadMovements()
  }
}
