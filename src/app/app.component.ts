import { Component } from '@angular/core';
import { AllServiceService } from './services/all-service.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoader: boolean;
  constructor(private service: AllServiceService , private loaderService:LoaderService){}


  ngOnInit() {
    this.service.autoAuthUser();
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }

}
