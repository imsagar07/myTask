import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
declare var google;
@IonicPage()
@Component({
  selector: 'page-prod-location',
  templateUrl: 'prod-location.html',
})
export class ProdLocationPage {
  locations: any = [
    {
      "name": "Manewada ring road",
      "lat": "21.100360",
      "long": "79.102680",
    },
    {
      "name": "Kharbi area side",
      "lat": "21.124720",
      "long": "79.137240",
    },
    {
      "name": "Sita Bardi",
      "lat": "21.144520",
      "long": "79.084610",
    },
    {
      "name": "Sadar Bazar Nagpur",
      "lat": "21.163130",
      "long": "79.079240",
    },
    {
      "name": "Mominpura nagpur",
      "lat": "21.100360",
      "long": "79.102680",
    },
    {
      "name": "Mahal nagpur",
      "lat": "21.141310",
      "long": "79.105480"
    },
    {
      "name": "Chatrapati square",
      "lat": "21.109550",
      "long": "79.071750"
    },
    {
      "name": "Ghatate Nagar Punapur Road, Nagpur",
      "lat": "21.149600",
      "long": "79.162020"
    }
  ]

  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private zone:NgZone,private view: ViewController) {
    // this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    // this.autocomplete = { input: '' };
    // this.autocompleteItems = [];
  }

  ionViewDidLoad() {
   alert('We can use google autocomplete api to add product location but due unavailabilty of google API_KEY im using static data with proper lat long for testing thanks')
  }

  itemSelected(item) {
    this.view.dismiss(item);
  }

  dismiss() {
    this.view.dismiss();
  }

  UpdateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

}
