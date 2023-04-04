import {Component, Inject, OnInit} from '@angular/core';
import { Dish } from "../shared /dish";
import {DishService} from "../Services /dish.service";
import { flyInOut, expand } from '../animations /app.animation';
import {BaseUrl} from "../shared /baseUrl";
import {BehaviorSubject, map, Observable, pipe, switchMap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as http from "http";
import {variable} from "@angular/compiler/src/output/output_ast";
import {MatDialog} from "@angular/material/dialog";
import {LocalStorageService} from "../Services /local-storage.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

  constructor(private dishService: DishService,
              private httpClient: HttpClient,
              private dialog: MatDialog,
              private localStorage: LocalStorageService) {
  }

  baseUrl = BaseUrl;
  dishes!: Dish[]; //or dishes: Dish[] method 2
  errMess: string;

  ngOnInit(): void {
     this.dishService.getDishes().subscribe((dish) => this.dishes = dish, error => this.errMess = <any>error);//this.dishService.getDishes().then((dish)=>this.dishes =dish); method 2
  }

  add(id: string) {
    // get the product based on the id
    let currentDish = this.dishes.find((val)=>{
      return val.id === id;
    });

    //update the amount
    let update = currentDish.amount;

    this.dishService.updateAmount(id, {
      ...currentDish, amount: update + 1
    }).subscribe(value => {
      this.dishes = value as Dish[]
    })
  }

  subtract(id: string) {
    let currentDish = this.dishes.find(
      (val)=> val.id === id
    )

    this.dishService.updateAmount(id, {
      ...currentDish, amount: currentDish.amount ? currentDish.amount - 1: currentDish.amount
    }).subscribe(value => {
      this.dishes = value as Dish[]
    })
  }

  addToCart(id: any) {
    let current = this.dishes.find(
      val => val.id === id
    )
    alert(`This is the ${current.amount} ordered of this ${current.name} dish`);

   let existingDish =  this.dishService.orderNumber.value.findIndex(val => val.id ===id);

   if(existingDish >= 0){
     this.dishService.orderNumber.value.splice(existingDish, 1, current)
   } else {
     this.dishService.orderNumber.value.push(current)
   }
   this.localStorage.set('orderNumber', this.dishService.orderNumber.value)
  }
}
