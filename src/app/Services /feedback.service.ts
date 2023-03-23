import { Injectable } from '@angular/core';
import {Feedback} from "../shared /feedback";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseUrl} from "../shared /baseUrl";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  submitFeedBack(feedBackCopy: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    return this.http.post<Feedback>(BaseUrl + 'feedback', feedBackCopy, httpOptions);
  }
}
