import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './client/app/app.component';
import { AppStaffComponent } from './staff/app-staff/app-staff.component';
import { DashboardComponent } from './staff/dashboard/dashboard.component';
import { ProductsComponent } from './staff/products/products.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: AppComponent},
    ],  
  },
  {
    path: 'system', component: AppStaffComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'products' , component: ProductsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
