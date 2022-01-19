import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './client/app/app.component';
import { NavbarComponent } from './staff/navbar/navbar.component';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
    ],
  },
  {path: 'system/login', component: NavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
