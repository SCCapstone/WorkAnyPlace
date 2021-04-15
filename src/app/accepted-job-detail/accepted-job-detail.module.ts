import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptedJobDetailPageRoutingModule } from './accepted-job-detail-routing.module';

import { AcceptedJobDetailPage } from './accepted-job-detail.page';
import { SharedDirectivesModule } from '../directives/shared-directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceptedJobDetailPageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [AcceptedJobDetailPage]
})
export class AcceptedJobDetailPageModule {}
