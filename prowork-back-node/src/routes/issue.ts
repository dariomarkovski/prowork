import { Router, Request, Response } from "express";
import passport = require("passport");
import { createIssue, changeStatus, changeAssignee, findAllIssues, findAllCreatedIssues, findAllAssignedIssues, findAllReviewingIssues } from "../service/issue.service";

let issueRouter = Router();

issueRouter.post('/new', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    res.send((await createIssue(req)).get({ plain: true }));
});

issueRouter.post('/changeStatus', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    res.send((await changeStatus(req)).get({ plain: true }));
});

issueRouter.post('/changeAssignee', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    res.send((await changeAssignee(req)).get({ plain: true }));
});

issueRouter.get('/all', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    res.send(await findAllIssues(req));
});

issueRouter.get('/created', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    res.send(await findAllCreatedIssues(req));
});

issueRouter.get('/assigned', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    res.send(await findAllAssignedIssues(req));
});

issueRouter.get('/reviewed', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    res.send(await findAllReviewingIssues(req));
});

export { issueRouter }