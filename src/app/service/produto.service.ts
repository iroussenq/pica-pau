import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../domain/produto';
import { ProdutoModel } from '../model/produto-model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  url = 'http://localhost:8080/produto/';

  constructor(private http: HttpClient) {}

  cadastrar(model: ProdutoModel): Observable<Produto> {
    return this.http.post<Produto>(this.url + 'cadastrar', model);
  }

  alterar(id: string, model: ProdutoModel): Observable<Produto> {
    return this.http.put<Produto>(this.url + 'alterar/' + id, model);
  }

  consultar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url + 'consultar');
  }

  remover(id: string): Observable<Produto> {
    return this.http.delete<Produto>(this.url + 'remover/' + id);
  }
}
