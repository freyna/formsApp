import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicPageComponent } from './Pages/basicPage/basic-page.component';
import { DynamicPageComponent } from './Pages/dynamicPage/dynamicPage.component';
import { SwitchesPageComponent } from './Pages/switchesPage/switchesPage.component';

const routes: Routes = 
[
  {
    path:'',
    children:
    [
      {
        path:'basic', component: BasicPageComponent
      },
      {
        path:'dynamic', component:DynamicPageComponent
      },
      {
        path:'switches', component:SwitchesPageComponent
      },
      {
        path:'**', redirectTo:'basic'
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveRoutingModule { }
