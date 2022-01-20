import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppComponent as AppClient } from './client/app/app.component';
import { FooterComponent } from './client/footer/footer.component';
import { SideBarComponent } from './client/side-bar/side-bar.component';
import { NavBarComponent } from './client/nav-bar/nav-bar.component';
import { NavbarComponent } from './staff/navbar/navbar.component';
import { ContentComponent } from './client/content/content.component';
import { AppStaffComponent } from './staff/app-staff/app-staff.component';
import { StaffSideComponent } from './staff/staff-side/staff-side.component';
import { DashboardComponent } from './staff/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SideBarComponent,
    NavbarComponent,
    ContentComponent,
    AppClient,
    NavBarComponent,
    AppStaffComponent,
    StaffSideComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
