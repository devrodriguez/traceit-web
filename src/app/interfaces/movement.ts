import { Item } from "./item";
import { Place } from "./place";

export interface Movement {
    id: string
    item: Item
    place: Place
    createdAt: string
}
