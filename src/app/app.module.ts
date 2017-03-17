import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { MeisterDtOService } from './meister-dt-o.service';
import { MeisterDtOResolverService } from './meister-dt-oresolver.service';

const appRoutes: Routes = [
  { path: 'dashboard', component: NavComponent, resolve: { meisters: MeisterDtOResolverService } },
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DropdownComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MeisterDtOService, MeisterDtOResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
