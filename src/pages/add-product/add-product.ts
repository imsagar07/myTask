import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActionSheetController, IonicPage, ModalController, NavController, NavParams, Select } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProdLocationPage } from '../prod-location/prod-location';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  @ViewChild('mySelect') SelectRef: Select;
  slectCode: any;
  model: any;
  productForm: FormGroup;
  productList:any[] = [];
  _address:any = '';
  _productTypeList = [{ id: 1, name: 'Mobile' }, { id: 2, name: 'Display' }, { id: 3, name: 'Laptop' }]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage,private camera: Camera,private modalCtrl:ModalController) {
    this.slectCode = { title: 'Select Type' };
    this.model = {
      _pname: '',
      _price: '',
      _pType: '',
      _pdescription: '',
      _pimage: 'assets/imgs/product.png',
      lat: '',
      long: ''
    };

    this.productForm = new FormGroup({
      '_pname': new FormControl('', [Validators.required]),
      '_price': new FormControl('', [Validators.required]),
      '_pType': new FormControl('', [Validators.required]),
      '_pdescription': new FormControl('', [Validators.required]),
    })

    
  }

  openTypeSelct() {
    this.SelectRef.open();
  }

  ionViewDidLoad() {
    this.storage.get('productItem').then((productList) => {
      if(productList){
        this.productList = JSON.parse(productList);
        console.log(this.productList)
      }
    })
  }

  onTypeSelet(ev) {
    console.log(ev)
  }

  async submit(){
    if(this.validate()){
      await this.productList.push(this.model);
      this.storage.set('productItem',JSON.stringify(this.productList));
      this.navCtrl.pop();
    }
  }

  validate(){
    if(this.model._pname == ''){
      alert('Please add product name');
      return false;
    }
    if(this.model._price == ''){
      alert('Please add product price');
      return false;
    }
    if(this.model._pdescription == ''){
      alert('Please add product description');
      return false;
    }
    if(this.model._pType == ''){
      alert('Please select type');
      return false;
    }
    if(this.model._address == ''){
      alert('Please select product location');
      return false;
    }
    return true;
  }

  uploadImage(){
    let obj =this;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      // mediaType: this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.CAMERA
    }
    this.camera.getPicture(options).then((imageData) => {
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     obj.model._pimage = base64Image;
    }, (err) => { 
    });
  }

  selectLocationPage(){
    const myModal = this.modalCtrl.create(ProdLocationPage);
    myModal.present();
    myModal.onDidDismiss((data) => {
      if(data){
        this._address = data.name;
        this.model.lat = data.lat;
        this.model.long = data.long;
      }
    });
  }

}
