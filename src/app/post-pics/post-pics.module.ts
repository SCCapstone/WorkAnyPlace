import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostPicsPageRoutingModule } from './post-pics-routing.module';

import { PostPicsPage } from './post-pics.page';
import {UploaderComponent} from '../uploader/uploader.component';
import {UploadTaskComponent} from '../upload-task/upload-task.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPicsPageRoutingModule
  ],
  declarations: [PostPicsPage, UploaderComponent, UploadTaskComponent]
})
export class PostPicsPageModule {}
