import {comments} from "./comment";

export class Dish {
  id?: string;
  amount?: any;
  name?: any;
  image?: string;
  category?: string;
  featured?: boolean;
  label?: string;
  price?: string;
  description?: string;
  icon?: string;
  comments? : comments[];
}
