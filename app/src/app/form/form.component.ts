import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  myForm : FormGroup;
  constructor(
    public service: ServiceService
  ) {this.myForm = new FormGroup({

    "dateStart": new FormControl("", Validators.required),
    "dateEnd": new FormControl("", Validators.required),
  });
  }


submit(){
  this.service.takeDates(this.myForm.value);
  this.service.openTable();
}
}
