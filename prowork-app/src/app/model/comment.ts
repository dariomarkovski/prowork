import {Issue} from "./issue";
import {User} from "./user";

export class Comment {
  commentId: number;
  issue: Issue;
  commentedBy: User;
  commentText: string;
}
