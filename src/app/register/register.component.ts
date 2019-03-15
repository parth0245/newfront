import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { AllServiceService } from '../services/all-service.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { MessageModalComponent } from '../modals/message-modal/message-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  mobile: string;
  password: string;
  errMessage: string;
  constructor(public service: AllServiceService, private loaderService: LoaderService, private router: Router, private dialogService: DialogService) { }

  ngOnInit() {

  }
  
  register(form) {
    this.loaderService.display(true);
    this.service.registerUser(this.email, this.name, this.mobile, this.password).subscribe(data => {
      this.loaderService.display(false);
      this.showPopup('Registration Successfull', 'Please login and continue');
    }, (err) => {
      const email = err.error.error.errors.email;
      const mobile = err.error.error.errors.mobile;

      if (email) {
        this.errMessage = "Already registered with this email";
      }
      if (mobile) {
        this.errMessage = "Already registered with this mobile";
      }
      if (email && mobile) {
        this.errMessage = "Already registered with this email & mobile";
      }
      this.loaderService.display(false);
      this.showPopup('Registration Failed', this.errMessage);
    });
  }

  showPopup(title, message) {
    let disposable = this.dialogService.addDialog(MessageModalComponent, { title: title, message: message })
      .subscribe((isConfirmed) => { });
  }

}
