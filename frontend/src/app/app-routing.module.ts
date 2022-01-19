import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './client/content/content.component';
import { NavbarComponent } from './staff/navbar/navbar.component';

const routes: Routes = [
  {path: '', component: ContentComponent},
  {path: 'system/login', component: NavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
