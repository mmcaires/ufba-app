import { Disciplina } from './../model/disciplina';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const ENDPOINT='https://retoolapi.dev/e9NEZp/disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  public dataSource = new BehaviorSubject<Disciplina[]>([]);
  public disciplinas= this.dataSource.asObservable();

  constructor(private http: HttpClient) { }

  public atualizarDisciplinas(){
    this.listarDisciplinas().
      subscribe(
        (result)=>{
          this.dataSource.next(result);
        }
      );
  }

  public listarDisciplinas(): Observable<Disciplina[]>{
    return this.http.get<Disciplina[]>(ENDPOINT);
  }

  public cadastrarDisciplina(d: Disciplina): Observable<Disciplina>{
    return this.http.post<Disciplina>(ENDPOINT,d);
  }

  public alterarDisciplina(d: Disciplina): Observable<Disciplina>{
    return this.http.put<Disciplina>(ENDPOINT+'/'+d.id,d);
  }

  public removerDisciplina(d: Disciplina){
    return this.http.delete(ENDPOINT+'/'+d.id);
  }

  public getDisciplinaPorId(id: number): Observable<Disciplina>{
    return this.http.get<Disciplina>(ENDPOINT+'/'+id);
  }

  public getDisciplinaPorCodigo(codigo: string): Observable<Disciplina>{
    return this.http.get<Disciplina>(ENDPOINT+'?codigo='+codigo);
  }

}
