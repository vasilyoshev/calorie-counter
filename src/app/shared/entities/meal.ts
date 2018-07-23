import { Food } from './food';

export class Meal {
    type: string;
    foods: Array<Food>;
    date: Date;
    time: string;
}
