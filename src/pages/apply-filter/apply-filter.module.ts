import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyFilterPage } from './apply-filter';

@NgModule({
  declarations: [
    ApplyFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyFilterPage),
  ],
})
export class ApplyFilterPageModule {}
