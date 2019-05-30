import { Model, ForeignKey, Column, BelongsTo, HasMany, AutoIncrement, PrimaryKey, Table } from "sequelize-typescript";
import User from "./User.model";
import Comment from "./Comment.model";

@Table
export default class Issue extends Model<Issue>{

    @PrimaryKey
    @AutoIncrement
    @Column
    public issueId: number;

    @Column
    public name: string;

    @Column
    public status: 'NONE' | 'DONE' | 'WORKING';

    @Column
    public type: 'TASK' | 'STORY' | 'BUG';

    @ForeignKey(() => User)
    @Column
    public createdById: string;

    @BelongsTo(() => User, { foreignKey: 'createdById' })
    public createdBy: User

    @ForeignKey(() => User)
    @Column
    public reviewedById: string;

    @BelongsTo(() => User, { foreignKey: 'reviewedById' })
    public reviewedBy: User

    @ForeignKey(() => User)
    @Column
    public assignedToId: string;

    @BelongsTo(() => User, { foreignKey: 'assignedToId' })
    public assignedTo: User

    @Column
    public dateCreated: Date;

    @Column
    public dateDue: Date;

    @Column
    public description: string;

    @HasMany(() => Comment)
    public comments: Comment[]

}