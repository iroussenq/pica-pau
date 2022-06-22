import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss'],
})
export class FornecedorComponent implements OnInit {
  formFornecedor: FormGroup = this.formBuilder.group({
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cnpj: new FormControl(null, [
      Validators.required,
      Validators.minLength(14),
    ]),
    niver: new FormControl(null, [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  cadastrar(): void {}
}
