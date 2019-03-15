import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { PropertyServices } from '../services/property.service';

@Component({
  selector: 'app-property-buy',
  templateUrl: './property-buy.component.html',
  styleUrls: ['./property-buy.component.css']
})
export class PropertyBuyComponent implements OnInit {
  saleProperty:any=[];
  constructor(private propertyService:PropertyServices , private loaderService: LoaderService) { }

  ngOnInit() {
    this.getFeaturedSaleProperty();
  }

  getFeaturedSaleProperty(){
    this.loaderService.display(true);
    this.propertyService.getAllSaleProperties().subscribe(data=>{
      console.log(data);
      this.saleProperty=data;
    },error=>{
      console.log(error);
    },()=>{
      this.loaderService.display(false);
    });
  }

}
