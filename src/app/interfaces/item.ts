import { Color } from "./color"
import { Type } from "./type"
import { Variety } from "./variety"

export interface Item {
    type: Type
    variety: Variety
    color: Color
    amount: number
    
}
