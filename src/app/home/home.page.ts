import { DisciplinaService } from './../service/disciplina.service';
import { Disciplina } from './../model/disciplina';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public disciplinas: Disciplina[]=[];
  public totalCH: number;
  public cr: number;

  constructor(private disciplinaService: DisciplinaService) {}

  ngOnInit(){
    this.disciplinaService.atualizarDisciplinas();
    this.listarDisciplinas();
  }

  listarDisciplinas(){
    this.disciplinaService.disciplinas.
    subscribe(
      (result)=>{
        this.disciplinas = result;
        this.totalCH=this.disciplinas.reduce((total,d) => total + d.cargaHoraria, 0);
        const PCH: number=this.disciplinas.reduce((pch,d) => pch+ d.cargaHoraria * d.nota, 0);
        this.cr=PCH/this.totalCH;
      });
  }

}
