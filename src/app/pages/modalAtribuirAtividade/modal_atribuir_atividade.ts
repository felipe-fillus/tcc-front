import { AtividadeService } from './../../providers/service/ativdade.service';
import { ETipoExercicioSilaba } from '../../enum/tipo-exercicio-silaba.enum copy';
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

@Component({
	selector: 'modal_atribuir_atividade',
	templateUrl: 'modal_atribuir_atividade.html',
	styleUrls: ['./modal_atribuir_atividade.scss']
})
export class ModalAtribuirAtividade {

	public versao = Versao.numero;
	public user: any;
	public name: string;
	public message: string;
	public totalExercicios: number;
	public idAtividade: number;
	public idProfessor: number
	public base64Output: any;
	public alunos : Aluno[] = [];

	formAtividadeAluno = this.fb.group({
		idAtividade: [null],
		idAluno: [null]
	});

	constructor(
		public confData: ConferenceData,
		public router: Router,
		public platform: Platform,
		public authBaseService: AuthBaseService,
		private modalCtrl: ModalController,
		private navParams: NavParams,
		private atividadeService: AtividadeService,
		private alunoService: AlunoService,
		private fb: FormBuilder) {
		

		this.idAtividade = this.navParams.data.idAtividade;
		this.idProfessor = this.navParams.data.idProfessor;
		
		if(this.idAtividade != null && this.idProfessor != null) {
			this.getAluno();
		}
	}


	cancel() {
		this.modalCtrl.dismiss(null);
	}

	confirm() {
		this.modalCtrl.dismiss();
	}

	getAluno() {
		this.alunoService.listarAlunos(this.idProfessor).subscribe((res: Aluno[]) => {
		  if(res != null && res.length > 0){
			this.alunos = res;

			this.alunos.forEach(aluno => {
				if(aluno.atividadesAluno != null && aluno.atividadesAluno.find(e => e.idAtividade == this.idAtividade)) {
					aluno.atividade = true;
				}
				else {
					aluno.atividade = false;
				}
			});
		  }
		})
	}

	onChange(event : any, index : number) {
		this.alunos[index].atividade = this.alunos[index].atividade == true ? false : true;
		
		if(this.alunos[index].atividade == true) {
			this.formAtividadeAluno.get('idAtividade').setValue(this.idAtividade);
			this.formAtividadeAluno.get('idAluno').setValue(this.alunos[index].id);
			this.atividadeService.atribuirAtividade(this.formAtividadeAluno.value).subscribe((res:any) => {

			})
		}
		if(this.alunos[index].atividade == false) {
			let idAtividadeAluno;
			this.alunos[index].atividadesAluno.forEach(e => {
				if(e.idAtividade == this.idAtividade) {
					idAtividadeAluno = e.id;
				}
			});
			this.atividadeService.removerAtividadeAluno(idAtividadeAluno).subscribe((res:any) => {

			});
		}
		
	}
}
