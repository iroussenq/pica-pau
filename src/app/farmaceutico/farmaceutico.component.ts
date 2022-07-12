import { FarmaceuticoService } from './../service/farmaceutico.service';
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
  list: FarmaceuticoModel[] = [];

  formFarmaceutico: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    niver: new FormControl(null, [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private farmaceuticoService: FarmaceuticoService
  ) {}

  ngOnInit(): void {
    this.carregaTabela();
  }

  private carregaTabela(): void {
    this.farmaceuticoService
      .consultar()
      .subscribe((domains: FarmaceuticoModel[]) => {
        this.list = domains;
      });
  }

  cegonha(): void {
    this.farmaceuticoService.cegonha().subscribe(() => {
      this.consultar();
    });
  }

  private consultar(): void {
    this.farmaceuticoService
      .consultar()
      .subscribe((mafalda: FarmaceuticoModel[]) => {
        this.list = mafalda;
      });
  }

  cadastrar(): void {
    const id = this.formFarmaceutico.controls['id'].value;
    const farmaceuticoModel: FarmaceuticoModel =
      this.formFarmaceutico.getRawValue();
    if (id) {
      this.farmaceuticoService
        .alterar(farmaceuticoModel)
        .subscribe((domain: FarmaceuticoModel) => {
          if (domain.id) {
            this.carregaTabela();
            this.formFarmaceutico.reset();
          }
        });
    } else {
      this.farmaceuticoService
        .cadastrar(farmaceuticoModel)
        .subscribe((domain: FarmaceuticoModel) => {
          if (domain.id) {
            this.list.push(domain);
            this.formFarmaceutico.reset();
          }
        });
    }
  }

  editar(farmaceutico: FarmaceuticoModel): void {
    this.formFarmaceutico.controls['id'].setValue(farmaceutico.id);
    this.formFarmaceutico.controls['nome'].setValue(farmaceutico.nome);
    this.formFarmaceutico.controls['cpf'].setValue(farmaceutico.cpf);
    this.formFarmaceutico.controls['niver'].setValue(farmaceutico.niver);
  }

  remover(farmaceutico: FarmaceuticoModel): void {
    this.farmaceuticoService
      .remover(farmaceutico.id)
      .subscribe((f: FarmaceuticoModel) => {
        if (f.id) {
          this.carregaTabela();
        }
      });
  }
}
