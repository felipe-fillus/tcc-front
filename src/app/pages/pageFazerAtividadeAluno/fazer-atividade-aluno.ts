import { ETipoExercicioImagens } from './../../enum/tipo-exercicio-imagens.enum';
import { ETipoAtividade } from './../../enum/tipo-atividade.enum';
import { ETipoExercicioVogal } from './../../enum/tipo-exercicio-vogal.enum';
import { Exercicio } from './../../model/exercicio.model';
import { Atividade } from './../../model/atividade.model';
import { element } from 'protractor';
import { Component, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, CdkDragHandle, CdkDragRelease, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { AtividadeService } from '../../providers/service/ativdade.service';
import { ImagemService } from '../../providers/service/iamgem.service';
import { ETipoExercicioSilaba } from '../../enum/tipo-exercicio-silaba.enum';
import { ETipoExercicioLetra } from '../../enum/tipo-exercicio-letra.enum';

@Component({
	selector: 'fazer-atividade-aluno',
	templateUrl: 'fazer-atividade-aluno.html',
	styleUrls: ['./fazer-atividade-aluno.scss']
})
export class FazerAtividadeAluno implements AfterViewInit {
	private playNormal: String = "../../../assets/atividades/normal.png"
	private playSlow: String = "../../../assets/atividades/slow.png"
	private playSom: String = "../../../assets/atividades/som.png"
	private audioCard = new Audio();
	private audioAtividade = new Audio();
	private msg = new SpeechSynthesisUtterance();
	private msgslow = new SpeechSynthesisUtterance();
	public tipoAtividade: number;
	private variavel = [];
	private pagionaAnterior: any;
	private tipoExercicioAtivo: any;

	private user:any;
	private idAtividade: number;
	private atividade: Atividade;
	private exercicios: Exercicio[] = [];
	private exercicioActive: Exercicio;

	private acertouRemove = true;
	private acertou = false;

	private palavraList: string[] = [];
	private palavraListEmbaralhada: string[] = [];

	//Variáveis Atividade 1
	private imagePreview: { pathImage: string, fileType: string, base64: string, base64WithHeader: string } = {pathImage: null, fileType: '', base64: '', base64WithHeader: '' };
	private parabenizacaoExericioPreview: { pathImage: string, fileType: string, base64: string, base64WithHeader: string } = {pathImage: null, fileType: '', base64: '', base64WithHeader: '' };
	private parabenizacaoAlunoPreview: { pathImage: string, fileType: string, base64: string, base64WithHeader: string } = {pathImage: null, fileType: '', base64: '', base64WithHeader: '' };
	private imageLoaded = false;
	private nextExercicioIndex: number;
	private palavra: string;
	private palavra2: string;
	private validaPalavra = false;
	private acertouAtividade1 = false;

	//variaveis Atividade 2 e 3
	private imagePreview1: { pathImage: string, fileType: string, base64: string, base64WithHeader: string } = {pathImage: null, fileType: '', base64: '', base64WithHeader: '' };
	private imagePreview2: { pathImage: string, fileType: string, base64: string, base64WithHeader: string } = {pathImage: null, fileType: '', base64: '', base64WithHeader: '' };
	private acertouAtividade2item1 = false;
	private acertouAtividade2item2 = false;
	private validaPalavraAtividade2 = false;
	private palavraSelected = [];
    private palavra2Selected = [];
	private palavrasToSelec = [];
	private palavraExercicio1: string;
	private palavraExercicio2: string;
	private acertouAtividade3 = false;

	//variaveis Atividade 4 e 5
	private palavraListAtividade4 = [];
	private palavraListEmbaralhadaAtividade4 = [];
	private allDropList = [];

	//variaveis Atividade 6
	private palavraListAtividade6 = [];
	private palavraListEmbaralhadaAtividade6 = [];
	private allDropListAtividade6 = [];
	private tipoExercicioVogalConcluido = false;
	private indexAtividadeVogal: number;

	private palavraSelected2fb = this.fb.group({
		id: [null],
		nome: [null],
		acerto: [false]
	});
	
	private formAtividadeConcluida = this.fb.group({
		idAluno: [null],
		idAtividade: [null]
	});

	constructor(
		private elementRef: ElementRef,
		private fb: FormBuilder,
		private activeRoute : ActivatedRoute,
		private authBaseService: AuthBaseService,
		private imagemService: ImagemService,
		public router: Router,
		private atividadeService: AtividadeService) {
		activeRoute.params.subscribe(val => {
			this.openExercicio();
			this.pagionaAnterior = this.router.getCurrentNavigation().previousNavigation?.finalUrl?.toString();
		});
			
	}

	ngAfterViewInit(): void {
		
	}

	openExercicio() {
		this.indexAtividadeVogal = 0;
		this.tipoExercicioVogalConcluido = false;
		this.acertouRemove = true;
		this.acertou = false;

		this.idAtividade = this.activeRoute.snapshot.params['id'];
		if(this.idAtividade != null) {
			this.buscarAtividade();
			this.formAtividadeConcluida.get('idAtividade').setValue(this.idAtividade);
		}
		this.authBaseService.watchLoggedUser().subscribe((res) => {
			if (res.user) {
				this.user = res.user;
				this.formAtividadeConcluida.get('idAluno').setValue(this.user.id);
				this.carregarParabenizacaoAluno(this.user.imagensExerciciosDTO.id);
			}
		});
		this.playAudioSuccess();
		this.setAudioTranslate();
		this.setAudioTranslate1();
	}

	voltarMenuAtividades() {
		if(this.pagionaAnterior == null || this.pagionaAnterior == undefined) {
			this.router.navigate(['/pageMenuPrincipalAluno']);
		}
		if(this.pagionaAnterior == '/pageMenuAtividadesRecomendadas') {
			this.router.navigate(['/pageMenuAtividadesRecomendadas']);
		}
		if(this.pagionaAnterior == '/pageMenuMinhaAtividadesAluno') {
			this.router.navigate(['/pageMenuMinhaAtividadesAluno']);
		}
	}

	buscarAtividade() {
		this.atividadeService.getById(this.idAtividade).subscribe((res : Atividade) => {
		  if(res != null) {
			this.atividade = res;
			this.exercicios = this.atividade.exercicios;
			this.atividadeControler(0);
		  }
		});
		
	}

	atividadeControler(index? : number) {
		const tipoVogal = this.atividade.tipoAtividade == this.getEnumKey(ETipoAtividade.VOGAIS, ETipoAtividade);
		
		if((this.exercicios.length == this.nextExercicioIndex && !tipoVogal) || (this.tipoExercicioVogalConcluido && tipoVogal)) {
			this.atividadeService.setCloncluido({idAluno: this.user.id, idAtividade: this.idAtividade}).subscribe((res:any) => {
				this.voltarMenuAtividades();
			});
			return;
		}

		let tipoExercicio;

		if(tipoVogal) {
			tipoExercicio = this.exercicios[0].tipoExercicio
		}
		else {
			tipoExercicio = this.exercicios[index].tipoExercicio;
		}

		this.tipoExercicioAtivo = tipoExercicio;

		switch(tipoExercicio) {
			case this.getEnumKey(ETipoExercicioSilaba.SILABAS_EMBARALHADAS, ETipoExercicioSilaba): {
				this.tipoAtividade = 1;
				this.controladorExercicio1(this.exercicios[index]);
				break;
			}
			case this.getEnumKey(ETipoExercicioSilaba.SILABAS_ORGANIZADAS_ESCRITA, ETipoExercicioSilaba): {
				this.tipoAtividade = 4;
				this.controladorExercicio4e5(this.exercicios[index]);
				break;
			}
			case this.getEnumKey(ETipoExercicioSilaba.SILABAS_DESORGANIZADAS_ESCRITA, ETipoExercicioSilaba): {
				this.tipoAtividade = 4;
				this.controladorExercicio4e5(this.exercicios[index]);
				break;
			}
			case this.getEnumKey(ETipoExercicioSilaba.SILABAS_ORGANIZADAS_SOM, ETipoExercicioSilaba): {
				this.tipoAtividade = 5;
				this.controladorExercicio4e5(this.exercicios[index]);
				break;
			}
			case this.getEnumKey(ETipoExercicioSilaba.SILABAS_DESORGANIZADAS_SOM, ETipoExercicioSilaba): {
				this.tipoAtividade = 5;
				this.controladorExercicio4e5(this.exercicios[index]);
				break;
			}
			case this.getEnumKey(ETipoExercicioLetra.LETRAS_ORGANIZADAS_ESCRITA, ETipoExercicioLetra): {
				this.tipoAtividade = 4;
				this.controladorExercicio4e5(this.exercicios[index]);
				break;
			}
			case this.getEnumKey(ETipoExercicioLetra.LETRAS_DESORGANIZADAS_ESCRITA, ETipoExercicioLetra): {
				this.tipoAtividade = 4;
				this.controladorExercicio4e5(this.exercicios[index]);
				break;
			}
			case this.getEnumKey(ETipoExercicioLetra.LETRAS_ORGANIZADAS_SOM, ETipoExercicioLetra): {
				this.tipoAtividade = 5;
				this.controladorExercicio4e5(this.exercicios[index]);
				break;
			}
			case this.getEnumKey(ETipoExercicioLetra.LETRAS_DESORGANIZADAS_SOM, ETipoExercicioLetra): {
				this.tipoAtividade = 5;
				this.controladorExercicio4e5(this.exercicios[index]);
				break;
			}
			case this.getEnumKey(ETipoExercicioVogal.SOMENTE_VOGAL, ETipoExercicioVogal): {
				this.tipoAtividade = 6;
				this.controladorExercicio6(this.exercicios[0]);
				break;
			}
			case this.getEnumKey(ETipoExercicioVogal.VOGAIS_COM_CONSOANTES, ETipoExercicioVogal): {
				this.tipoAtividade = 6;
				this.controladorExercicio6(this.exercicios[0]);
				break;
			}
			case this.getEnumKey(ETipoExercicioImagens.PALAVRA_DESORGANIZADAS, ETipoExercicioImagens): {
				this.tipoAtividade = 3;
				this.controladorExercicio3(this.exercicios[index]);
				break;
			}
			case this.getEnumKey(ETipoExercicioImagens.PALAVRA_ORGANIZADAS, ETipoExercicioImagens): {
				this.tipoAtividade = 3;
				this.controladorExercicio3(this.exercicios[index]);
				break;
			}
			case this.getEnumKey(ETipoExercicioImagens.PALAVRA_ORGANIZADAS_2, ETipoExercicioImagens): {
				this.tipoAtividade = 2;
				this.controladorExercicio2(this.exercicios[index], this.exercicios[index + 1]);
				index = index + 1;
				break;
			}
			case this.getEnumKey(ETipoExercicioImagens.PALAVRA_DESORGANIZADAS_2, ETipoExercicioImagens): {
				this.tipoAtividade = 2;
				this.controladorExercicio2(this.exercicios[index], this.exercicios[index + 1]);
				index = index + 1;
				break;
			}
		}
		
		if(this.exercicios.length >= index + 1) {
			this.nextExercicioIndex = index + 1;
		}
	}

	controladorExercicio1(exercicio : Exercicio) {
		this.palavra = exercicio.palavra;
		this.palavraList = exercicio.palavraList;
		
		this.embaralharPalavraList(exercicio);

		this.carregarImagemExericio(exercicio);

		this.acertouRemove = true;
		this.acertou = false;
	}

	controladorExercicio2(exercicio1 : Exercicio, exercicio2? : Exercicio) {
		const listPalavras = [];
		this.palavraExercicio1 = exercicio1.palavra;
		this.palavraExercicio2 = exercicio2.palavra;

		listPalavras.push(this.palavraExercicio1);
		listPalavras.push(exercicio1.palavraList[0]);
		listPalavras.push(this.palavraExercicio2);
		listPalavras.push(exercicio1.palavraList[1]);

		this.palavrasToSelec = listPalavras.sort(() => Math.random() - 0.5);

		this.carregarImagemExericioImagens(exercicio1, exercicio2);

		this.acertouRemove = true;
		this.acertou = false;
	}

	controladorExercicio3(exercicio : Exercicio) {
		const listPalavras = [];
		this.palavraExercicio1 = exercicio.palavra;

		listPalavras.push(this.palavraExercicio1);
		listPalavras.push(exercicio.palavraList[0]);
		listPalavras.push(exercicio.palavraList[1]);
		listPalavras.push(exercicio.palavraList[2]);

		this.palavrasToSelec = listPalavras.sort(() => Math.random() - 0.5);

		this.carregarImagemExericio(exercicio);

		this.acertouRemove = true;
		this.acertou = false;
	}

	controladorExercicio4e5(exercicio : Exercicio) {
		let isShuffle = exercicio.tipoExercicio == this.getEnumKey(ETipoExercicioLetra.LETRAS_DESORGANIZADAS_ESCRITA, ETipoExercicioLetra) || 
				exercicio.tipoExercicio == this.getEnumKey(ETipoExercicioSilaba.SILABAS_DESORGANIZADAS_ESCRITA, ETipoExercicioSilaba) || 
				exercicio.tipoExercicio == this.getEnumKey(ETipoExercicioLetra.LETRAS_DESORGANIZADAS_SOM, ETipoExercicioSilaba) || 
				exercicio.tipoExercicio == this.getEnumKey(ETipoExercicioSilaba.SILABAS_DESORGANIZADAS_SOM, ETipoExercicioSilaba);
		
		this.palavra = exercicio.palavra;

		this.palavraList = [];
		exercicio.palavraList.forEach(element => {
			this.palavraList.push(element)
		});

		this.palavraListEmbaralhadaAtividade4 = [];
		this.palavraListAtividade4 = [];
		this.allDropList = [];
		
		for (let index = 0; index < this.palavraList.length; index++) {
			this.palavraSelected2fb.get('id').setValue(index.toString());
			this.palavraSelected2fb.get('nome').setValue(this.palavraList[index]);
			this.palavraListAtividade4.push(this.palavraSelected2fb.value);
			this.allDropList.push(index.toString());
		}

		if(isShuffle == true) {
			this.embaralharPalavraList(exercicio);
			for (let index = 0; index < this.palavraListEmbaralhada.length; index++) {
				this.palavraSelected2fb.get('id').setValue(index.toString());
				this.palavraSelected2fb.get('nome').setValue(this.palavraListEmbaralhada[index]);
				this.palavraListEmbaralhadaAtividade4.push(this.palavraSelected2fb.value);
			}
		} else {
			for (let index = 0; index < this.palavraList.length; index++) {
				this.palavraSelected2fb.get('id').setValue(index.toString());
				this.palavraSelected2fb.get('nome').setValue(this.palavraList[index]);
				this.palavraListEmbaralhadaAtividade4.push(this.palavraSelected2fb.value);
			}
		}
		this.carregarImagemExericio(exercicio);
		this.acertouRemove = true;
		this.acertou = false;
	}

	controladorExercicio6(exercicio : Exercicio) {
		this.palavra = exercicio.palavra;

		this.palavraList = [];
		exercicio.palavraList.forEach(element => {
			this.palavraList.push(element)
		});

		this.palavraListEmbaralhadaAtividade6 = [];
		this.palavraListAtividade6 = [];
		this.allDropListAtividade6 = [];

		for (let index = 0; index < this.palavraList.length; index++) {
			this.palavraSelected2fb.get('id').setValue(index.toString());
			this.palavraSelected2fb.get('nome').setValue(this.palavraList[index]);
			this.palavraListAtividade6.push(this.palavraSelected2fb.value);
			this.allDropListAtividade6.push(index.toString());
		}

		if(this.indexAtividadeVogal == 0) {
			this.indexAtividadeVogal = 1;
			for (let index = 0; index < this.palavraList.length; index++) {
				this.palavraSelected2fb.get('id').setValue(index.toString());
				this.palavraSelected2fb.get('nome').setValue(this.palavraList[index]);
				this.palavraListEmbaralhadaAtividade6.push(this.palavraSelected2fb.value);
			}
		} else if(this.indexAtividadeVogal == 1) {
			this.indexAtividadeVogal = 2;
			const vogal0 = this.palavraList[0];
			const vogal1 = this.palavraList[1];
			this.palavraList[0] = vogal1;
			this.palavraList[1] = vogal0;

			for (let index = 0; index < this.palavraList.length; index++) {
				this.palavraSelected2fb.get('id').setValue(index.toString());
				this.palavraSelected2fb.get('nome').setValue(this.palavraList[index]);
				this.palavraListEmbaralhadaAtividade6.push(this.palavraSelected2fb.value);
			}
		} else if(this.indexAtividadeVogal == 2) {
			this.tipoExercicioVogalConcluido = true;
			this.embaralharPalavraList(exercicio);
			for (let index = 0; index < this.palavraListEmbaralhada.length; index++) {
				this.palavraSelected2fb.get('id').setValue(index.toString());
				this.palavraSelected2fb.get('nome').setValue(this.palavraListEmbaralhada[index]);
				this.palavraListEmbaralhadaAtividade6.push(this.palavraSelected2fb.value);
			}
		}
		this.carregarImagemExericio(exercicio);
		this.acertouRemove = true;
		this.acertou = false;
	}

	embaralharPalavraList(exercicio: Exercicio) {
		const arrayIgual = true;
		while (arrayIgual == true) {
			this.palavraListEmbaralhada = exercicio.palavraList.sort(() => Math.random() - 0.5);
			const stringList = this.palavraListEmbaralhada.toString().replace(/,/g, '');
			if (this.palavra != stringList) {
				break;
			}
		}
	}

	carregarImagemExericio(exercicio: Exercicio) {
		exercicio.imagensExercicio.forEach(imagem => {
			if(imagem.tipo == 'EXERCICIO') {
				this.imagePreview.pathImage = this.imagemService.getImagem(imagem.id);
			}
			if(imagem.tipo == 'PARABENIZACAO') {
				this.parabenizacaoExericioPreview.pathImage = this.imagemService.getImagem(imagem.id);
			}
		});
	}

	carregarImagemExericioImagens(exercicio1: Exercicio, exercicio2: Exercicio) {
		exercicio1.imagensExercicio.forEach(imagem => {
			if(imagem.tipo == 'EXERCICIO') {
				this.imagePreview1.pathImage = this.imagemService.getImagem(imagem.id);
			}
			if(imagem.tipo == 'PARABENIZACAO') {
				this.parabenizacaoExericioPreview.pathImage = this.imagemService.getImagem(imagem.id);
			}
		});
		exercicio2.imagensExercicio.forEach(imagem => {
			if(imagem.tipo == 'EXERCICIO') {
				this.imagePreview2.pathImage = this.imagemService.getImagem(imagem.id);
			}
			if(imagem.tipo == 'PARABENIZACAO' && this.parabenizacaoExericioPreview.pathImage == null) {
				this.parabenizacaoExericioPreview.pathImage = this.imagemService.getImagem(imagem.id);
			}
		});
	}

	getImage() {
		if (this.imagePreview.pathImage != null ) {
			return this.imagePreview.pathImage;
		}
	}

	getImage1() {
		if (this.imagePreview1.pathImage != null ) {
			return this.imagePreview1.pathImage;
		}
	}

	getImage2() {
		if (this.imagePreview2.pathImage != null ) {
			return this.imagePreview2.pathImage;
		}
	}

	carregarParabenizacaoAluno(id: number) {
		this.imagePreview.pathImage = this.imagemService.getImagem(id);
		if (this.imagePreview.pathImage != null ) {
			this.imageLoaded = true;
		}
	}

	getParabenizacao() {
		if (this.parabenizacaoExericioPreview.pathImage != null ) {
			return this.parabenizacaoExericioPreview.pathImage;
		}
		if (this.parabenizacaoAlunoPreview.pathImage != null) {
			return this.parabenizacaoAlunoPreview.pathImage;
		}
		return '../../../assets/img/parabens.gif';
	}

	validacaoAtividade1(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.palavraList, event.previousIndex, event.currentIndex);
		let palavraConcatenada: string = '';
		this.palavraList.forEach(x => palavraConcatenada += x);
		if (this.palavra == palavraConcatenada) {
			setTimeout(() => {
				this.msg.text = this.palavra;
				this.audioAtividade.pause;
				speechSynthesis.speak(this.msg);
			}, 500);
			setTimeout(() => {
				this.acertouAtividade1 = true;
				this.acertou = true;
				this.acertouRemove = false;
				this.audioAtividade.play();
			}, 1000);
		}
		else {
			this.acertouAtividade1 = false;
		}
	}

	validarPalavraAtividade4e5(event: CdkDragDrop<number[]>) {
		if(event.previousContainer.data == event.container.data) {
			this.palavraListAtividade4[event.container.id].acerto = true;

			speechSynthesis.pause;
			this.audioCard.play();
			setTimeout(() => {
				this.msg.text = this.palavraListAtividade4[event.container.id].nome;
				this.audioAtividade.pause;
				speechSynthesis.speak(this.msg);
			}, 350);
			this.palavraListEmbaralhadaAtividade4[event.previousContainer.id].acerto = true;
		}

		if (this.palavraListAtividade4.find(x => x.acerto == false)) {
			return;
		}
		setTimeout(() => {
			this.msg.text = this.palavra;
			this.audioAtividade.pause;
			speechSynthesis.speak(this.msg);
		}, 500);

		setTimeout(() => {
			this.acertou = true;
			this.acertouRemove = false;
			speechSynthesis.pause;
			this.audioAtividade.play();
		}, 1000);
	}

	validarPalavraAtividade6(event: CdkDragDrop<number[]>) {
		if(event.previousContainer.data == event.container.data) {
			this.palavraListAtividade6[event.container.id].acerto = true;
			speechSynthesis.pause;
			this.audioCard.play();
			setTimeout(() => {
				this.msg.text = this.palavraListAtividade6[event.container.id].nome;
				this.msg.text = this.msgVogalComConsoante(this.msg.text);
				this.audioAtividade.pause;
				speechSynthesis.speak(this.msg);
			}, 350);
			this.palavraListEmbaralhadaAtividade6[event.previousContainer.id].acerto = true;
		}

		if (this.palavraListAtividade6.find(x => x.acerto == false)) {
			return;
		}

		this.acertou = true;
		this.acertouRemove = false;
	}

	msgVogalComConsoante(palavra : string): string {
		if(palavra[palavra.length -1] == 'A' && this.tipoExercicioAtivo == this.getEnumKey(ETipoExercicioVogal.VOGAIS_COM_CONSOANTES, ETipoExercicioVogal)) {
			return palavra.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()).replace('a', 'á')
		}
		if(palavra[palavra.length -1] == 'O' && this.tipoExercicioAtivo == this.getEnumKey(ETipoExercicioVogal.VOGAIS_COM_CONSOANTES, ETipoExercicioVogal)) {
			return palavra.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()).replace('o', 'ó')
		}
		else {
			palavra = palavra.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
		}
		return palavra;
	}

	repeatAtividade6() {
		this.indexAtividadeVogal = this.indexAtividadeVogal - 1;
		this.atividadeControler();
	}

	validarPalavraAtividade2(event: CdkDragDrop<string[]>) {
		this.validaPalavraAtividade2 = event.previousContainer.data[event.previousIndex] == this.palavraExercicio1;

		if (this.validaPalavraAtividade2) {
			setTimeout(() => {
				this.msg.text = this.palavraExercicio1;
				this.audioAtividade.pause;
				speechSynthesis.speak(this.msg);
			}, 500);

			this.acertouAtividade2item1 = true;

			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex,
			);
			if (this.acertouAtividade2item2 == true) {
				setTimeout(() => {
					this.acertou = true;
					this.acertouRemove = false;
					this.audioAtividade.play();
				}, 1200);

			}
		} else {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		}
	}


	validarPalavra2Atividade2(event: CdkDragDrop<string[]>) {
		this.validaPalavraAtividade2 = event.previousContainer.data[event.previousIndex] == this.palavraExercicio2;

		if (this.validaPalavraAtividade2) {
			this.acertouAtividade2item2 = true;
			setTimeout(() => {
				this.msg.text = this.palavraExercicio2;
				this.audioAtividade.pause;
				speechSynthesis.speak(this.msg);
			}, 500);
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex,
			);
			if (this.acertouAtividade2item1 == true) {
				setTimeout(() => {
					this.acertou = true;
					this.acertouRemove = false;
					this.audioAtividade.play();
				}, 1000);

			}
		} else {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		}
	}

	validarPalavraAtividade3(event: CdkDragDrop<string[]>) {
		this.validaPalavra = event.previousContainer.data[event.previousIndex] == this.palavraExercicio1;

		if (this.validaPalavra) {
			this.acertouAtividade3 = true;
			setTimeout(() => {
				this.msg.text = this.palavraExercicio1;
				this.audioAtividade.pause;
				speechSynthesis.speak(this.msg);
			}, 500);
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex,
			);
			setTimeout(() => {
				this.acertou = true;
				this.acertouRemove = false;
				this.audioAtividade.play();
			}, 1000);

		} else {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		}
	}

	playnormal() {
		this.msg.text = this.palavra;
		this.audioAtividade.pause;
		speechSynthesis.speak(this.msg);
	}
	playslow() {
		this.msgslow.text = this.palavra;
		this.audioAtividade.pause;
		speechSynthesis.speak(this.msgslow);
	}
	playnormal2() {
		this.msg.text = this.palavra2;
		this.audioAtividade.pause;
		speechSynthesis.speak(this.msg);
	}
	playslow2() {
		this.msgslow.text = this.palavra2;
		this.audioAtividade.pause;
		speechSynthesis.speak(this.msgslow);
	}
	setAudioTranslate() {
		this.msg.volume = 0.8;
		this.msg.rate = 0.8;
		this.msg.pitch = 0.8;
		this.msg.lang = "pt-BR";
		this.msg.text = "";
	}
	setAudioTranslate1() {
		this.msgslow.lang = "pt-BR";
		this.msgslow.text = "";
		this.msgslow.volume = 0.8;
		this.msgslow.pitch = 0.5;
		this.msgslow.rate = 0.25;
	}
	playAudioSuccess() {
		this.audioCard.src = "../../../assets/atividades/success.mp3";
		this.audioCard.load();
		this.audioAtividade.src = "../../../assets/atividades/atividade_success.mp3";
		this.audioAtividade.load();
	}

	getEnumKey(valueEnum, Enum) {
		for (const [key, value] of Object.entries(Enum))
		  if (value == valueEnum)
			return key;
	}
}