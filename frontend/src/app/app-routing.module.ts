import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './client/app/app.component';
import { AppStaffComponent } from './staff/app-staff/app-staff.component';
import { CategoriesComponent } from './staff/categories/categories.component';
import { DashboardComponent } from './staff/dashboard/dashboard.component';
import { ProductsComponent } from './staff/products/products.component';
import { ProductsComponent as ProdutsClient } from './client/products/products.component';
import { StaffAccountsComponent } from './staff/staff-accounts/staff-accounts.component';
import { UsersAccountsComponent } from './staff/users-accounts/users-accounts.component';
import { UsersOrdersComponent } from './staff/users-orders/users-orders.component';
import { SingleComponent } from './client/single/single.component';
import { ViewCartComponent } from './client/view-cart/view-cart.component';
import { OrdersCliComponent } from './client/orders-cli/orders-cli.component';
import { OrderDetailsComponent } from './client/order-details/order-details.component';

const routes: Routes = [
  {
    path: '',component: AppComponent,
    children: [
      {path: '', component: ProdutsClient},
      {path: 'product', children: [
        {path: ':id', component: SingleComponent}
      ]},
      {path: 'cart' , component: ViewCartComponent},
      {path: 'orders', component: OrdersCliComponent},
      {path: 'orderdetail', component: OrderDetailsComponent}   
      
    ],  
  },
  {
    path: 'system', component: AppStaffComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'products' , component: ProductsComponent},
      {path: 'categories' , component: CategoriesComponent},
      {path: 'usersorders' , component: UsersOrdersComponent},
      {path: 'usersaccounts' , component: UsersAccountsComponent},
      {path: 'staffaccounts' , component: StaffAccountsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
