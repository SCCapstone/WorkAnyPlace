import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedJobsPage } from './completed-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: CompletedJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedJobsPageRoutingModule {}
