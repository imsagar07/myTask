import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdLocationPage } from './prod-location';

@NgModule({
  declarations: [
    ProdLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdLocationPage),
  ],
})
export class ProdLocationPageModule {}
