import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostedJobDetailPageRoutingModule } from './posted-job-detail-routing.module';

import { PostedJobDetailPage } from './posted-job-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostedJobDetailPageRoutingModule
  ],
  declarations: [PostedJobDetailPage]
})
export class PostedJobDetailPageModule {}
