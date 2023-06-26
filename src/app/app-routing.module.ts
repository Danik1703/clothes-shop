import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformHelper } from  '@natec/mef-dev-platform-connector';
import { HomePageComponent } from './home-page/home-page.component';
//const routes: Routes = [];
const  routes: Routes = PlatformHelper.updatePluginsRoutes([
path:"",
      children:[
          {
              path:"test",
              redirectTo:"test",
              pathMatch:"full",
          },
          {
              path:"test",
              component:  HomePageComponent
          }
      ]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
