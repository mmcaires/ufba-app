import { DisciplinaService } from './../service/disciplina.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Disciplina } from '../model/disciplina';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { __await } from 'tslib';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.page.html',
  styleUrls: ['./disciplina.page.scss'],
})
export class DisciplinaPage implements OnInit {

  disciplina: Disciplina;
  codigo: string;
  rangeNota=0;
  rangeCh=0;

  form = new FormGroup({
    id: new FormControl(''),
    codigo: new FormControl('',Validators.required),
    nome: new FormControl('',Validators.required),
    professor: new FormControl('',Validators.required),
    cargaHoraria: new FormControl('',Validators.required),
    nota: new FormControl('',Validators.required)
  });

  constructor(
    public modalController: ModalController,
    private disciplinaService: DisciplinaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public toastCtrl: ToastController) {}

  async msgSucesso(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      color: 'primary'
    });
    toast.present();
  }
  async msgErro(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      color: 'danger'
    });
    toast.present();
  }

  ngOnInit() {
    this.codigo= this.activatedRoute.snapshot.paramMap.get('codigo');
    if(this.codigo){
      this.disciplinaService.getDisciplinaPorCodigo(this.codigo).
      subscribe(
        (result)=>{
          this.disciplina=result[0];
          //this.rangeNota=this.disciplina.nota*10;
          //this.rangeCh=this.disciplina.cargaHoraria;
          this.form.setValue(this.disciplina);
        }
      );
    }
  }

  salvar(){
    if(this.form.valid){
      if(this.disciplina){
        this.disciplinaService.alterarDisciplina(this.form.value).
        subscribe(
          (result)=>{
            this.msgSucesso('Disciplina alterada com sucesso!');
            this.disciplinaService.atualizarDisciplinas();
            this.router.navigate(['home']);
          }
        );
      }else{
        const codigo=this.form.get('codigo').value;
        this.disciplinaService.getDisciplinaPorCodigo(codigo).
        subscribe(
          (result)=>{
            if(result[0]){
              this.msgErro('Disciplina já cadastrada!');
            }else{
              this.disciplinaService.cadastrarDisciplina(this.form.value).
              subscribe(
                (result2)=>{
                  this.msgSucesso('Disciplina cadastrada com sucesso!');
                  this.disciplinaService.atualizarDisciplinas();
                  this.router.navigate(['home']);
              });
            }
          }
        );

      }
    }else{
      this.msgErro('Disciplina inválida!');
    }
  }

  remover(){
    this.disciplinaService.removerDisciplina(this.disciplina).
    subscribe(
      (result)=>{
        this.msgSucesso('Disciplina removida com sucesso!');
        this.disciplinaService.atualizarDisciplinas();
      },
      (error) => {
        this.msgErro('Disciplina não removida.');
      },
    );
    this.router.navigate(['home']);
  }

  cancelar() {
    this.router.navigate(['home']);
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }

  changeNota(){
    this.form.patchValue({nota: this.rangeNota});
  }

  changeCargaHoraria(){
    this.form.patchValue({cargaHoraria: this.rangeCh});
  }

}
