import {Component, Inject, OnInit} from '@angular/core';
import { Dish } from "../shared /dish";
import {DishService} from "../Services /dish.service";
import { flyInOut, expand } from '../animations /app.animation';
import {BaseUrl} from "../shared /baseUrl";
import {map, Observable, pipe, switchMap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as http from "http";
import {variable} from "@angular/compiler/src/output/output_ast";
import {MatDialog} from "@angular/material/dialog";

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
              private dialog: MatDialog) {
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
    console.log(currentDish);

    //update the amount
    let update = currentDish.amount;

    console.log(update)
    this.updateAmount(id, {
      ...currentDish, amount: update + 1
    });
  }

  subtract(id: string) {
    let currentDish = this.dishes.find(
      (val)=> val.id === id
    )

    this.updateAmount(id, {
      ...currentDish, amount: currentDish.amount ? currentDish.amount - 1: currentDish.amount
    })
  }

  updateAmount(id: string, value: Dish) {
    this.httpClient.put<Dish>('http://localhost:3000/dishes/'+ id ,value).pipe(
      switchMap(() => this.httpClient.get('http://localhost:3000/dishes'))
    ).subscribe((u) => {
      this.dishes = u as Dish[];
      console.log(u)
    })
  }

  addToCart(id: string) {
    let current = this.dishes.find(
      val => val.id === id
    )
    alert(`This is the ${current.amount} ordered of this ${current.name} dish`);
  }
}
