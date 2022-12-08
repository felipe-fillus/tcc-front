import { Questionario } from './../../model/questionario.model';
import { ETiposExercicios } from './../../enum/tipos-exercicios.enum';
import { AlunoService } from './../../providers/service/aluno.service';
import { QuestionarioService } from './../../providers/service/questionario.service';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Versao } from '../../enum/versao.enum';
import { ConferenceData } from '../../providers/conference-data';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { Aluno } from '../../model/aluno.model';
import { FormBuilder, Validators } from '@angular/forms';
import { EQuestionario } from '../../enum/questionariol.enum';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';

@Component({
	selector: 'pageQuestionarioAlunoProfessor',
	templateUrl: 'pageQuestionarioAlunoProfessor.html',
	styleUrls: ['./pageQuestionarioAlunoProfessor.scss']
})
export class Page_QuestionarioAlunoProfessor implements AfterViewInit {
	@ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
	versao = Versao.numero;
	user: any;
	idAluno: any;
	aluno: any;
	tiposExercicios: any[] = [];
	tiposQuestionario: any[] = [];
	questionario: Questionario;

	observacaoForm = this.fb.group({
		id: [null],
		observacao: ['', Validators.required],
	});

	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private fb: FormBuilder,
		private authBaseService: AuthBaseService,
		private alunoService: AlunoService,
		private questionarioService: QuestionarioService) {
		activeRoute.params.subscribe(val => {
			this.openComponent();
		});
	}

	async ngAfterViewInit() {
	}

	saveQuestionario() {
		this.addToQuestionario();
		const validaObs = this.questionario.observacao != null && this.questionario.observacao != '';
		const validaidAluno = this.questionario.idAluno != null;
		const validaPreferencia =  this.questionario.preferencias.length > 0;
		const validaTipoExercicio = this.questionario.tipoExercicio != null;
		
		if(validaObs && validaidAluno && validaPreferencia && validaTipoExercicio) {
			if(this.questionario.id == null) {
				this.questionarioService.add(this.questionario).subscribe((res: Questionario) => {
					if(res) {
						this.irVoltar();
					}
				});
			}
			else {
				this.questionarioService.edit(this.questionario).subscribe((res: Questionario) => {
					if(res) {
						this.irVoltar();
					}
				});
			}
		}
	}

	openComponent() {
		this.authBaseService.watchLoggedUser().subscribe((res) => {
			this.idAluno = this.activeRoute.snapshot.params['id'];

			if (res.user) {
				this.user = res.user;
			}

			this.buscarAluno(this.idAluno);
			this.buscarQuestionario();
		});
	}

	buscarQuestionario() {
		this.questionarioService.buscarPorIdAluno(this.idAluno).subscribe((res: Questionario) => {
			if(res) {
				console.log(res)
				this.observacaoForm.get('id').setValue(res.id);
				this.observacaoForm.get('observacao').setValue(res.observacao);
				this.loadTiposExercicio(res.tipoExercicio)
				this.loadTiposQuestionario(res.preferencias);
			}
			else {
				this.loadTiposExercicio();
				this.loadTiposQuestionario();
			}
		})
	}

	addToQuestionario() {
		this.questionario = new Questionario;
		this.questionario.id = this.observacaoForm.get('id').value;
		this.questionario.observacao = this.observacaoForm.get('observacao').value;
		this.questionario.idAluno = this.idAluno;
		for (let i = 0; i < this.tiposExercicios.length; i++) {
			const element = this.tiposExercicios[i];
			if (element.check == true) {
				this.questionario.tipoExercicio = element.key;
				break;
			}
		}

		for (let i = 0; i < this.tiposQuestionario.length; i++) {
			const element = this.tiposQuestionario[i];
			if (element.check == true) {
				const preferencia = {id: null, preferencia: element.key}
				this.questionario.preferencias.push(preferencia);
			}

		}
	}

	loadTiposExercicio(tiposLoaded? : any) {
		this.tiposExercicios = [];
		for (const [key, value] of Object.entries(ETiposExercicios)) {
			let obj;
			if (tiposLoaded != null && tiposLoaded == key){
				obj = {key: key, value: value, check: true}
			}
			else {
				obj = {key: key, value: value, check: false}
			}
			this.tiposExercicios.push(obj);
		}
	}

	loadTiposQuestionario(tiposLoaded? : any) {
		for (const [key, value] of Object.entries(EQuestionario)) {
			let obj;
			if (tiposLoaded != null && tiposLoaded.find(tipo => tipo.preferencia == key)){
				obj = {key: key, value: value, check: true}
			}
			else {
				obj = {key: key, value: value, check: false}
			}
			this.tiposQuestionario.push(obj);
		}
	}

	tipoExercicioSelect(tipo : any) {
		if(tipo.detail.checked == true) {
			this.tiposExercicios.forEach(e => e.key == tipo.detail.value ? e.check = true : e.check = false)
		}
		if(tipo.detail.checked == false) {
			this.tiposExercicios.forEach(e => e.key == tipo.detail.value ? e.check = false : true)
		}
	}

	tipoQuestionarioSelect(tipo : any) {
		if(tipo.detail.checked == true) {
			this.tiposQuestionario.forEach(e => e.key == tipo.detail.value ? e.check = true : true)
		}
		if(tipo.detail.checked == false) {
			this.tiposQuestionario.forEach(e => e.key == tipo.detail.value ? e.check = false : true)
		}
	}

	buscarAluno(id: number) {
		this.alunoService.getById(id).subscribe(res => {
			if (res) {
				this.aluno = res;
			}
		});
	}

	irVoltar() {
		this.router.navigate(['/pageMeuAlunoProfessor/' + this.idAluno]);
	}

	getEnumKey(valueEnum, Enum) {
		for (const [key, value] of Object.entries(Enum))
		  if (value == valueEnum)
			return key;
	}
}

