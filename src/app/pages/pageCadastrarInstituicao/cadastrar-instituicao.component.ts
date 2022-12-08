import { InstituicaoService } from '../../providers/service/instituicao.service';
import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { Router } from '@angular/router';
import { Instituicao } from '../../model/instituicao.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Versao } from '../../enum/versao.enum';

@Component({
  selector: 'cadastrar-instituicao.component',
  templateUrl: 'cadastrar-instituicao.component.html',
  styleUrls: ['./cadastrar-instituicao.component.scss']
})
export class CadastrarInstituicao implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  versao = Versao.numero;
  public formInstituicao = this.fb.group({
    id: [null],
    nome: [null],
    cnpj: [null],
    email: [null],
    cep: [null],
    endereco: [null],
    numero: [null],
    bairro: [null],
    cidade: [null],
    uf: [null],
    telefone: [null],
    senha: [null]
  });

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public router: Router,
    public platform: Platform,
    public fb: FormBuilder,
    private instituicaoService: InstituicaoService) {}

  ngAfterViewInit() {
    this.newForm();
  }

  newForm(obj?: Instituicao): void {
    if(obj){
      this.formInstituicao = this.fb.group({
        id: [obj.id],
        nome: [obj.nome],
        cnpj: [obj.cnpj, Validators.required],
        email: [obj.email],
        cep: [obj.cep],
        endereco: [obj.endereco],
        numero: [obj.numero],
        bairro: [obj.bairro],
        cidade: [obj.cidade],
        uf: [obj.uf],
        telefone: [obj.telefone],
        senha: [obj.senha, Validators.required]
      })
    } else {
      this.formInstituicao = this.fb.group({
        id: [null],
        nome: [null],
        cnpj: [null, Validators.required],
        email: [null],
        cep: [null],
        endereco: [null],
        numero: [null],
        bairro: [null],
        cidade: [null],
        uf: [null],
        telefone: [null],
        senha: [null, Validators.required]
      })
    }
  }

  irCadastrar(): void {
    if (this.formInstituicao.valid) {
      this.instituicaoService.add(this.formInstituicao.value).subscribe((res) => {
        if(res){
        }
      })

    } else {
      this.formInstituicao.markAsTouched();
    }

    //this.router.navigateByUrl('/pageMenuPrincipalInstituicao');
  }
}
