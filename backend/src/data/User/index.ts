// @ts-nocheck
import {v4 as uuid} from 'uuid';
import {fakerRU as faker, Sex} from '@faker-js/faker';
import log4js from "log4js";

export type UserData = {
    id: string;
    name: string;
    role: 'merchant' | 'riskManager',
}

export const generateUsers = (count: number): UserData[] => {
    const result = [];
    for(let i = 0; i < count; i++) {
        const userData: UserData = {
            id: uuid(),
            name: faker.person.firstName(i % 2 === 0 ? Sex.Male : Sex.Female),
            role: i%2 === 0 ? 'merchant' : 'riskManager',
        }
        result.push(userData);
    }
    return result;
}

export class UserRepository {
    private users: Record<string, UserData> = {};
    constructor() {
        const initialUsers = generateUsers(2);
        initialUsers.forEach((user) => {
            this.users[user.id] = user;
        })
    }

    public getUserById(id: string): UserData | null {
        return this.users[id] || null;
    }

    public getUsers() {
        return Object.values(this.users);
    }
}