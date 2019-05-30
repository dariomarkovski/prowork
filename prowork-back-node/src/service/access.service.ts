import User from "../models/User.model";
import { Request } from "express";
import * as bcrypt from 'bcrypt'
import { jwtOptions } from "../config/config";
const jwt = require('jsonwebtoken');

export const registerUser = async (req: Request): Promise<User> => {

    let userByUsername$ = User.findOne({ where: { username: req.body.username } });
    let userByEmail$ = User.findOne({ where: { email: req.body.email } });
    let userByUsername = await userByUsername$;
    let userByEmail = await userByEmail$;

    if (userByUsername) {
        throw new Error('Username is already taken');
    }
    if (userByEmail) {
        throw new Error('Email is already taken');
    }

    return await User.create({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        email: req.body.email,
        dateCreated: new Date()
    });

}

export const loginUser = async (req: Request): Promise<string> => {
    if (!req.body.username || !req.body.password) {
        throw new Error('Please provide valid username & password');
    }
    let user = await User.findOne({ where: { username: req.body.username } });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        let payload = { username: req.body.username };
        return jwt.sign(payload, jwtOptions.secretOrKey);
    } else {
        throw new Error('Wrong credentials');
    }
}