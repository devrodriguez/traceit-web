import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Operator } from 'src/app/interfaces/operator';
import { OperatorsService } from 'src/app/services/operators.service';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent {
  constructor(
    private operatorSrv: OperatorsService,
    private matSnackBar: MatSnackBar) {
    this.getOperators()
  }

  public newOperator: Operator = {} as Operator
  public operators: Operator[] = [] as Operator[]

  onCreateOperator() {
    this.createOperator()
  }

  getOperators() {
      this.operatorSrv.readOperatorSnap()
      .subscribe({
        next: (curOperators) => {
          this.operators = curOperators
        },
        error: (err) => {
          console.error(err)
        }
      })
  }

  async createOperator() {
    let operatorCode = uuidv4()

    this.newOperator.code = operatorCode

    try {
      const res = await this.operatorSrv.createOperator(this.newOperator)
    } catch (err) {
      console.error(err)
    }
  }

  presentSnackBar(message: string) {
    this.matSnackBar.open(message, undefined, {
      duration: 3000
    });
  }

  onCopyCode(operator: Operator) {
    navigator.clipboard.writeText(operator.code || '')
    this.presentSnackBar('¡Codigo copiado!')
  }

}
