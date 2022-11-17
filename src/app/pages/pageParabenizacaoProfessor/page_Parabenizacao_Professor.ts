import { Versao } from './../../enum/versao.enum';
import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { FormBuilder } from '@angular/forms';
import { AlunoService } from '../../providers/service/aluno.service';
import { HttpResponse } from '@angular/common/http';
import { ImagemService } from '../../providers/service/iamgem.service';

@Component({
	selector: 'page_Parabenizacao_Professor',
	templateUrl: 'page_Parabenizacao_Professor.html',
	styleUrls: ['./page_Parabenizacao_Professor.scss']
})
export class Page_Parabenizacao_Professor implements AfterViewInit {
	@ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
	versao = Versao.numero;
	user: any;
	idAluno: any;
	aluno: any;
	converted_image: any;
	imagePreview: { pathImage: string, fileType: string, base64: string, base64WithHeader: string } = {pathImage: null, fileType: '', base64: '', base64WithHeader: '' };
	imageUploaded = false;
	imageLoaded = false;
	image : any;

	imagemForm = this.fb.group({
		id: [null],
		idAluno: [null],
		nomeParabenizacao: [null],
		parabenizacao: [null]
	});


	constructor(
		@Inject(DOCUMENT) private doc: Document,
		public confData: ConferenceData,
		public router: Router,
		private activeRoute: ActivatedRoute,
		public platform: Platform,
		private alunoService: AlunoService,
		private fb: FormBuilder,
		private imagemService: ImagemService,
		public authBaseService: AuthBaseService) { }

	async ngAfterViewInit() {
		this.idAluno = this.activeRoute.snapshot.params['id'];
		if (this.idAluno != null) {
			this.buscarAluno(this.idAluno);
			this.imagemForm.get('idAluno').setValue(this.idAluno);
		}

		this.authBaseService.watchLoggedUser().subscribe((res) => {

			if (res.user) {
				this.user = res.user;
			}

		});
		const appEl = this.doc.querySelector('ion-app');
	}

	irVoltar() {
		this.router.navigate(['/pageMeuAlunoProfessor/' + this.idAluno]);
	}

	openFileDialogParabenizacao() {
		(document as any).getElementById("file-upload-parabenizacao").click();
	}

	setParabenizacao(event: any) {
		let f = event.target.files[0];
		const reader = new FileReader();

		reader.readAsDataURL(f);
		reader.onload = () => {
			this.converted_image = reader.result.toString();
			this.imagemForm.get('parabenizacao').setValue(this.clearImgHeader(reader.result.toString()));
			this.imagemForm.get('nomeParabenizacao').setValue(f.name);
			this.imageLoaded = false;
			this.imageUploaded = true;
		}
		console.log(this.converted_image)
	}

	clearImgHeader(imgStringBase64: string | ArrayBuffer) {
		let base64 = '';
		if (imgStringBase64.toString()) {
			base64 = imgStringBase64.toString().split(',')[1];

		}

		return base64;
	}

	buscarAluno(id: number) {
		this.alunoService.getById(this.idAluno).subscribe(res => {
			if (res) {
				this.aluno = res;
				if (this.aluno.imagensExerciciosDTO != null) {
					this.carregarParabenizacao(this.aluno.imagensExerciciosDTO.id);
				}
			}
		});
	}

	salvarParabenizacao() {
		const file = this.getFile(this.imagemForm.get('parabenizacao').value, this.imagemForm.get('nomeParabenizacao').value);
		this.alunoService.uploadFiles(this.idAluno, file, 'salvar-parabenizacao').subscribe((res: any) => {
			this.irVoltar();
		});
	}

	carregarParabenizacao(id: number) {
		this.imagePreview.pathImage = this.imagemService.getImagem(id);

		if (this.imagePreview.pathImage != null ) {
			this.imageLoaded = true;
		}
	}

	getImage() {
		if (this.imagePreview.pathImage != null ) {
			return this.imagePreview.pathImage;
		}
	}

	getFile(base64, imgName): any {
		const imgBlob = this.dataURItoBlob(base64);
		return new File([imgBlob], imgName, { type: "image/png" });
	}

	dataURItoBlob(dataURI) {
		const byteString = window.atob(dataURI);
		const arrayBuffer = new ArrayBuffer(byteString.length);
		const int8Array = new Uint8Array(arrayBuffer);
		for (let i = 0; i < byteString.length; i++) {
			int8Array[i] = byteString.charCodeAt(i);
		}
		const blob = new Blob([int8Array], { type: "image/png" });
		return blob;
	}

	getBlobFileName(response: HttpResponse<Blob>) {
		let filename: string;

		try {
			const contentDisposition: string = response.headers.get('Content-Disposition');

			filename = contentDisposition.split(';')[1].trim().split('=')[1].replace(/"/g, '');
		}
		catch (e) {
			filename = 'arquivo';
		}

		return filename;
	}
}
function callback(base64: any) {
	throw new Error('Function not implemented.');
}

