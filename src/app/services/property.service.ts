import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loader.service';


@Injectable()
export class PropertyServices {

    constructor(private http: HttpClient, private loaderService: LoaderService) { }

    getAllSaleProperties() {
        return this.http.get('http://172.16.3.250:3000/api/propertyRoutes/all-sale-post');
    }
    getAllRentProperties() {
        return this.http.get('http://172.16.3.250:3000/api/propertyRentRoutes/all-rent-post');
    }
    getAllPGProperties() {
        return this.http.get('http://172.16.3.250:3000/api/propertyPgRoutes/all-pg-post');
    }
    savePGProperty(data) {
        const postData = new FormData();
        postData.append("email", data.email);
        postData.append("mobile", data.mobile);
        postData.append("date", data.date.toString());
        postData.append("propertyCaption", data.propertyCaption);
        postData.append("parking", data.parking);
        postData.append("propertyFor", data.propertyFor);
        postData.append("propertyType", data.propertyType);
        postData.append("propertyLocation", data.propertyLocation);
        postData.append("societyName", data.societyName);
        postData.append("address", data.address);
        postData.append("propertyTotalFloors", data.propertyTotalFloors);
        postData.append("propertyYourFloor", data.propertyYourFloor);
        postData.append("pgAvailableFor", data.pgAvailableFor);
        postData.append("pgOccupancy", data.pgOccupancy);
        postData.append("pgAge", data.pgAge);
        postData.append("pgtenants", data.pgtenants);
        postData.append("propertyBathrooms", data.propertyBathrooms);
        postData.append("pgBalcony", data.pgBalcony);
        postData.append("pgCommonArea", data.pgCommonArea);
        postData.append("propertyPrice", data.propertyPrice);
        postData.append("propertyMainPrice", data.propertyMainPrice);
        postData.append("propertyElectricityPrice", data.propertyElectricityPrice);
        postData.append("laundryCharges", data.laundryCharges);
        postData.append("securityCharges", data.securityCharges);
        postData.append("noticePeriod", data.noticePeriod);
        postData.append("propertyDesc", data.propertyDesc);
        postData.append("propertyLandmark", data.propertyLandmark);        
        data.images.forEach(element => {
            postData.append("image", element.file, element.name);
        });
        data.propertyFurnishedStatus.forEach(element => {
            postData.append("propertyFurnishedStatus", element);
        });
        console.log(postData);
        return this.http.post('http://172.16.3.250:3000/api/propertyPgRoutes', postData);
    }
    saveProperty(data) {
        const postData = new FormData();
        postData.append("email", data.email);
        postData.append("mobile", data.mobile);
        postData.append("date", data.date.toString());
        postData.append("propertyCaption", data.propertyCaption);
        postData.append("parking", data.parking);
        postData.append("propertyFor", data.propertyFor);
        postData.append("propertyType", data.propertyType);
        postData.append("propertyLocation", data.propertyLocation);
        postData.append("societyName", data.societyName);
        postData.append("address", data.address);
        postData.append("propertyBedrooms", data.propertyBedrooms);
        postData.append("propertyBalconies", data.propertyBalconies);
        postData.append("propertyTotalFloors", data.propertyTotalFloors);
        postData.append("propertyYourFloor", data.propertyYourFloor);
        postData.append("propertyFurnishedStatus", data.propertyFurnishedStatus);
        postData.append("propertyBathrooms", data.propertyBathrooms);
        postData.append("propertyConstructionAllowed", data.propertyConstructionAllowed);
        postData.append("propertyOpenSides", data.propertyOpenSides);
        postData.append("propertyCoveredArea", data.propertyCoveredArea);
        postData.append("propertyCoveredAreaUnit", data.propertyCoveredAreaUnit);
        postData.append("propertyCarpetArea", data.propertyCarpetArea);
        postData.append("propertyCarpetAreaUnit", data.propertyCarpetAreaUnit);
        postData.append("availablility", data.availablility);
        postData.append("propertyStatus", data.propertyStatus);
        postData.append("ageOrAvailableFrom", data.ageOrAvailableFrom);
        postData.append("propertyPrice", data.propertyPrice);
        postData.append("propertyMainPrice", data.propertyMainPrice);
        postData.append("propertyOtherPrice", data.propertyOtherPrice);
        postData.append("dateAvailableFrom", data.dateAvailableFrom);
        postData.append("propertyDesc", data.propertyDesc);
        postData.append("propertyLandmark", data.propertyLandmark);
        data.images.forEach(element => {
            postData.append("image", element.file, element.name);
        });

        var link;
        if (data.propertyFor == 'sale') {
            link = 'propertyRoutes';
        }
        else {
            link = 'propertyRentRoutes';
        }

        return this.http.post('http://172.16.3.250:3000/api/' + link, postData);
    }


    getSalePropertyByUser(email) {
        var data = {email: email}
        return this.http.post('http://172.16.3.250:3000/api/propertyRoutes/SaleByUser', data);
    }

    getRentPropertyByUser(email) {
        var data = {email: email}
        return this.http.post('http://172.16.3.250:3000/api/propertyRentRoutes/RentByUser', data);
    }

    getPgPropertyByUser(email) {
        var data = {email: email}
        return this.http.post('http://172.16.3.250:3000/api/propertyPgRoutes/PgByUser', data);
    }

    getSalePropertyDetails(id,email) {
        var data = {id: id , email:email}
        return this.http.post('http://172.16.3.250:3000/api/propertyRoutes/getPropDetails', data);
    }

    contactOwner(id , data) {
        var contact = {
            propId:id,
            contactName:data.contactName,
            contactEmail:data.contactEmail,
            contactMobile:data.contactMobile
        }
        return this.http.post('http://172.16.3.250:3000/api/propertyRoutes/addContactToOwnerProperty', contact);
    }

}
