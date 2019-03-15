import { Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { AllServiceService } from '../services/all-service.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { promise } from 'protractor';
import { resolve } from 'dns';
import { reject } from 'q';

@Component({
  selector: 'app-submit-property',
  templateUrl: './submit-property.component.html',
  styleUrls: ['./submit-property.component.css']
})
export class SubmitPropertyComponent implements OnInit {

  owner: boolean = false;
  agent: boolean = false;
  builder: boolean = false;
  userData:any={};
  constructor(private service: AllServiceService, private router: Router, private loaderService: LoaderService) {
  }

  ngOnInit() {
    if (!this.service.getAuthStatus()) {
      this.router.navigate(['/login']);
    }
  }

  // getUserDetails() {
  //   setTimeout(() => {
  //     this.loaderService.display(true);  
  //   }, 200);   
  //   setTimeout(() => {
  //     this.service.getUserData().subscribe(
  //       (data) => {
  //         this.loaderService.display(false);
  //         this.userData = data["user"];
  //       },
  //       (error) => {
  //         this.router.navigate(['/login']);
  //         this.loaderService.display(false);
  //       }
  //     );
  //   }, 1000);
  // }

  setIam(user) {
    if (user == 'owner') {
      this.owner = true;
      this.agent = false;
      this.builder = false;
    }
    else if (user == 'agent') {
      this.owner = false;
      this.agent = true;
      this.builder = false;
    }
    else {//builder
      this.owner = false;
      this.agent = false;
      this.builder = true;
    }
  }

}
