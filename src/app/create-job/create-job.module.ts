import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateJobPageRoutingModule } from './create-job-routing.module';

import { CreateJobPage } from './create-job.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateJobPageRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CreateJobPage]
})
export class CreateJobPageModule {}
