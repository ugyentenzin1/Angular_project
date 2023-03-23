import { Injectable } from '@angular/core';
import {PROMOTIONS} from "../shared /promotions";
import {Promotion} from "../shared /promotion";
import {catchError, delay, map, Observable, of} from "rxjs";
import {Dish} from "../shared /dish";
import {BaseUrl} from "../shared /baseUrl";
import {HttpClient} from "@angular/common/http";
import {ProcessHTTPmsgService} from "./process-httpmsg.service";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
              private processHTTPmsgService: ProcessHTTPmsgService ) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(BaseUrl);
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(BaseUrl + 'promotions'+'/'+id).pipe(catchError(this.processHTTPmsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    /*return PROMOTIONS.filter((promotion) => promotion.featured)[0];*/

    /*return new Promise(resolve => {
      setTimeout(()=> resolve(PROMOTIONS.filter((promotion) => promotion.featured)), 2000)
    })*/
   /* return of(PROMOTIONS.filter((promo)=> promo.featured)).pipe(delay(2000));*/
    return this.http.get<Promotion[]>(BaseUrl + 'promotions?featured=true').pipe(map(promo => promo[0])).pipe(catchError(this.processHTTPmsgService.handleError))



  }
}
