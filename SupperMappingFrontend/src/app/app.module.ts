import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SupperMappingComponent } from './supper-mapping/supper-mapping.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.modul';
import { SendSupperMappingService } from './common/send-supper-mapping.service';
import { OverviewComponent } from './overview/overview.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CreateHarvestComponent } from './create-harvest/create-harvest.component';
import { SchleuderungDataService } from './common/schleuderung-data.service';
import { SendComponent } from './send/send.component';
import { HttpClientModule } from '@angular/common/http';



const appRoutes: Routes = [
   { path: 'enter', component: SupperMappingComponent },
   { path: 'overview', component: OverviewComponent },
   { path: 'create-harvest', component: CreateHarvestComponent },
   { path: 'send', component: SendComponent },
   { path: '', component: HomeComponent },
   {
      path: '',
      redirectTo: '/',
      pathMatch: 'full'
   },
   {
      path: '**',
      redirectTo: '/',
   }
];

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      SupperMappingComponent,
      OverviewComponent,
      CreateHarvestComponent,
      SendComponent
   ],
   imports: [
      RouterModule.forRoot(appRoutes,
      ),
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      HttpClientModule,
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

   ],
   providers: [
      SendSupperMappingService,
      SchleuderungDataService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
