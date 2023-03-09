import { Component } from '@angular/core';
import { ModalController, NavController, Platform } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';
import { Storage } from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { ApplyFilterPage } from '../apply-filter/apply-filter';
import { LoadingController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isProduct: boolean = false;
  productList: any = [];
  _showproductList: any = [];
  currentLat: any;
  currentLong: any;
  filterData: any = {
    rangeValue: [0, 1000],
    kmValue: [0, 50],
    type: ''
  }
  constructor(public navCtrl: NavController, public storage: Storage,
    private geolocation: Geolocation, private modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private platform: Platform, private diagnostic: Diagnostic) {
  }

  ionViewDidLoad() {
    alert("Please turn on location to access the app.");
  }

  openFilter() {
    const myModal = this.modalCtrl.create(ApplyFilterPage,{filter:this.filterData});
    myModal.present();
    myModal.onDidDismiss((data) => {
      if (data) {
        this.filterData = data;
        this.getGPsData();
      }
    });
  }

  getGPsData() {
    this.checkGpsEnabled().then((data: any) => {
      if (data == false || data == undefined) {
        alert('Please turn on google location to continue');
        this.platform.exitApp();
      }
    },
      error => {
        // alert('Please turn on google location to continue');
        // this.platform.exitApp();
      }
    );
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLat = resp.coords.latitude
      this.currentLong = resp.coords.longitude
      if (this.currentLat && this.currentLong) {
        this.getProducts();
      }
      else {
        // alert('Please turn on google location to continue');
        // this.platform.exitApp();
      }
    }).catch((error) => {
      // alert('Please turn on google location to continue');
      // this.platform.exitApp();
    });

  }

  availb() {
    this.diagnostic.getLocationAuthorizationStatus().then((status) => {
    }).
      catch((error) => {
        console.log(error);
      })
  }


  checkGpsEnabled() {
    let successCallback = (isAvailable) => {
      this.availb();
      return isAvailable;
    };
    let errorCallback = (e) => {
      console.error(e);
      return e;
    };
    return this.diagnostic.isGpsLocationEnabled().then(successCallback).catch(errorCallback);
  }

  addProductPage() {
    this.navCtrl.push(AddProductPage)
  }

  ionViewDidEnter() {
    this.presentLoading(); 
    this.getGPsData();
  }

  getProducts() {
    this.storage.get('productItem').then((productList) => {
      if (productList) {
        this.productList = JSON.parse(productList);
        if (this.productList.length) {
          this.isProduct = true;
          if(this.currentLat && this.currentLong){
            for (let i = 0; i < this.productList.length; i++) {
              var dist = this.calculateDistance(this.currentLat, this.currentLong, this.productList[i].lat, this.productList[i].long);
              this.productList[i]['distance'] = dist.toFixed(2);
            }
            this._showproductList = this.productList;
            this.applyFilter();
          }
          else{
            alert('Please turn on google location to continue');
            this.platform.exitApp();
          }
        }
      }
    })
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  applyFilter() {
    this._showproductList = this.productList;
    if (this.filterData.rangeValue.length) {
      this._showproductList = this.productList.filter((item) => {
        return (
          item._price >= this.filterData.rangeValue[0] &&
          item._price <= this.filterData.rangeValue[1]
        );
      });
    }
    if (this.filterData.kmValue.length) {
      this._showproductList = this._showproductList.filter((item) => {
        return (
          item.distance >= this.filterData.kmValue[0] &&
          item.distance <= this.filterData.kmValue[1]
        );
      });
    }
    if (this.filterData.type != '') {
      this._showproductList = this._showproductList.filter((item) => {
        return (
          item._pType == this.filterData.type 
        );
      });
    }

    if (this._showproductList.length == 0) {
      this.isProduct = false;
    }
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }



}
