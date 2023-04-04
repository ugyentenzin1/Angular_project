import { Injectable } from '@angular/core';
import {Dish} from "../shared /dish";
import {DISHES} from "../shared /dishes";
import {delay, map, Observable, of, catchError, switchMap, BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as http from "http";
import {get} from "http";
import {BaseUrl} from "../shared /baseUrl";
import {B} from "@angular/cdk/keycodes";
import {ProcessHTTPmsgService} from "./process-httpmsg.service";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  public orderNumber = new BehaviorSubject<Dish[]>([]);//it gives the initial value

  constructor(private http: HttpClient,
              private processHTTPmsgService: ProcessHTTPmsgService) { }

  getDishes(): Observable<Dish[]> {
    // return Promise.resolve(DISHES); without delay
    // return new Promise(resolve => {
    //   setTimeout(()=> resolve(DISHES), 2000)
    // })
    /*  return of(DISHES).pipe(delay(2000));*/
    return this.http.get<Dish[]>(BaseUrl + 'dishes').pipe(catchError(this.processHTTPmsgService.handleError));
  }
  //filter by id
  getDish(id: any) : Observable<Dish> {
    // return Promise.resolve(DISHES.filter((dish)=>( dish.id === id))[0]) //boolean filter with id
    /*return new Promise(resolve => {
      setTimeout(()=> {
       return  DISHES.filter((dish)=>( dish.id === id))[0]
      }, 2000)
    })*/
    /*   return of(DISHES.filter((dish)=>(dish.id === id))[0]).pipe(delay(2000));*/
    return this.http.get<Dish>(BaseUrl + 'dishes'+'/'+id).pipe(catchError(this.processHTTPmsgService.handleError));
  }

  getDishFeatured(): Observable<Dish> {
    /* return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);*/// boolean condition to filter
    /*  return new Promise(resolve => {
        return setTimeout(()=> resolve(DISHES.filter((dish) => dish.featured)), 2000)
      })*/
    /*    return of(DISHES.filter((dish)=> dish.featured)[0]).pipe(delay(2000));*/
    return this.http.get<Dish>(BaseUrl + 'dishes?featured=true').pipe(map(dishes => dishes[0])).pipe(catchError(this.processHTTPmsgService.handleError))
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id))).pipe(catchError(error => error));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }

    return this.http.put<Dish>(`${BaseUrl}dishes/${dish.id}`, dish, httpOptions).pipe(catchError(this.processHTTPmsgService.handleError));
  }

  updateAmount(id: string, value: Dish): Observable<Dish> {
    return this.http.put<Dish>(`${BaseUrl}dishes/${value.id}`, value).pipe(
      switchMap(() => this.http.get(`${BaseUrl}dishes`))
    );
  }
}
