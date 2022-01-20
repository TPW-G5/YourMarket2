import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppComponent as AppClient } from './client/app/app.component';
import { FooterComponent } from './client/footer/footer.component';
import { SideBarComponent } from './client/side-bar/side-bar.component';
import { ProductsComponent as ProductsClient } from './client/products/products.component';
import { NavBarComponent } from './client/nav-bar/nav-bar.component';
import { NavbarComponent } from './staff/navbar/navbar.component';
import { AppStaffComponent } from './staff/app-staff/app-staff.component';
import { StaffSideComponent } from './staff/staff-side/staff-side.component';
import { DashboardComponent } from './staff/dashboard/dashboard.component';
import { ProductsComponent } from './staff/products/products.component';
import { CategoriesComponent } from './staff/categories/categories.component';
import { UsersOrdersComponent } from './staff/users-orders/users-orders.component';
import { UsersAccountsComponent } from './staff/users-accounts/users-accounts.component';
import { StaffAccountsComponent } from './staff/staff-accounts/staff-accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SideBarComponent,
    NavbarComponent,
    AppClient,
    NavBarComponent,
    AppStaffComponent,
    StaffSideComponent,
    DashboardComponent,
    ProductsComponent,
    CategoriesComponent,
    UsersOrdersComponent,
    UsersAccountsComponent,
    StaffAccountsComponent,
    ProductsClient
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
