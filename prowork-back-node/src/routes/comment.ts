import { Router, Request, Response } from "express";
import passport = require("passport");
import { deleteComment, findAllCommentsByIssueId, createComment } from "../service/comment.service";

let commentRouter = Router();

commentRouter.get('/allByIssueId', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    res.send(await findAllCommentsByIssueId(req));
});

commentRouter.post('/new', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    res.send((await createComment(req)).get({ plain: true }));
});

commentRouter.post('/delete', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    res.send({ deleted: await deleteComment(req) });
});

export { commentRouter }