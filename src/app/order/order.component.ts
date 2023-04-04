import { Component, OnInit } from '@angular/core';
import {Dish} from "../shared /dish";
import {DishService} from "../Services /dish.service";
import {BehaviorSubject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfimationComponent} from "../confimation/confimation.component";
import {LocalStorageService} from "../Services /local-storage.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  head =['Dish Id','Image','Dish Name', 'No of Order', 'Action'];
  orderedNum: Dish[];

  constructor(private dishService: DishService,
              private dialog: MatDialog,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.dishService.orderNumber.subscribe(value => this.orderedNum = value);
    const order = this.localStorage.get('orderNumber');
    if(order) {
      this.dishService.orderNumber.next(order);
    }
  }

  delete() {
    this.dialog.open( ConfimationComponent, {
      width: '600px',
    })
  }
}
