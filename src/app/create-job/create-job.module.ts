import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateJobPageRoutingModule } from './create-job-routing.module';

import { CreateJobPage } from './create-job.page';
import {UploaderComponent} from '../uploader/uploader.component';
import {UploadTaskComponent} from '../upload-task/upload-task.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateJobPageRoutingModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CreateJobPage, UploaderComponent, UploadTaskComponent]
})
export class CreateJobPageModule {}
