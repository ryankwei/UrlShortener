
import express from "express";

export interface TokenRequest extends express.Request {
    token?: string;
}

export interface NewLink {
    fromLink: string;
    toLink: string;
    numReached: number;
}
export type UpdateLink = Partial<NewLink>;
export interface NewUser {
    username: string;
    name: string;
    password: string;
}