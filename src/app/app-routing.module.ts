import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'disciplina',
    loadChildren: () => import('./disciplina/disciplina.module').then( m => m.DisciplinaPageModule)
  },
  {
    path: 'disciplina/:codigo',
    loadChildren: () => import('./disciplina/disciplina.module').then( m => m.DisciplinaPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
