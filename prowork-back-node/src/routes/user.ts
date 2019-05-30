import { Router, Request, Response } from "express";
import passport = require("passport");
import User from "../models/User.model";

let userRouter = Router();

userRouter.get('/getAll', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    let users = await User.findAll();
    res.send(users.map((it) => it.get({ plain: true })));
})

export { userRouter }