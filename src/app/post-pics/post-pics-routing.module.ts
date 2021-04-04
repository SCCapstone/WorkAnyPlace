import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostPicsPage } from './post-pics.page';

const routes: Routes = [
  {
    path: '',
    component: PostPicsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostPicsPageRoutingModule {}
