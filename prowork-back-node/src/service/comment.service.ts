import Comment from "../models/Comment.model";
import { Request } from "express";
import User from "../models/User.model";
import Issue from "../models/Issue.model";

export const findAllCommentsByIssueId = async (req: Request): Promise<Comment[]> => {
    return await Comment.findAll({ where: { issueId: req.query.issueId }, include: [{ model: User }, { model: Issue, as: 'issue' }] });
}

export const createComment = async (req: Request): Promise<Comment> => {
    return await Comment.create({
        issueId: req.body.issue,
        commentedById: req.user.username,
        commentText: req.body.commentText
    });
}

export const deleteComment = async (req: Request): Promise<number> => {
    return await Comment.destroy({ where: { commentId: req.body.commentId } });
}