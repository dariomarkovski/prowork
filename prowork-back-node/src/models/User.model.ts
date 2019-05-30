import { Column, Model, PrimaryKey, Unique, Table, HasMany } from 'sequelize-typescript';
import Issue from './Issue.model';
import Comment from './Comment.model';

@Table
export default class User extends Model<User>{

    @PrimaryKey
    @Column
    public username: string;

    @Column
    public password: string;

    @Unique
    @Column
    public email: string;

    @Column
    public dateCreated: Date;

    @Column
    public resetToken: string;

    @HasMany(() => Issue, { foreignKey: 'createdById' })
    public createdIssues: Issue[]

    @HasMany(() => Issue, { foreignKey: 'reviewedById' })
    public reviewingIssues: Issue[]

    @HasMany(() => Issue, { foreignKey: 'assignedToId' })
    public assignedIssues: Issue[]

    @HasMany(() => Comment)
    public comments: Comment[]
}