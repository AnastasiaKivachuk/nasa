import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  myForm : FormGroup;
  constructor() {this.myForm = new FormGroup({

    "userName": new FormControl("Tom", Validators.required),
    "userEmail": new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    "userPhone": new FormControl("", Validators.pattern("[0-9]{10}"))
  });
  }

submit(){
  console.log(this.myForm);
}
}
