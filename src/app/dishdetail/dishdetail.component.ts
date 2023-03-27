import {Component, Inject, Input, OnInit} from '@angular/core';
import {Dish} from "../shared /dish";
import {DISHES} from "../shared /dishes";
import {Params, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {DishService} from "../Services /dish.service";
import {switchMap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {comments} from "../shared /comment";
import {error} from "@angular/compiler/src/util";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { visibility } from '../animations /app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    visibility()
  ]
})
export class DishdetailComponent implements OnInit {

  dish: Dish = DISHES[0];
  dishIds!: string;
  prev!: string;
  next!: string;
  comentsForm: FormGroup;
  errMess: string;
  dishCopy: Dish;
  visibility = 'shown';

  formCommentErrors = {
    author: '',
    comment:'',
  };

  validationCommentMessage = {
    author: {
      'required': 'Author is required',
      'minlength': 'There should be least two character'
    },
    comment: {
      'required': 'Comments is required',
      'minlength': 'There should be least five character'
    }
  }

  constructor( private dishService: DishService,
               private location: Location,
               private route: ActivatedRoute,
               private fb: FormBuilder,
               @Inject('baseUrl') public BaseUrl) { }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe((dishIds)=> this.dishIds = dishIds);
    this.route.params.pipe(
      switchMap((params)=> {
        this.visibility = 'hidden';
        return this.dishService.getDish(+params['id']);
      })).subscribe((Dish)=>{
        this.dish = Dish;
        this.dishCopy = Dish;
        this.setPrevNext(this.dish.id);
        this.visibility = 'shown'}, error => this.errMess = error)
    this.creatCommentForm();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  getBack(): void {
    this.location.back();
  }

  creatCommentForm() {
    this.comentsForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      comment: ['',[ Validators.required, Validators.minLength(5)]],
      rating: '',
      date: new Date()
    })
    this.comentsForm.valueChanges.subscribe(data=> this.onValueChanges(data))
  }

  onValueChanges(data?: any) {
    if(!this.comentsForm) { return ;}
    const form = this.comentsForm;
    for (const field in this.formCommentErrors) {
      console.log('formErrors',this.formCommentErrors)
      console.log(field)
      if(this.formCommentErrors.hasOwnProperty(field)){
        //clear previous message
        this.formCommentErrors[field] = '';
        const control = form.get(field);
        if(control && control.errors && control.invalid) {
          const messages = this.validationCommentMessage[field];
          for(const key in control.errors) {
            if(control.errors.hasOwnProperty(key)){
              this.formCommentErrors[field] += `${messages[key]}`;
              console.log(this.formCommentErrors[field])
            }
          }
        }
      }
    }
  }

  submit() {
    this.dishCopy?.comments.push(this.comentsForm.value);
    this.dishService.putDish(this.dishCopy).subscribe(dish => {
      this.dish = dish; this.dishCopy = dish;
    }, error => {this.dish = null; this.dishCopy = null; this.errMess = <any>error})
    this.comentsForm.reset({
      author: '',
      rating: 5,
      comment: '',
    })
  }
}
