import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { ETipoExercicioImagens } from '../../enum/tipo-exercicio-imagens.enum';
import { Versao } from '../../enum/versao.enum';
import { ConferenceData } from '../../providers/conference-data';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';

@Component({
	selector: 'modal_Criar_Atividade_Imagens_Professor',
	templateUrl: 'modal_Criar_Atividade_Imagens_Professor.html',
	styleUrls: ['./modal_Criar_Atividade_Imagens_Professor.scss']
})
export class ModalCriarAtividadeImagensProfessor {
	public versao = Versao.numero;
	public user: any;
	public name: string;
	public message: string;
	public tiposExerciciosImagens = ETipoExercicioImagens;
	public nomeImagem: string;
	public nomeParabenizacao: string;
	public form: FormGroup;
	public totalExercicios: number;

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

			if(this.navParams.get('exercicios').value != null && this.navParams.get('exercicios').value.length > 0) {
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
		  });
		this.getExerciciosArray.push(exercicio);
		this.totalExercicios = this.form.value.exercicios.length;
	}

	private recuperaExercicios() {
		this.navParams.get('exercicios').value.forEach(element => {
			let exercicio = this.fb.group({
				palavra: [element.palavra],
				tipoExercicio: [element.tipoExercicio],
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


	openFileDialog() {
		(document as any).getElementById("file-upload").click();
	}

	openFileDialogParabenizacao() {
		(document as any).getElementById("file-upload-parabenizacao").click();
	}
	 
	setImage($event: any) {
		let f = $event.target.files![0];
		if(f != null) {
			this.nomeImagem = f.name;
		}
	}

	setParabenizacao($event: any) {
		let f = $event.target.files![0];
		if(f != null) {
			this.nomeParabenizacao = f.name;
		}
	}

	cancel() {
		this.modalCtrl.dismiss(null);
	}

	confirm() {
		if(this.form.get('exercicios').value != null) {
			for (let index = 0; index < this.form.get('exercicios').value.length; index++) {
				const element = this.form.get('exercicios').value[index];
				if(element.palavra == null || element.palavra == '') {
					this.deleteExercicio(index);
				} 
				
			}
		}
		if(this.form.valid) {
			this.modalCtrl.dismiss(this.form.value, 'exercicios');
		}
	}
}
