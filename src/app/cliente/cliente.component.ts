import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ClienteModel } from '../model/cliente-model';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  list: ClienteModel[] = [];

  form: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    niver: new FormControl(null, [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.carregaTabela();
  }

  private carregaTabela(): void {
    this.clienteService.consultar().subscribe((domains: ClienteModel[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const id = this.form.controls['id'].value;
    const clienteModel: ClienteModel = this.form.getRawValue();
    if (id) {
      this.clienteService
        .alterar(clienteModel)
        .subscribe((domain: ClienteModel) => {
          if (domain.id) {
            this.carregaTabela();
            this.form.reset();
          }
        });
    } else {
      this.clienteService
        .cadastrar(clienteModel)
        .subscribe((domain: ClienteModel) => {
          if (domain.id) {
            this.list.push(domain);
            this.form.reset();
          }
        });
    }
  }

  editar(cliente: ClienteModel): void {
    this.form.controls['id'].setValue(cliente.id);
    this.form.controls['nome'].setValue(cliente.nome);
    this.form.controls['cpf'].setValue(cliente.cpf);
    this.form.controls['email'].setValue(cliente.email);
    this.form.controls['niver'].setValue(cliente.niver);
  }

  remover(cliente: ClienteModel): void {
    this.clienteService.remover(cliente.id).subscribe((c: ClienteModel) => {
      if (c.id) {
        this.carregaTabela();
      }
    });
  }
}
