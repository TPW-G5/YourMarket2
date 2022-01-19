import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './client/footer/footer.component';
import { NavBarComponent } from './client/nav-bar/nav-bar.component';
import { SideBarComponent } from './client/side-bar/side-bar.component';
import { NavbarComponent } from './staff/navbar/navbar.component';
import { ContentComponent } from './client/content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavBarComponent,
    SideBarComponent,
    NavbarComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
