import { Injectable } from '@angular/core';
import {leader} from "../shared /leader";
import {LEADERS} from "../shared /leaders";
import {DISHES} from "../shared /dishes";
import {catchError, delay, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProcessHTTPmsgService} from "./process-httpmsg.service";
import {BaseUrl} from "../shared /baseUrl";

@Injectable({
  providedIn: 'root'
})
export class LeadersService {

  constructor(private http: HttpClient,
              private processHttpMsgService: ProcessHTTPmsgService) { }

  getLeader(): Observable<leader[]>{
    /*return new Promise(resolve => {
      setTimeout(()=> resolve(LEADERS),2000)
    })*/
  return this.http.get<leader[]>(BaseUrl + 'leadership')
  }

  getFeaturedLeader(): Observable<leader>{
    /*return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);*/
   /* return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)), 2000)
    })*/
  /*  return of(LEADERS.filter((leader)=> leader.featured)).pipe(delay(2000));*/
    return this.http.get<leader>(BaseUrl + 'promotions?featured=true').pipe(map(leader => leader[0])).pipe(catchError(this.processHttpMsgService.handleError))
  }
}
