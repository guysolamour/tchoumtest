import { Document } from 'mongoose';
export interface IContinent extends Document{
    readonly code: string;
    readonly name: string;
}