import { Component, OnInit } from '@angular/core';
import { PropertyServices } from '../services/property.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-property-pg',
  templateUrl: './property-pg.component.html',
  styleUrls: ['./property-pg.component.css']
})
export class PropertyPgComponent implements OnInit {
  PGProperty:any=[];
  constructor(private propertyService:PropertyServices , private loaderService: LoaderService) { }

  ngOnInit() {
    this.getFeaturedPGProperty();
  }

  getFeaturedPGProperty(){
    this.loaderService.display(true);
    this.propertyService.getAllPGProperties().subscribe(data=>{
      this.PGProperty=data;
    },error=>{
      console.log(error);
    },()=>{
      this.loaderService.display(false);
    });
  }

}
