import { FarmaceuticoModel } from './../model/farmaceutico-model';
import { ClienteModel } from './../model/cliente-model';
import { ProdutoModel } from './../model/produto-model';
import { PedidoModel } from './../model/pedido-model';

import { Farmaceutico } from './../domain/farmaceutico';
import { PedidoService } from './../service/pedido.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Cliente } from '../domain/cliente';
import { ClienteService } from '../service/cliente.service';
import { FarmaceuticoService } from '../service/farmaceutico.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {
  pedidos: PedidoModel[] = [];
  clientes: ClienteModel[] = [];
  farmaceuticos: FarmaceuticoModel[] = [];
  produtos: ProdutoModel[] = [];

  formPedido: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    idCliente: new FormControl('', [Validators.required]),
    idFarmaceutico: new FormControl('', [Validators.required]),
  });

  formAddProduto: FormGroup = this.formBuilder.group({
    idPedido: new FormControl('', [Validators.required]),
    idProduto: new FormControl('', [Validators.required]),
  });

  formPagar: FormGroup = this.formBuilder.group({
    idPedido: new FormControl('', [Validators.required]),
    valor: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private farmaceuticoService: FarmaceuticoService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.consultarPedidos();
    this.consultarClientes();
    this.consultarFarmaceuticos();
    this.consultarProdutos();
  }

  private consultarPedidos(): void {
    this.pedidoService.consultar().subscribe((x) => {
      this.pedidos = x;
    });
  }

  private consultarClientes(): void {
    this.clienteService.consultar().subscribe((x) => {
      this.clientes = x;
    });
  }

  private consultarFarmaceuticos(): void {
    this.farmaceuticoService.consultar().subscribe((x) => {
      this.farmaceuticos = x;
    });
  }

  private consultarProdutos(): void {
    this.produtoService.consultar().subscribe((x) => {
      this.produtos = x;
    });
  }

  cadastrar(): void {
    if (this.formPedido.valid) {
      const idCliente = this.formPedido.controls['idCliente'].value;
      const idFarmaceutico = this.formPedido.controls['idFarmaceutico'].value;
      this.pedidoService
        .cadastrar(idCliente, idFarmaceutico)
        .subscribe((pedido: PedidoModel) => {
          this.pedidos.push(pedido);
          this.resetForm();
        });
    }
  }

  clickAddProduto(pedido: PedidoModel) {
    this.formAddProduto.controls['idPedido'].setValue(pedido.id);
  }

  clickPagar(pedido: PedidoModel) {
    this.formPagar.controls['idPedido'].setValue(pedido.id);
  }

  addProduto(): void {
    if (this.formAddProduto.valid) {
      const idPedido = this.formAddProduto.controls['idPedido'].value;
      const idProduto = this.formAddProduto.controls['idProduto'].value;
      this.pedidoService.adicionarProduto(idPedido, idProduto).subscribe(() => {
        this.consultarPedidos();
        this.resetForm();
      });
    }
  }

  pagar(): void {
    if (this.formPagar) {
      const idPedido = this.formPedido.controls['idPedido'].value;
      const valor = this.formPedido.controls['vvalor'].value;
      this.pedidoService
        .pagar(idPedido, valor)
        .subscribe((pedido: PedidoModel) => {
          if (pedido.status === 'PAGO') {
            this.consultarPedidos();
            this.resetForm();
          } else {
            alert('MAIOR QUE 0 PEDIDO' + pedido.valor);
          }
        });
    }
  }

  remover(pedido: PedidoModel): void {
    this.pedidoService.remover(pedido.id).subscribe((c: PedidoModel) => {
      if (c.id) {
        this.resetForm();
      }
    });
  }

  resetForm(): void {
    this.formPedido.reset();
    this.formPedido.controls['idCliente'].setValue('');
    this.formPedido.controls['idFarmaceutico'].setValue('');

    this.formAddProduto.reset();
    this.formAddProduto.controls['idProduto'].setValue('');
  }
}
