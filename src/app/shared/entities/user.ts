import { Goal } from './goal';

export class User {
    id: string;
    fname: string;
    lname: string;
    username: string;
    email: string;
    password: string;
    remember: boolean;
    goal: Goal;
}
