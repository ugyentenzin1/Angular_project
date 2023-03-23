import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from "@angular/forms";
import {Feedback, ContactType} from "../shared /feedback";
import * as Http from "http";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Dish} from "../shared /dish";
import {catchError, map, Observable} from "rxjs";
import {BaseUrl} from "../shared /baseUrl";
import {ProcessHTTPmsgService} from "../Services /process-httpmsg.service";
import {FeedbackService} from "../Services /feedback.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm!: FormGroup;
  feedback!: Feedback;
  contactType = ContactType;
  showContent = true;
  feedBackCopy: Feedback;

  //error message
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnumber': '',
    'email': ''
  }

  //validation message
  validationMessage = {
    'firstname': {
      'required': 'First name is required',
      'minlength': 'First name must be 2 character long',
      'maxlength': 'First name can not be more than 25 character',
    },
    'lastname': {
      'required': 'Last name is required',
      'minlength': 'Last name must be 2 character long',
      'maxlength': 'Last name can not be more than 25 character',
    },
    'telnumber': {
      'required': 'Tel. number is required',
      'pattern': 'Tel. number should contain only numbers'
    },

    'email': {
      'required': 'Email is required',
      'email': 'Email not in valid format'
    }
  }

  @ViewChild('fform') feedbackFormDirective: any;
  private errMess: string;
  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private processHTTPmsgService: ProcessHTTPmsgService,
              private feedBackService: FeedbackService
  ) { }

  ngOnInit(): void {
    this.creatForm();
  }

  creatForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],//validation
      email:  ['', [Validators.required, Validators.email]],
      telNumber: [0, [Validators.required, Validators.pattern]],
      agree: false,
      contactType: ['None', Validators.required],
      message: ''
    })
    this.feedbackForm.valueChanges.subscribe(data=> this.onValueChanged(data));
  }

//error message with two objects
  onValueChanged(data?: any) {
    if(!this.feedbackForm) { return ;}
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if(this.formErrors.hasOwnProperty(field)){
        //clear previous message
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.errors && control.invalid) {
          const messages = this.validationMessage[field];
          for(const key in control.errors) {
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += `${messages[key]}`;
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.feedbackForm.reset({
      firstname: '',
      lastname:'',
      email:'',
      telNumber: 0,
      agree: false,
      contactType: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
    this.showContent = false
    this.feedBackService.submitFeedBack(this.feedBackCopy).subscribe(feedback => {
      this.feedback = feedback; this.feedBackCopy = feedback;
    }, error => {this.feedback = null; this.feedBackCopy = null; this.errMess = <any>error})
  }
}
