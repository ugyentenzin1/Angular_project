import { Routes} from "@angular/router";
import { HomeComponent } from "../home/home.component";
import {MenuComponent} from "../menu/menu.component";
import {ContactComponent} from "../contact/contact.component";
import {AboutComponent} from "../about/about.component";
import {DishdetailComponent} from "../dishdetail/dishdetail.component";
import {OrderComponent} from "../order/order.component";

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'dishdetail/:id', component: DishdetailComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about', component: AboutComponent},
  {path: 'order', component: OrderComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
]
