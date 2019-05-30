import { Request } from "express";
import Sequelize from "../models/index";
import Issue from "../models/Issue.model";
import User from "../models/User.model";

export const createIssue = async (req: Request): Promise<Issue> => {
    return await Issue.create({
        name: req.body.name,
        status: 'NONE',
        type: req.body.type,
        createdById: req.user.username,
        assignedToId: req.body.assignedTo,
        reviewedById: req.body.reviewedBy,
        dateCreated: new Date(),
        dateDue: req.body.dueDateSelected ? req.body.dateDue : null,
        description: req.body.description
    });
}

export const changeStatus = async (req: Request): Promise<Issue> => {
    let status = null;
    switch (req.body.statusCode) {
        case 0: status = 'NONE'; break;
        case 1: status = 'WORKING'; break;
        case 2: status = 'DONE'; break;
        default: throw new Error('Wrong status code');
    }
    await Issue.update(
        {
            status: status
        }, {
            where: { issueId: req.body.issueId }
        }
    )
    let issue = await Issue.findOne({ where: { issueId: req.body.issueId } });
    if (!issue) {
        throw new Error('Something went wrong');
    }
    return issue;
}

export const changeAssignee = async (req: Request): Promise<Issue> => {
    await Issue.update(
        {
            assignedToId: req.body.username
        }, {
            where: { issueId: req.body.issueId }
        }
    )
    let issue = await Issue.findOne({ where: { issueId: req.body.issueId } });
    if (!issue) {
        throw new Error('Something went wrong');
    }
    return issue;
}

export const findAllIssues = async (req: Request): Promise<Issue[]> => {
    return await Issue.findAll({
        where: {
            [Sequelize.Op.or]: [
                { createdById: req.user.username },
                { assignedToId: req.user.username },
                { reviewedById: req.user.username }
            ]
        },
        include: [
            { model: User, as: 'createdBy' },
            { model: User, as: 'assignedTo' },
            { model: User, as: 'reviewedBy' }
        ]
    });
}

// Functions below are not used anywhere

export const findAllCreatedIssues = async (req: Request): Promise<Issue[]> => {
    return await Issue.findAll({
        where: { createdById: req.user.username },
        include: [
            { model: User, as: 'createdBy' },
            { model: User, as: 'assignedTo' },
            { model: User, as: 'reviewedBy' }
        ]
    });
}

export const findAllAssignedIssues = async (req: Request): Promise<Issue[]> => {
    return await Issue.findAll({
        where: { assignedToId: req.user.username },
        include: [
            { model: User, as: 'createdBy' },
            { model: User, as: 'assignedTo' },
            { model: User, as: 'reviewedBy' }
        ]
    });
}

export const findAllReviewingIssues = async (req: Request): Promise<Issue[]> => {
    return await Issue.findAll({
        where: { reviewedById: req.user.username },
        include: [
            { model: User, as: 'createdBy' },
            { model: User, as: 'assignedTo' },
            { model: User, as: 'reviewedBy' }
        ]
    });
}