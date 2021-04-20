import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'find-jobs',
        children: [
          {
          path: '',
          loadChildren: () => import('../jobs/jobs.module').then(m => m.JobsPageModule)
          }
        ]
        
      },
      {
        path: 'my-jobs',
        children: [
          {
          path: '',
          loadChildren: () => import('../my-jobs/my-jobs.module').then(m => m.MyJobsPageModule)
          }
        ]
      },
      {
        path: 'messages',
        children: [
          {
          path: '',
          loadChildren: () => import('../messages/messages.module').then(m => m.MessagesPageModule)
          }
        ]
      },
      {
        path: 'stats',
        children: [
          {
          path: '',
          loadChildren: () => import('../stats/stats.module').then(m => m.StatsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/find-jobs',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/find-jobs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
