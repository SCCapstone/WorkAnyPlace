import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePicUpdatePage } from './profile-pic-update.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePicUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePicUpdatePageRoutingModule {}
