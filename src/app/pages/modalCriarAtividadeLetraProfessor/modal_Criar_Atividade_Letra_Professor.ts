import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavParams, Platform } from '@ionic/angular';
import { ETipoExercicioImagens } from '../../enum/tipo-exercicio-imagens.enum';
import { ETipoExercicioLetra } from '../../enum/tipo-exercicio-letra.enum';
import { ETipoExercicioSilaba } from '../../enum/tipo-exercicio-silaba.enum';
import { Versao } from '../../enum/versao.enum';
import { ConferenceData } from '../../providers/conference-data';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { ETipoExercicioVogal } from './../../enum/tipo-exercicio-vogal.enum';

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
	public tiposExerciciosVogal = ETipoExercicioVogal;
	public tiposExerciciosImagem = ETipoExercicioImagens;
	public addConsoantes = false;
	public nomeImagem: string;
	public nomeParabenizacao: string;
	public form: FormGroup;
	public totalExercicios: number;
	public tipoAtividadeLetra: any;
	public tipoAtividadeSilaba: any;
	public tipoAtividadeVogal: any;
	public tipoAtividadeImagem: any;
	public base64Output: any;
	public tipoExercicioImagemSelected: any;

	constructor(
		public confData: ConferenceData,
		public router: Router,
		public platform: Platform,
		public authBaseService: AuthBaseService,
		private modalCtrl: ModalController,
		private fb: FormBuilder,
		private alertControl: AlertController,
		private navParams: NavParams) {

		this.form = this.fb.group({
			exercicios: this.fb.array([]),
		});

		this.tipoAtividadeLetra = this.navParams.get('tipoAtividade').value == 'LETRAS' ? true : false;
		this.tipoAtividadeSilaba = this.navParams.get('tipoAtividade').value == 'SILABAS' ? true : false;
		this.tipoAtividadeVogal = this.navParams.get('tipoAtividade').value == 'VOGAIS' ? true : false;
		this.tipoAtividadeImagem = this.navParams.get('tipoAtividade').value == 'IMAGENS' ? true : false;

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
			tipoExercicio: [null],
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
		if(this.tipoAtividadeImagem) {
			this.form.get('exercicios').value[index].tipoExercicio = this.tipoExercicioImagemSelected;
		}

		if(this.form.get('exercicios').value[index].tipoExercicio != null && this.form.get('exercicios').value[index].palavra != '')
			(document as any).getElementById("file-upload-" + index).click();
	}

	openFileDialogParabenizacao(index: number) {
		if(this.form.get('exercicios').value[index].tipoExercicio != null && this.form.get('exercicios').value[index].palavra != '')
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
		if(this.tipoAtividadeImagem && !this.validaTipoImagemSelected()) {
			this.presentAlert();
			return;
		}
		if (this.form.get('exercicios').value != null) {
			for (let index = 0; index < this.form.get('exercicios').value.length; index++) {
				const element = this.form.get('exercicios').value[index];

				if(this.addConsoantes == false && this.tipoAtividadeVogal == true) {
					continue;
				}

				if ((element.palavra == null || element.palavra == '')) {
					console.log("NULL")
					this.deleteExercicio(index);
				}

			}
		}
		if (this.form.valid) {
			this.modalCtrl.dismiss(this.form.value, 'exercicios');
		}
	}

	validaTipoVogal(event: any, index: number) {
		const itemSelected = event;

		if(itemSelected == 'VOGAIS_COM_CONSOANTES') {
			this.form.get('exercicios').value[index].palavra = '';
			this.addConsoantes = true
		}
		else {
			this.form.get('exercicios').value[index].palavra = 'A - E - I - O - U';
			this.addConsoantes = false;
		}
	}

	validaTipoImagem(event: any) {
		this.tipoExercicioImagemSelected = event.detail?.value;
	}

	validaTipoImagemSelected(): boolean {
		if(this.tipoExercicioImagemSelected == this.getEnumKey(ETipoExercicioImagens.PALAVRA_DESORGANIZADAS_2, ETipoExercicioImagens) || this.tipoExercicioImagemSelected == this.getEnumKey(ETipoExercicioImagens.PALAVRA_ORGANIZADAS_2, ETipoExercicioImagens) ) {
			if(this.form.get('exercicios').value.length % 2 === 0) {
				return true;
			}
			else {
				return false
			}
		}
		return true;
	}

	getEnumKey(valueEnum, Enum) {
		for (const [key, value] of Object.entries(Enum))
		  if (value == valueEnum)
			return key;
	}

	async presentAlert() {
		const alert = this.alertControl.create({
		  message: 'Atividades de 2 Imagens os exercicios devem ser pares.',
		  buttons: ['Continuar']
		});
		(await alert).present();
	  }
}
