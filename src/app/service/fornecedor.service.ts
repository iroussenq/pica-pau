import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FornecedorModel } from '../model/fornecedor-model';
import { Fornecedor } from '../domain/fornecedor';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  url = 'http://localhost:8080/fornecedor/';

  constructor(private http: HttpClient) {}

  cadastrar(fornecedorModel: FornecedorModel): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.url + 'cadastrar', fornecedorModel);
  }

  cegonha(): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.url + 'cadastrar-random', {});
  }

  consultar(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.url + 'consultar');
  }

  editar(id: string, model: FornecedorModel): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(this.url + 'alterar/' + id, model);
  }

  excluir(id: string): Observable<Fornecedor> {
    return this.http.delete<Fornecedor>(this.url + 'remover/' + id);
  }
}
