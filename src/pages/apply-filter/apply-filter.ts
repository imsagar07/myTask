import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ApplyFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply-filter',
  templateUrl: 'apply-filter.html',
})
export class ApplyFilterPage {
  // price: number = 0;
  price: any = { lower: 0, upper: 1000 };
  kelometer: any = { lower: 0, upper: 50 }; 
  _pType:any;
  filterData: any = {
    rangeValue: [0, 1000],
    kmValue: [0, 50],
    type: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    let filterData = this.navParams.get('filter');
    if(filterData){
      this.price.lower = filterData.rangeValue[0];
      this.price.upper = filterData.rangeValue[1];
      this.kelometer.lower = filterData.kmValue[0];
      this.kelometer.upper = filterData.kmValue[1];
      this._pType = filterData.type;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyFilterPage');
  }

  dismiss() {
    this.view.dismiss();
  }

  clearFilter(){
    this.filterData = {
      rangeValue: [0, 1000],
      kmValue: [0, 50],
      type: ''
    }
    this.view.dismiss(this.filterData);
  }

  submit(){
    this.filterData.rangeValue[0] = this.price.lower;
    this.filterData.rangeValue[1] = this.price.upper;
    this.filterData.kmValue[0] = this.kelometer.lower;
    this.filterData.kmValue[1] = this.kelometer.upper;
    this.filterData.type = this._pType ? this._pType : '';
    this.view.dismiss(this.filterData);
  }

}
