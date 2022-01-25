import { AuthInterceptor } from './auth-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { SingleComponent } from './client/single/single.component';
import { ViewCartComponent } from './client/view-cart/view-cart.component';
import { FormsModule } from '@angular/forms';
import { OrdersCliComponent } from './client/orders-cli/orders-cli.component';
import { OrderDetailsComponent } from './client/order-details/order-details.component';
import { NewCategoryComponent } from './staff/new-category/new-category.component';
import { NewProductComponent } from './staff/new-product/new-product.component';
import { ProductComponent } from './components/client/product/product.component';
import { AddProductComponent } from './components/client/addproduct/addproduct.component';
import { IndexComponent } from './client/index/index.component';
import { ShowProductComponent } from './staff/show-product/show-product.component';
import { NewStaffComponent } from './staff/new-staff/new-staff.component';

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
    ProductsClient,
    SingleComponent,
    ViewCartComponent,
    OrdersCliComponent,
    OrderDetailsComponent,
    NewCategoryComponent,
    NewProductComponent,
    ProductComponent,
    AddProductComponent,
    IndexComponent,
    ShowProductComponent,
    NewStaffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
