import { DisciplinaService } from './../service/disciplina.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DisciplinaPageRoutingModule } from './disciplina-routing.module';
import { DisciplinaPage } from './disciplina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisciplinaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DisciplinaPage]
})
export class DisciplinaPageModule {}
