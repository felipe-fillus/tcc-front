import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from '../../model/atividade.model';
import { Exercicio } from '../../model/exercicio.model';
import { AtividadeService } from '../../providers/service/ativdade.service';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { ImagemService } from '../../providers/service/iamgem.service';

@Component({
	selector: 'fazer-atividade-aluno',
	templateUrl: 'fazer-atividade-aluno.html',
	styleUrls: ['./fazer-atividade-aluno.scss']
})
export class FazerAtividadeAluno implements AfterViewInit {
    idAtividade: number;
    atividade: Atividade;
    exercicios: Exercicio[];
    exercicioAtual: Exercicio;
    imagemParabenizacao: { pathImage: string, fileType: string, base64: string, base64WithHeader: string } = {pathImage: null, fileType: '', base64: '', base64WithHeader: '' };
    imagemPalavra: { pathImage: string, fileType: string, base64: string, base64WithHeader: string } = {pathImage: null, fileType: '', base64: '', base64WithHeader: '' };
	palavraList = ['no', 'Ri', 'te', 'ron', 'ce'];
	palavra = 'Rinoceronte';
	acertou: Boolean = false;
    acertouAtividade1: Boolean = false;
    acertouRemove: Boolean = true;
    tipoAtividade: number = 1; //Controlador de Atividade

	// public palavra2 = 'Arara';
	// public palavrasToSelec = ['Arara', 'Morcego', 'Rinoceronte', 'Aranha'];
	// public palavraSelected = [];
	// public palavra2Selected = [];
	// public palavraSortList = ['no', 'Ri', 'te', 'ron', 'ce'];
	// public palavraListValidation = ['Ri', 'no', 'ce', 'ron', 'te'];
	// public palavraSortListSelected = ['RI', 'no', 'ce', 'ron', 'te'];
	// public palavraListSize = this.palavraSortList.length;
	// public validaPalavra: Boolean = false;
	// public acertouAtividade2item1: Boolean = false;
	// public acertouAtividade2item2: Boolean = false;
	// public acertouAtividade3: Boolean = false;
	// public palavraSelected2List = [];
	// public palavraSelected2Shuffle = [];
	// public palavrasToSelec2 = ['Ri', 'no', 'ce', 'ron', 'te'];
	// public palavrasToSelec2Random = ['ron', 'te', 'ce', 'Ri', 'no'];
	public audioCard = new Audio();
	public audioAtividade = new Audio();
	public msg = new SpeechSynthesisUtterance();
	public msgslow = new SpeechSynthesisUtterance();

	public playNormal: String = "../../../assets/atividades/normal.png"
	public playSlow: String = "../../../assets/atividades/slow.png"
	//'

	// public palavraSelected2fb = this.fb.group({
	// 	id: [null],
	// 	nome: [null],
	// 	acerto: [false]
	// });
	// loginForm = this.fb.group({
	// 	tipo: ['', Validators.required]
	// });

	constructor(
		public router: Router,
		private activeRoute: ActivatedRoute,
		private fb: FormBuilder,
		private imagemService: ImagemService,
        private atividadeService: AtividadeService,
		public authBaseService: AuthBaseService) { }

