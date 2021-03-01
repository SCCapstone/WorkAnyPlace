import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatedJobsPageRoutingModule } from './created-jobs-routing.module';

import { CreatedJobsPage } from './created-jobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatedJobsPageRoutingModule
  ],
  declarations: [CreatedJobsPage]
})
export class CreatedJobsPageModule {}
