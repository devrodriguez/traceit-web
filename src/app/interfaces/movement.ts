import { Item } from "./item";
import { Place } from "./place";

export interface Movement {
    item: Item
    place: Place
    createdAt: string
}