	ngAfterViewInit(): void {
        this.idAtividade = this.activeRoute.snapshot.params['id'];
		this.playAudioSuccess();
		this.setAudioTranslate();
		this.setAudioTranslate1();

		// for (let index = 0; index < this.palavrasToSelec2.length; index++) {
		// 	this.palavraSelected2fb.get('id').setValue(index);
		// 	this.palavraSelected2fb.get('nome').setValue(this.palavrasToSelec2[index]);
		// 	this.palavraSelected2List.push(this.palavraSelected2fb.value);
		// }

		// for (let index = 0; index < this.palavrasToSelec2Random.length; index++) {
		// 	this.palavraSelected2fb.get('id').setValue(index);
		// 	this.palavraSelected2fb.get('nome').setValue(this.palavrasToSelec2Random[index]);
		// 	this.palavraSelected2Shuffle.push(this.palavraSelected2fb.value);
		// }
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

    filtrarAtividade() {
        this.atividadeService.getById(this.idAtividade).subscribe((res : Atividade) => {
          if(res != null) {
            this.atividade = res;
            this.montarExercicioPorTipo();
          }
        });
    }

    montarExercicioPorTipo() {
        this.exercicioAtual = this.atividade.exercicios[0];
        this.tipoAtividade = 1 //this.atividade.tipoAtividade;
        

        this.exercicioAtual.imagensExercicio.forEach(imagem => {
            if(imagem.tipo == 'EXERCICIO') {
                this.carregarImagemExercicio(imagem.id);
            }
        });
    }

    carregarImagemExercicio(id: number) {
		this.imagemPalavra.pathImage = this.imagemService.getImagem(id);		
	}

	getImage() {
		if (this.imagemPalavra.pathImage != null ) {
			return this.imagemPalavra.pathImage;
		}
	}

    // case1() {
	// 	if (this.exercicioAtual != this.atividade1ExerNumberTotal) {
	// 		switch (this.atividade1ExerNumberTotal) {
	// 			case 1:
	// 				this.palavraList = ['no', 'Ri', 'te', 'ron', 'ce'];
	// 				this.palavra = 'Rinoceronte';
	// 				this.palavraSortList = ['no', 'Ri', 'te', 'ron', 'ce'];
	// 				this.palavraListValidation = ['Ri', 'no', 'ce', 'ron', 'te'];
	// 				this.palavraSortListSelected = ['RI', 'no', 'ce', 'ron', 'te'];
	// 				this.palavraListSize = this.palavraSortList.length;
	// 				break;
	// 			case 2:
	// 				this.palavraList = ['nho', 'se', 'De',];
	// 				this.palavra = 'Desenho';
	// 				this.palavraSortList = ['nho', 'se', 'De',];
	// 				this.palavraListValidation = ['De', 'se', 'nho'];
	// 				this.palavraSortListSelected = ['De', 'se', 'nho'];
	// 				this.palavraListSize = this.palavraSortList.length;
	// 				break;
	// 		}
	// 		this.exercicioAtual++;
	// 	} else {
	// 		this.palavraList = ['no', 'Ri', 'te', 'ron', 'ce'];
	// 		this.palavra = 'Rinoceronte';
	// 		this.palavraSortList = ['no', 'Ri', 'te', 'ron', 'ce'];
	// 		this.palavraListValidation = ['Ri', 'no', 'ce', 'ron', 'te'];
	// 		this.palavraSortListSelected = ['RI', 'no', 'ce', 'ron', 'te'];
	// 		this.palavraListSize = this.palavraSortList.length;
	// 		this.exercicioAtual = 1;
	// 		this.tipoAtividade = 2;
	// 		this.img1 = "../../../assets/atividades/atividade" + this.tipoAtividadeAtual + "exe" + this.exercicioAtual + "img1.jpg";
	// 		this.img2 = "../../../assets/atividades/atividade" + this.tipoAtividadeAtual + "exe" + this.exercicioAtual + "img2.jpg";
	// 		this.case2();
	// 	}
	// }

    //FIM


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


	// validarPalavraAtividade5(item: any) {
	// 	this.palavraSelected2List.forEach(x => {
	// 		if (x.id == item.id) {
	// 			x.acerto = true;
	// 			speechSynthesis.pause;
	// 			this.audioCard.play();
	// 			setTimeout(() => {
	// 				this.msg.text = item.nome;
	// 				this.audioAtividade.pause;
	// 				speechSynthesis.speak(this.msg);
	// 			}, 350);
	// 		}
	// 	});

	// 	this.palavraSelected2Shuffle.forEach(x => {
	// 		if (x.nome == item.nome) {
	// 			x.acerto = true;
	// 		}
	// 	});

	// 	if (this.palavraSelected2List.find(x => x.acerto == false)) {
	// 		return;
	// 	}
	// 	setTimeout(() => {
	// 		this.msg.text = this.palavra;
	// 		this.audioAtividade.pause;
	// 		speechSynthesis.speak(this.msg);
	// 	}, 500);

	// 	setTimeout(() => {
	// 		this.acertou = true;
	// 		this.acertouRemove = false;
	// 		speechSynthesis.pause;
	// 		this.audioAtividade.play();
	// 	}, 1000);
	// }


	


	// validarPalavraAtividade2(event: CdkDragDrop<string[]>) {
	// 	this.validaPalavra = event.previousContainer.data[event.previousIndex] == this.palavra;

	// 	if (this.validaPalavra) {
	// 		setTimeout(() => {
	// 			this.msg.text = this.palavra;
	// 			this.audioAtividade.pause;
	// 			speechSynthesis.speak(this.msg);
	// 		}, 500);

	// 		this.acertouAtividade2item1 = true;

	// 		transferArrayItem(
	// 			event.previousContainer.data,
	// 			event.container.data,
	// 			event.previousIndex,
	// 			event.currentIndex,
	// 		);
	// 		if (this.acertouAtividade2item2 == true) {
	// 			setTimeout(() => {
	// 				this.acertou = true;
	// 				this.acertouRemove = false;
	// 				this.audioAtividade.play();
	// 			}, 1200);

	// 		}
	// 	} else {
	// 		moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
	// 	}
	// }


	// validarPalavra2Atividade2(event: CdkDragDrop<string[]>) {
	// 	this.validaPalavra = event.previousContainer.data[event.previousIndex] == this.palavra2;

	// 	if (this.validaPalavra) {
	// 		this.acertouAtividade2item2 = true;
	// 		setTimeout(() => {
	// 			this.msg.text = this.palavra2;
	// 			this.audioAtividade.pause;
	// 			speechSynthesis.speak(this.msg);
	// 		}, 500);
	// 		transferArrayItem(
	// 			event.previousContainer.data,
	// 			event.container.data,
	// 			event.previousIndex,
	// 			event.currentIndex,
	// 		);
	// 		if (this.acertouAtividade2item1 == true) {
	// 			setTimeout(() => {
	// 				this.acertou = true;
	// 				this.acertouRemove = false;
	// 				this.audioAtividade.play();
	// 			}, 1000);

	// 		}
	// 	} else {
	// 		moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
	// 	}
	// }

	// validarPalavraAtividade3(event: CdkDragDrop<string[]>) {
	// 	this.validaPalavra = event.previousContainer.data[event.previousIndex] == this.palavra;

	// 	if (this.validaPalavra) {
	// 		this.acertouAtividade3 = true;
	// 		setTimeout(() => {
	// 			this.msg.text = this.palavra;
	// 			this.audioAtividade.pause;
	// 			speechSynthesis.speak(this.msg);
	// 		}, 500);
	// 		transferArrayItem(
	// 			event.previousContainer.data,
	// 			event.container.data,
	// 			event.previousIndex,
	// 			event.currentIndex,
	// 		);
	// 		setTimeout(() => {
	// 			this.acertou = true;
	// 			this.acertouRemove = false;
	// 			this.audioAtividade.play();
	// 		}, 1000);

	// 	} else {
	// 		moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
	// 	}
	// }


	// validarPalavraAtividade4(event: CdkDragDrop<string[]>) {
	// 	this.validaPalavra = event.previousContainer.data[event.previousIndex] == this.palavra2;
	// 	setTimeout(() => {
	// 		this.msg.text = this.palavra2;
	// 		this.audioAtividade.pause;
	// 		speechSynthesis.speak(this.msg);
	// 	}, 500);

	// 	if (this.validaPalavra) {
	// 		this.acertouAtividade2item2 = true;
	// 		transferArrayItem(
	// 			event.previousContainer.data,
	// 			event.container.data,
	// 			event.previousIndex,
	// 			event.currentIndex,
	// 		);
	// 	} else {
	// 		moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
	// 	}
	// }


	// //APENAS PARA APRESENTAÇÃO
	// //
	// //
	// //
	// //
	// //
	// //
	// //

	// public atividade1ExerNumberTotal: number = 2;
	// public atividade2ExerNumberTotal: number = 6;
	// public atividade3ExerNumberTotal: number = 4;
	// public atividade4ExerNumberTotal: number = 1;
	// public exercicioAtual: number = 1;
	// public img1: String = "../../../assets/atividades/atividade" + this.tipoAtividadeAtual + "exe" + 1 + "img1.jpg";
	

	resetGeneric() {
		// this.palavraSelected = [];
		// this.palavra2Selected = [];
		this.acertouAtividade1 = false;
		// this.acertouAtividade2item1 = false;
		// this.acertouAtividade2item2 = false;
		// this.acertouAtividade3 = false;
		this.acertou = false;
		this.acertouRemove = true;
	}

	
	// case2() {
	// 	if (this.exercicioAtual != this.atividade2ExerNumberTotal) {
	// 		this.img1 = "../../../assets/atividades/atividade" + this.tipoAtividadeAtual + "exe" + this.exercicioAtual + "img1.jpg";
	// 		this.img2 = "../../../assets/atividades/atividade" + this.tipoAtividadeAtual + "exe" + this.exercicioAtual + "img2.jpg";
	// 		switch (this.exercicioAtual) {
	// 			case 1:
	// 				this.resetGeneric();
	// 				this.palavra = 'Rinoceronte';
	// 				this.palavra2 = 'Arara';
	// 				this.palavrasToSelec = ['Arara', 'Morcego', 'Rinoceronte', 'Aranha'];
	// 				break;
	// 			case 2:
	// 				this.resetGeneric();
	// 				this.palavra = 'Árvore';
	// 				this.palavra2 = 'Folha';
	// 				this.palavrasToSelec = ['Árvore', 'Galho', 'Terra', 'Folha'];
	// 				break;
	// 			case 3:
	// 				this.resetGeneric();
	// 				this.palavra = 'Bola';
	// 				this.palavra2 = 'Dado';
	// 				this.palavrasToSelec = ['Caneta', 'Dado', 'Bola', 'Sol'];
	// 				break;
	// 			case 4:
	// 				this.resetGeneric();
	// 				this.palavra = 'Boneca';
	// 				this.palavra2 = 'Herói';
	// 				this.palavrasToSelec = ['Lápis', 'Carro', 'Herói', 'Boneca'];
	// 				break;
	// 			case 5:
	// 				this.resetGeneric();
	// 				this.palavra = 'Cachorro';
	// 				this.palavra2 = 'Gato';
	// 				this.palavrasToSelec = ['Cachorro', 'Arara', 'Gato', 'Peixe'];
	// 				break;
	// 			case 6:
	// 				this.resetGeneric();
	// 				this.palavra = 'Caderno';
	// 				this.palavra2 = 'Lápis';
	// 				this.palavrasToSelec = ['Lápis', 'Borracha', 'Caderno', 'Dado'];
	// 				break;
	// 		}
	// 		this.exercicioAtual++;
	// 	} else {
	// 		this.tipoAtividadeAtual = 2;
	// 		this.tipoAtividade = 3;
	// 		this.exercicioAtual = 1;
	// 		this.case3();
	// 	}
	// }
	// case3() {
	// 	if (this.exercicioAtual != this.atividade3ExerNumberTotal) {
	// 		this.tipoAtividadeAtual = 2;
	// 		this.img1 = "../../../assets/atividades/atividade" + this.tipoAtividadeAtual + "exe" + this.exercicioAtual + "img1.jpg";
	// 		switch (this.exercicioAtual) {
	// 			case 1:
	// 				this.resetGeneric();
	// 				this.palavra = 'Carro';
	// 				this.palavrasToSelec = ['Carro', 'Borracha', 'Caderno', 'Dado'];
	// 				break;
	// 			case 2:
	// 				this.resetGeneric();
	// 				this.palavra = 'Linha';
	// 				this.palavrasToSelec = ['Lápis', 'Linha', 'Caderno', 'Dado'];
	// 				break;
	// 			case 3:
	// 				this.resetGeneric();
	// 				this.palavra = 'Ônibus';
	// 				this.palavrasToSelec = ['Lápis', 'Borracha', 'Caderno', 'Ônibus'];
	// 				break;
	// 			case 4:
	// 				this.resetGeneric();
	// 				this.palavra = 'Pipa';
	// 				this.palavrasToSelec = ['Ônibus', 'Borracha', 'Pipa', 'Dado'];
	// 				break;
	// 		}
	// 		this.exercicioAtual++;
	// 	} else {
	// 		this.tipoAtividade = 4;
	// 		this.exercicioAtual = 1;
	// 		this.palavra = 'Rinoceronte';
	// 		this.palavrasToSelec2 = ['Ri', 'no', 'ce', 'ron', 'te'];
	// 	}
	// }
	// case4() {
	// 	if (this.exercicioAtual != this.atividade4ExerNumberTotal) {
	// 		switch (this.exercicioAtual) {
	// 			case 1:
	// 				this.resetGeneric();
	// 				this.palavra = 'Rinoceronte';
	// 				this.palavrasToSelec2 = ['Ri', 'no', 'ce', 'ron', 'te'];
	// 				this.palavraSelected2List = [];
	// 				break;
	// 		}
	// 		this.exercicioAtual++;
	// 	} else {
	// 		this.tipoAtividade = 0;
	// 		window.location.reload();
	// 	}
	// }

	irVoltar() {

		this.resetGeneric();

		switch (this.tipoAtividade) {
			case 1:
				// this.case1();
				break;
			case 2:
				// this.case2();
				break;
			case 3:
				// this.case3();
				break;
			case 4:
				// this.case4();
				break;

		}
		this.router.navigateByUrl('/pageLogin');
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
}