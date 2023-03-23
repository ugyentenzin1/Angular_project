import {Component, Inject, OnInit} from '@angular/core';
import {DishService} from "../Services /dish.service";
import {PromotionService} from "../Services /promotion.service";
import {Dish} from "../shared /dish";
import {Promotion} from "../shared /promotion";
import {leader} from "../shared /leader";
import {LeadersService} from "../Services /leaders.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish!: Dish;
  promotion!: Promotion;
  leader!: leader;
  dishErrorMessage: string;
  promoErrorMessage: string;
  leaderErrorMessage: string;

  constructor(private dishService: DishService,
              private promotionService: PromotionService,
              private leaderService: LeadersService,
              @Inject('baseUrl') public BaseUrl) { }

  ngOnInit(): void {
   this.dishService.getDishFeatured().subscribe((dish)=> this.dish = dish,error=> this.dishErrorMessage = error)
   this.promotionService.getFeaturedPromotion().subscribe((promo)=> this.promotion = promo, error => this.promoErrorMessage = error);
    this.leaderService.getFeaturedLeader().subscribe((lead)=>this.leader = lead,e=> this.leaderErrorMessage = e);
  }
}
