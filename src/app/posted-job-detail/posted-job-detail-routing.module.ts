import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostedJobDetailPage } from './posted-job-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PostedJobDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostedJobDetailPageRoutingModule {}
