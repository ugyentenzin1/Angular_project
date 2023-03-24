import {Component, Inject, OnInit} from '@angular/core';
import { Dish } from "../shared /dish";
import {DishService} from "../Services /dish.service";
import { flyInOut, expand } from '../animations /app.animation';
import {BaseUrl} from "../shared /baseUrl";

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

  constructor(private dishService: DishService) { }
  baseUrl = BaseUrl;
  dishes!: Dish[]; //or dishes: Dish[] method 2
  errMess: string;

  ngOnInit(): void {
    this.dishService.getDishes().subscribe((dish)=> this.dishes = dish, error => this.errMess = <any>error);//this.dishService.getDishes().then((dish)=>this.dishes =dish); method 2
  }

}
