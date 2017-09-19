import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
// AngularFire Imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
// Component Imports
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
// Service Imports
import { ItemService } from './services/item.service';
import { CategoryService } from './services/category.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';
import { SettingsService } from './services/settings.service';

const appRoutes: Routes = [
  {path:'', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'register', component:RegisterComponent, canActivate:[RegisterGuard]},
  {path:'login', component:LoginComponent},
  {path:'add-item', component:AddItemComponent, canActivate:[AuthGuard]},
  {path:'item/:id', component:ItemDetailsComponent, canActivate:[AuthGuard]},
  {path:'edit-item/:id', component:EditItemComponent, canActivate:[AuthGuard]},
  {path:'settings', component:SettingsComponent, canActivate:[AuthGuard]},
  {path:'**', component:PageNotFoundComponent}
];

export const firebaseConfig = {
  // apiKey: "AIzaSyBUgtGTUjRzxisD_ZRvNf3KkcOydUlrGws",
  // authDomain: "test-56315.firebaseapp.com",
  // databaseURL: "https://test-56315.firebaseio.com",
  // projectId: "test-56315",
  // storageBucket: "test-56315.appspot.com",
  // messagingSenderId: "872945957270"
  apiKey: "AIzaSyDEaLZhSmGqRkjPOSoiJW-Nwr_LEn6bzvA",
  authDomain: "catalog-f5fcd.firebaseapp.com",
  databaseURL: "https://catalog-f5fcd.firebaseio.com",
  projectId: "catalog-f5fcd",
  storageBucket: "catalog-f5fcd.appspot.com",
  messagingSenderId: "629172605247"
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ItemsComponent,
    ItemDetailsComponent,
    AddItemComponent,
    EditItemComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    FlashMessagesModule,
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    ItemService,
    CategoryService,
    AuthService,
    AuthGuard,
    RegisterGuard,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
