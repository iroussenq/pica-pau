import { FornecedorModel } from './../model/fornecedor-model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Fornecedor } from '../domain/fornecedor';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  url = 'http://localhost:8080/fornecedor/';

  constructor(private http: HttpClient) {}

  cegonha(): Observable<FornecedorModel> {
    return this.http.post<FornecedorModel>(this.url + 'cadastrar-random', {});
  }

  cadastrar(model: FornecedorModel): Observable<FornecedorModel> {
    return this.http.post<FornecedorModel>(this.url + 'cadastrar', model);
  }

  alterar(model: FornecedorModel): Observable<FornecedorModel> {
    return this.http.put<FornecedorModel>(this.url + 'alterar', model);
  }

  consultar(): Observable<FornecedorModel[]> {
    return this.http.get<FornecedorModel[]>(this.url + 'consultar');
  }

  consultarPorId(id: string): Observable<FornecedorModel[]> {
    return this.http.get<FornecedorModel[]>(this.url + 'consultar/' + id);
  }

  remover(id: string): Observable<FornecedorModel> {
    return this.http.delete<FornecedorModel>(this.url + 'remover/' + id);
  }
}
