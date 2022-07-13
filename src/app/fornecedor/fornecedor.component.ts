import { FornecedorModel } from './../model/fornecedor-model';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Fornecedor } from '../domain/fornecedor';
import { FornecedorService } from '../service/fornecedor.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss'],
})
export class FornecedorComponent implements OnInit {
  list: FornecedorModel[] = [];

  formFornecedor: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cnpj: new FormControl(null, [
      Validators.required,
      Validators.minLength(14),
    ]),
    niver: new FormControl(null, [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService
  ) {}

  ngOnInit(): void {
    this.carregaTabela();
  }

  private carregaTabela(): void {
    this.fornecedorService
      .consultar()
      .subscribe((domains: FornecedorModel[]) => {
        this.list = domains;
      });
  }

  cegonha(): void {
    this.fornecedorService.cegonha().subscribe(() => {
      this.consultar();
    });
  }

  private consultar(): void {
    this.fornecedorService
      .consultar()
      .subscribe((mafalda: FornecedorModel[]) => {
        this.list = mafalda;
      });
  }

  cadastrar(): void {
    const id = this.formFornecedor.controls['id'].value;
    const fornecedorModel: FornecedorModel = this.formFornecedor.getRawValue();
    if (id) {
      this.fornecedorService
        .alterar(fornecedorModel)
        .subscribe((domain: FornecedorModel) => {
          if (domain.id) {
            this.carregaTabela();
            this.formFornecedor.reset();
          }
        });
    } else {
      this.fornecedorService
        .cadastrar(fornecedorModel)
        .subscribe((domain: FornecedorModel) => {
          if (domain.id) {
            this.list.push(domain);
            this.formFornecedor.reset();
          }
        });
    }
  }

  editar(Fornecedor: FornecedorModel): void {
    this.formFornecedor.controls['id'].setValue(Fornecedor.id);
    this.formFornecedor.controls['nome'].setValue(Fornecedor.nome);
    this.formFornecedor.controls['cnpj'].setValue(Fornecedor.cnpj);
    this.formFornecedor.controls['niver'].setValue(Fornecedor.niver);
  }

  remover(fornecedor: FornecedorModel): void {
    this.fornecedorService
      .remover(fornecedor.id)
      .subscribe((f: FornecedorModel) => {
        if (f.id) {
          this.carregaTabela();
        }
      });
  }
}
