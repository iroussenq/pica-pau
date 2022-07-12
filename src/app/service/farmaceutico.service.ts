import { FarmaceuticoModel } from './../model/farmaceutico-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Farmaceutico } from '../domain/farmaceutico';

@Injectable({
  providedIn: 'root',
})
export class FarmaceuticoService {
  url = 'http://localhost:8080/farmaceutico/';

  constructor(private http: HttpClient) {}

  cegonha(): Observable<FarmaceuticoModel> {
    return this.http.post<FarmaceuticoModel>(this.url + 'cadastrar-random', {});
  }

  cadastrar(model: FarmaceuticoModel): Observable<FarmaceuticoModel> {
    return this.http.post<FarmaceuticoModel>(this.url + 'cadastrar', model);
  }

  alterar(model: FarmaceuticoModel): Observable<FarmaceuticoModel> {
    return this.http.put<FarmaceuticoModel>(this.url + 'alterar', model);
  }

  consultar(): Observable<FarmaceuticoModel[]> {
    return this.http.get<FarmaceuticoModel[]>(this.url + 'consultar');
  }

  consultarPorId(id: string): Observable<FarmaceuticoModel[]> {
    return this.http.get<FarmaceuticoModel[]>(this.url + 'consultar/' + id);
  }

  remover(id: string): Observable<FarmaceuticoModel> {
    return this.http.delete<FarmaceuticoModel>(this.url + 'remover/' + id);
  }
}
