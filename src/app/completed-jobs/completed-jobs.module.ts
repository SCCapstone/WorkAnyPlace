import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedJobsPageRoutingModule } from './completed-jobs-routing.module';

import { CompletedJobsPage } from './completed-jobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletedJobsPageRoutingModule
  ],
  declarations: [CompletedJobsPage]
})
export class CompletedJobsPageModule {}
