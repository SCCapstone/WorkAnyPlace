import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobDetailPageRoutingModule } from './job-detail-routing.module';

import { JobDetailPage } from './job-detail.page';
import { SharedDirectivesModule } from '../directives/shared-directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobDetailPageRoutingModule, 
    SharedDirectivesModule
  ],
  declarations: [JobDetailPage]
})
export class JobDetailPageModule {}
