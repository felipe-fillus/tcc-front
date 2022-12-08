import { AtividadeService } from '../../providers/service/ativdade.service';
import { ETipoExercicioSilaba } from '../../enum/tipo-exercicio-silaba.enum';
import { ETipoAtividade } from '../../enum/tipo-atividade.enum';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { ETipoExercicioLetra } from '../../enum/tipo-exercicio-letra.enum';
import { Versao } from '../../enum/versao.enum';
import { ConferenceData } from '../../providers/conference-data';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { Observable, ReplaySubject } from 'rxjs';
import { AlunoService } from '../../providers/service/aluno.service';
import { Aluno } from '../../model/aluno.model';
import { InstituicaoService } from '../../providers/service/instituicao.service';
import { Instituicao } from '../../model/instituicao.model';

@Component({
	selector: 'modal_nova_instituicao',
	templateUrl: 'modal_nova_instituicao.html',
	styleUrls: ['./modal_nova_instituicao.scss']
})
export class ModalNovaInstituicao {

	public versao = Versao.numero;
	public user: any;
	public name: string;
	public message: string;
	public totalExercicios: number;
	public idAtividade: number;
	public idProfessor: number
	public base64Output: any;
	public alunos: Aluno[] = [];
	idInstituicao: number;
	passwordType: string = 'password';
	passwordRepeatType: string = 'password';
	passwordIcon: string = 'eye-off';
	passwordRepeatIcon: string = 'eye-off';
	modalControllerIndex: number;
	valorPlanoSelected: number;
	planoSelected: string = 'BASICO';
	formaPagamento: string;

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
		senha: [null],
		plano: [null],
		nomeCartao: [null],
		sobrenomeCartao: [null],
		numeroCartao: [null],
		validadeCartao: [null],
		cvvCartao: [null],
		formaPagamento: [null]
	});

	constructor(
		public confData: ConferenceData,
		public router: Router,
		public platform: Platform,
		public authBaseService: AuthBaseService,
		private modalCtrl: ModalController,
		private navParams: NavParams,
		private instituicaoService: InstituicaoService,
		private fb: FormBuilder) {

		this.modalControllerIndex = 1;

		this.idInstituicao = this.navParams.data.idInstituicao;
		console.log(this.idInstituicao)

		if (this.idInstituicao != null) {
			this.buscarInstituicao(this.idInstituicao);
		}
		else {
			this.newForm();
		}
	}

	confirm() {
		this.modalCtrl.dismiss();
	}

	buscarInstituicao(id: number) {
		if (id != null) {
			this.instituicaoService.getById(id).subscribe((res: Instituicao) => {
				if (res) {
					this.newForm(res);
				}
				else {
					this.newForm();
				}
			});
		}
	}

	newForm(obj?: Instituicao): void {
		if (obj) {
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
				senha: [obj.senha, Validators.required],
				plano: [obj.plano],
				nomeCartao: [obj.nomeCartao],
				sobrenomeCartao: [obj.sobrenomeCartao],
				numeroCartao: [obj.numeroCartao],
				validadeCartao: [obj.validadeCartao],
				cvvCartao: [obj.cvvCartao],
				formaPagamento: [obj.formaPagamento]
			});
			this.planoSelected = this.formInstituicao.get('plano').value;
			this.formaPagamento = this.formInstituicao.get('formaPagamento').value;
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
				senha: [null, Validators.required],
				plano: [null],
				nomeCartao: [null],
				sobrenomeCartao: [null],
				numeroCartao: [null],
				validadeCartao: [null],
				cvvCartao: [null],
				formaPagamento: [null]
			});
		}
	}

	irCadastrar(): void {
		if (this.formInstituicao.valid) {
			if (this.idInstituicao == null) {
				this.instituicaoService.add(this.formInstituicao.value).subscribe((res) => {
					if (res) {
					}
				});
			}
			else {
				this.instituicaoService.edit(this.formInstituicao.value).subscribe((res) => {
					if (res) {
					}
				});
			}

		} else {
			this.formInstituicao.markAsTouched();
		}

		this.confirm()
	}

	hideShowPassword() {
		this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
		this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
	}

	hideShowRepeatPassword() {
		this.passwordRepeatType = this.passwordRepeatType === 'text' ? 'password' : 'text';
		this.passwordRepeatIcon = this.passwordRepeatIcon === 'eye-off' ? 'eye' : 'eye-off';
	}

	modalController(index: number) {
		this.modalControllerIndex = index;
	}

	radioChecked(value: string) {
		this.planoSelected = value;

		if (this.planoSelected != null) {
			switch (this.planoSelected) {
				case 'BASICO': {
					this.valorPlanoSelected = 48, 90;
					this.formInstituicao.get('plano').setValue(this.planoSelected);
					break;
				}
				case 'PADRAO': {
					this.valorPlanoSelected = 124, 70;
					this.formInstituicao.get('plano').setValue(this.planoSelected);
					break;
				}
				case 'PREMIUM': {
					this.valorPlanoSelected = 199, 90;
					this.formInstituicao.get('plano').setValue(this.planoSelected);
					break;
				}
			}
		}
	}

	formaPagamentoChecked(value: string) {
		this.formaPagamento = value;

		this.formInstituicao.get('formaPagamento').setValue(this.formaPagamento);
	}
}
