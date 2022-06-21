import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cpf: string = '';

  constructor() {}

  ngOnInit(): void {}

  validar(): void {
    const value = this.cpf;
    if (!this.isCpfValid(this.cpf)) {
      this.cpf = 'Seu cpf é inválido';
    }
    this.cpf = this.format(value);
  }

  limpar(): void {
    this.cpf = '';
  }

  public format(value: string): string {
    var val = this.extractNumbers(value);
    if (val.length == 11) {
      return val.replace('(\\d{3})(\\d{3})(\\d{3})(\\d{2})', '$1.$2.$3-$4');
    } else if (val.length == 14) {
      return val.replace(
        '(\\d{2})(\\d{3})(\\d{3})(\\d{4})(\\d{2})',
        '$1.$2.$3/$4-$5'
      );
    }
    return val;
  }

  public extractNumbers(val: string): string {
    if (val != null) {
      return val.replace('\\D+', '');
    }
    return '';
  }

  private extractNumbersToList(value: string): number[] {
    const digits: number[] = [];
    for (var item of this.extractNumbers(value).split('')) {
      digits.push(parseInt(item.toString()));
    }
    return digits;
  }

  private mod11(digits: number[], multipliers: number[]): number {
    var i: number;
    var rest = digits.reduce((p, e) => p + e * multipliers[i++], 0) % 11;
    return rest > 9 ? 0 : rest;
  }

  public isCpfValid(cpf: string): boolean {
    let digits = this.extractNumbersToList(cpf);
    if (digits.length == 11 && this.distinct(digits).length > 1) {
      return this.getCpfValid(digits.slice(0, 9)) === this.extractNumbers(cpf);
    }
    return false;
  }

  private getCpfValid(digits: number[]): string {
    digits.push(this.mod11(digits, [1, 2, 3, 4, 5, 6, 7, 8, 9]));
    digits.push(this.mod11(digits, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
    return digits.toString();
  }

  private distinct(digits: number[]): number[] {
    return [...new Set(digits)];
  }
}
