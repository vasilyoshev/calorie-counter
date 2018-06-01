import { Goal } from './goal';

export class User {

    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    remember: boolean;
    goal: Goal;
}
