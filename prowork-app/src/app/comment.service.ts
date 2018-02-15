import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs/Observable";
import {Comment} from "./model/comment";

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getAllCommentsByIssueId(issueId: number): Observable<Comment[]> {
    const token = localStorage.getItem('Bearer');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const restApiUrl = environment.restApiUrl + environment.commentController.url +
      environment.commentController.allByIssueId + '?issueId=' + issueId;
    return this.http.get<Comment[]>(restApiUrl, {headers: headers});
  }

  addComment(formData: FormData): Observable<Comment> {
    const token = localStorage.getItem('Bearer');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const restApiUrl = environment.restApiUrl + environment.commentController.url +
      environment.commentController.addComment;
    return this.http.post<Comment>(restApiUrl, formData, {headers: headers});
  }

  deleteComment(formData: FormData): Observable<Number> {
    const token = localStorage.getItem('Bearer');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const restApiUrl = environment.restApiUrl + environment.commentController.url +
      environment.commentController.deleteComment;
    return this.http.post<Number>(restApiUrl, formData, {headers: headers});
  }
}
