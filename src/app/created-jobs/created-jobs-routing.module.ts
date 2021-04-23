import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatedJobsPage } from './created-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: CreatedJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatedJobsPageRoutingModule {}
