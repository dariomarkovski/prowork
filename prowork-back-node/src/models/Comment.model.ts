import { Model, PrimaryKey, AutoIncrement, Column, ForeignKey, BelongsTo, Table } from "sequelize-typescript";
import Issue from "./Issue.model";
import User from "./User.model";

@Table
export default class Comment extends Model<Comment>{

    @PrimaryKey
    @AutoIncrement
    @Column
    public commentId: number;

    @ForeignKey(() => Issue)
    @Column
    public issueId: number;

    @BelongsTo(() => Issue)
    public issue: Issue

    @ForeignKey(() => User)
    @Column
    public commentedById: string;

    @BelongsTo(() => User)
    public commentedBy: User

    @Column
    public commentText: string;

}