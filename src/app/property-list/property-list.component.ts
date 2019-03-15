import { Component, OnInit } from '@angular/core';
import { PropertyServices } from '../services/property.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  saleProperty:any=[];
  rentProperty:any=[];
  PGProperty:any=[];
  constructor(private propertyService:PropertyServices , private router :Router,private loaderService:LoaderService) { }

  ngOnInit() {
    this.getFeaturedSaleProperty();
    this.getFeaturedRentProperty();
    this.getFeaturedPGProperty();
  }
  goToSalePropertyDetails(id){
    this.loaderService.display(true);
    var obj = {
      id:id
    }
    this.router.navigate(['/dashboard/sale-property-details'],{ queryParams: obj , skipLocationChange: true })
  }
  getFeaturedSaleProperty(){
    this.propertyService.getAllSaleProperties().subscribe(data=>{
      console.log(data);
      this.saleProperty=data;
    },error=>{
      console.log(error);
    });
  }

  getFeaturedRentProperty(){
    this.propertyService.getAllRentProperties().subscribe(data=>{
      console.log(data);
      this.rentProperty=data;
    },error=>{
      console.log(error);
    });
  }

  getFeaturedPGProperty(){
    this.propertyService.getAllPGProperties().subscribe(data=>{
      console.log(data);
      this.PGProperty=data;
    },error=>{
      console.log(error);
    });
  }

}
