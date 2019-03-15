import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyServices } from '../services/property.service';
import { LoaderService } from '../services/loader.service';
import { AllServiceService } from '../services/all-service.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { ContactOwnerComponent } from '../modals/contact-owner/contact-owner.component';

@Component({
  selector: 'app-sale-property-details',
  templateUrl: './sale-property-details.component.html',
  styleUrls: ['./sale-property-details.component.css']
})
export class SalePropertyDetailsComponent implements OnInit {
  propertyId: string;
  propertyDetails: any;
  ownerName: string;
  username: string;
  email: string;
  mobile: string;
  constructor(private dialogService: DialogService, private service: AllServiceService, private router: Router, private activatedRoute: ActivatedRoute, private propertyService: PropertyServices, private loaderService: LoaderService) { }

  ngOnInit() {

    this.getLoggedInuserDetails();
    this.activatedRoute.queryParams.subscribe(params => {
      this.propertyId = params["id"];
      if (this.propertyId == undefined) {
        this.router.navigate(['/dashboard/no-data-found']);
        this.loaderService.display(false);
      } else {
        setTimeout(() => {
          this.propertyService.getSalePropertyDetails(this.propertyId,this.email).subscribe(data => {
            console.log(data);
            this.propertyDetails = data;
            this.propertyDetails = data;
            this.findNameByEmail(this.propertyDetails[0].email);
          }, error => {
            console.log(error);
          }, () => {
            this.loaderService.display(false);
          });
        }, 1500);
      
      }
    });
  }

  findNameByEmail(id) {
    this.service.getUserNameByID(id).subscribe(data => {
      console.log(data);
      this.ownerName = data["user"].name;
    }, error => {
      console.log(error);
    }, () => {

    });
  }

  getLoggedInuserDetails() {
    this.service.getUserData().subscribe(
      data => {
        console.log(data);
        var userData = data["user"];
        this.username = userData.name;
        this.email = userData.email;
        this.mobile = userData.mobile;
      },
      error => {
        console.log(error);
      },
      () => { }
    );
  }

  contactWithOwner() {
    if (this.email) {
      let disposable = this.dialogService.addDialog(ContactOwnerComponent, {
        title: 'Contact Owner',
        email: this.email,
        mobile: this.mobile
      }).subscribe((isConfirmed) => {
        if (isConfirmed) {
          var data = {
            contactName:this.username,
            contactEmail:this.email,
            contactMobile:this.mobile
          };
          this.propertyService.contactOwner(this.propertyId,data).subscribe(
            data => {
              //send message to user
              console.log('user Contacted',data);
            },
            error => {
              console.log('user Contacted',error);
            },
            () => {

            });
        }
      });
    } else {
      let disposable = this.dialogService.addDialog(LoginModalComponent, {
        title: 'Login',
      }).subscribe((isConfirmed) => {
      });
    }
  }
}
