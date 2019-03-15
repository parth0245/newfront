import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { PropertyServices } from '../services/property.service';

@Component({
  selector: 'app-property-rent',
  templateUrl: './property-rent.component.html',
  styleUrls: ['./property-rent.component.css']
})
export class PropertyRentComponent implements OnInit {
  rentProperty:any=[];
  constructor(private propertyService:PropertyServices , private loaderService: LoaderService) { }

  ngOnInit() {
    this.getFeaturedRentProperty();
  }


  getFeaturedRentProperty(){
    this.loaderService.display(true);
    this.propertyService.getAllRentProperties().subscribe(data=>{
      console.log(data);
      this.rentProperty=data;
    },error=>{
      console.log(error);
    },()=>{
      this.loaderService.display(false);
    });
  }

}
