import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightManuellComponent } from './weight-manuell.component';
import { MaterialModule } from 'src/app/material.modul';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WeightManuellComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WeightManuellComponent]
})
export class WeightManuellModule { }
