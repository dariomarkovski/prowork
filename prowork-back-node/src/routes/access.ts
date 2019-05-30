import { Request, Response, Router } from "express";
import { loginUser, registerUser } from "../service/access.service";

let accessRouter = Router();

accessRouter.post('/register', async (req: Request, res: Response) => {
    res.send((await registerUser(req)).get({ plain: true }));
})

accessRouter.post('/login', async (req: Request, res: Response) => {
    res.send((await loginUser(req)));
})

export { accessRouter };
