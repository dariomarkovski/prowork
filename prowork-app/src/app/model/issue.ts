import {User} from "./user";

export class Issue {
  issueId: number;
  name: string;
  status: string;
  type: string;
  createdBy: User;
  reviewedBy: User;
  assignedTo: User;
  dateCreated: Date;
  dateDue: Date;
  description: string;
}
