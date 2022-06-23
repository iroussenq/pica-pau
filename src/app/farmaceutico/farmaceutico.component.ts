import { FarmaceuticoModule } from './farmaceutico.module';
import { Farmaceutico } from './../domain/farmaceutico';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FarmaceuticoModel } from '../model/farmaceutico-model';

@Component({
  selector: 'app-farmaceutico',
  templateUrl: './farmaceutico.component.html',
  styleUrls: ['./farmaceutico.component.scss'],
})
export class FarmaceuticoComponent implements OnInit {
  list: Farmaceutico[] = [];

  formFarmaceutico: FormGroup = this.formBuilder.group({
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    niver: new FormControl(null, [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.get().subscribe((domains: Farmaceutico[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const farmaceuticoModel: FarmaceuticoModel =
      this.formFarmaceutico.getRawValue();
    this.post(farmaceuticoModel).subscribe((domain: Farmaceutico) => {
      if (domain.id) {
        this.list.push(domain);
      }
    });
  }

  private post(model: FarmaceuticoModel): Observable<Farmaceutico> {
    const url = 'http://localhost:8080/farmaceutico/cadastrar';
    return this.http.post<Farmaceutico>(url, model);
  }

  private get(): Observable<Farmaceutico[]> {
    const url = 'http://localhost:8080/farmaceutico/consultar';
    return this.http.get<Farmaceutico[]>(url);
  }
}
