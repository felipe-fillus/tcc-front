import { ETipoExercicioSilaba } from './../../enum/tipo-exercicio-silaba.enum copy';
import { ETipoAtividade } from './../../enum/tipo-atividade.enum';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { ETipoExercicioLetra } from '../../enum/tipo-exercicio-letra.enum';
import { Versao } from '../../enum/versao.enum';
import { ConferenceData } from '../../providers/conference-data';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
	selector: 'modal_Criar_Atividade_Letra_Professor',
	templateUrl: 'modal_Criar_Atividade_Letra_Professor.html',
	styleUrls: ['./modal_Criar_Atividade_Letra_Professor.scss']
})
export class ModalCriarAtividadeLetraProfessor {

	public versao = Versao.numero;
	public user: any;
	public name: string;
	public message: string;
	public tiposExerciciosLetra = ETipoExercicioLetra;
	public tiposExerciciosSilaba = ETipoExercicioSilaba;
	public nomeImagem: string;
	public nomeParabenizacao: string;
	public form: FormGroup;
	public totalExercicios: number;
	public validaAtividade: boolean;
	public base64Output: any;

	constructor(
		public confData: ConferenceData,
		public router: Router,
		public platform: Platform,
		public authBaseService: AuthBaseService,
		private modalCtrl: ModalController,
		private fb: FormBuilder,
		private navParams: NavParams) {

		this.form = this.fb.group({
			exercicios: this.fb.array([]),
		});

		this.validaAtividade = this.navParams.get('tipoAtividade').value == 'LETRAS' ? true : false;

		if (this.navParams.get('exercicios').value != null && this.navParams.get('exercicios').value.length > 0) {
			this.recuperaExercicios();
			this.totalExercicios = this.form.value.exercicios.length;
		}
		else {
			this.addForm();
		}
	}

	addForm() {
		const exercicio = this.fb.group({
			id: [],
			palavra: ['', Validators.required],
			tipoExercicio: [null, Validators.required],
			imagem: [],
			parabenizacao: [],
			imagensExercicio: []
		});
		this.getExerciciosArray.push(exercicio);
		this.totalExercicios = this.form.value.exercicios.length;
	}

	private recuperaExercicios() {
		this.navParams.get('exercicios').value.forEach(element => {
			
			let exercicio = this.fb.group({
				id: [element.id ? element.id : null],
				idAtividade: [element.idAtividade ? element.idAtividade : null],
				palavra: [element.palavra],
				tipoExercicio: [element.tipoExercicio],
				nomeImagem: [element.nomeImagem],
				nomeParabenizacao: [element.nomeParabenizacao]
			});
			this.getExerciciosArray.push(exercicio);
			
			
		});
	}

	deleteExercicio(i) {
		this.getExerciciosArray.removeAt(i);
	}

	get getExerciciosArray() {
		return (<FormArray>this.form.get('exercicios'));
	}


	openFileDialog(index: number) {
		(document as any).getElementById("file-upload-" + index).click();
	}

	openFileDialogParabenizacao(index: number) {
		(document as any).getElementById("file-upload-parabenizacao-" + index).click();
	}

	setImage(event: any, index: number) {
		let f = event.target.files[0];
		const reader = new FileReader();

		reader.readAsDataURL(f);
		reader.onload = () => {
			this.form.get('exercicios').value[index].imagem = this.clearImgHeader(reader.result.toString());
			this.form.get('exercicios').value[index].nomeImagem = f.name;

		}
	}

	setParabenizacao(event: any, index: number) {
		let f = event.target.files[0];
		const reader = new FileReader();

		reader.readAsDataURL(f);
		reader.onload = () => {
			this.form.get('exercicios').value[index].parabenizacao = this.clearImgHeader(reader.result.toString());
			this.form.get('exercicios').value[index].nomeParabenizacao = f.name;
		}
	}
	
	clearImgHeader(imgStringBase64: string | ArrayBuffer) {
		let base64 = '';
		if (imgStringBase64.toString()) {
		  base64 = imgStringBase64.toString().split(',')[1];
		}
		
		return base64;
	}

	cancel() {
		if (this.form.get('exercicios').value != null) {
			for (let index = 0; index < this.form.get('exercicios').value.length; index++) {
				const element = this.form.get('exercicios').value[index];
				if (element.palavra == null || element.palavra == '') {
					this.deleteExercicio(index);
				}

			}
		}

		if (this.form.get('exercicios').value != null && this.form.valid) {
			this.modalCtrl.dismiss(this.form.value, 'exercicios');
		}
		else {
			this.modalCtrl.dismiss(null);
		}
	}

	confirm() {
		if (this.form.get('exercicios').value != null) {
			for (let index = 0; index < this.form.get('exercicios').value.length; index++) {
				const element = this.form.get('exercicios').value[index];
				if (element.palavra == null || element.palavra == '') {
					this.deleteExercicio(index);
				}

			}
		}

		if (this.form.valid) {
			this.modalCtrl.dismiss(this.form.value, 'exercicios');
		}
	}
}
