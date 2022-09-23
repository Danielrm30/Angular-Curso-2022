import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path:'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    },
    {
      path: 'about',
      loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),
    },
    { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
    {
      path: '**',
      redirectTo: 'home'
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
