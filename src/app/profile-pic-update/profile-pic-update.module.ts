import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePicUpdatePageRoutingModule } from './profile-pic-update-routing.module';

import { ProfilePicUpdatePage } from './profile-pic-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePicUpdatePageRoutingModule
  ],
  declarations: [ProfilePicUpdatePage]
})
export class ProfilePicUpdatePageModule {}
