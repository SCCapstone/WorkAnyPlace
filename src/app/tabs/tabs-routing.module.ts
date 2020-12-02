import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
          path: '',
          loadChildren: () => import('../jobs/jobs.module').then(m => m.JobsPageModule)
          }
        ]
        
      },
      {
        path: 'tab2',
        children: [
          {
          path: '',
          loadChildren: () => import('../my-jobs/my-jobs.module').then(m => m.MyJobsPageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
          path: '',
          loadChildren: () => import('../messages/messages.module').then(m => m.MessagesPageModule)
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
          path: '',
          loadChildren: () => import('../stats/stats.module').then(m => m.StatsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
