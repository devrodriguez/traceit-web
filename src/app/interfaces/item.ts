import { Color } from "./color"
import { Stage } from "./stage"
import { Type } from "./type"
import { Variety } from "./variety"

export interface Item {
    id: string
    type: Type
    variety: Variety
    color: Color
    amount: number
    currentStage: Stage
    createdAt: string
}
