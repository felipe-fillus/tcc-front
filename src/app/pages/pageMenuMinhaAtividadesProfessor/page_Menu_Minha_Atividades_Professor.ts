import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { Versao } from '../../enum/versao.enum';
import { AtividadeService } from '../../providers/service/ativdade.service';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';
import { ModalAtribuirAtividade } from '../modalAtribuirAtividade/modal_atribuir_atividade';
import { Atividade } from './../../model/atividade.model';

@Component({
  selector: 'page_Menu_Minha_Atividades_Professor',
  templateUrl: 'page_Menu_Minha_Atividades_Professor.html',
  styleUrls: ['./page_Menu_Minha_Atividades_Professor.scss']
})
export class Page_Menu_Minha_Atividades_Professor implements AfterViewInit, ViewDidLeave {
  public $subscriptions: Subscription[] = [];
  versao = Versao.numero;
  user: any;
  atividades: Atividade[];

  constructor(
    public router: Router,
    public authBaseService: AuthBaseService,
    private fb: FormBuilder,
    private atividadeService: AtividadeService,
    private modalCtrl: ModalController,) {}
  

    formFilter = this.fb.group({
      nomeAtividade: [''],
      tipoLetra: [true],
      tipoSilaba: [true],
      tipoImagem: [true],
      idProfessor: [null, Validators.required]
    });

  ngAfterViewInit() {
    const user = this.authBaseService.watchLoggedUser().subscribe((res) => {
			
			if (res.user) {
				this.user = res.user;
				this.formFilter.get('idProfessor').setValue(this.user.id);
        this.filtrarAtividade();
        
			}

		});
    this.$subscriptions.push(user);
  }

  filtrarAtividade() {
    const atividade = this.atividadeService.add(this.formFilter.value, 'buscar').subscribe((res : Atividade[]) => {
      if(res != null) {
        this.atividades = res;
      }
    });
    this.$subscriptions.push(atividade);
  }

  deletarAtividade(index : number) {
    this.atividadeService.deletar(this.atividades[index].id).subscribe((res) => {
      if(res) {
        this.filtrarAtividade();
      }
    });
  }

  irAtividade(index : number) {
    const idAtividade = this.atividades[index].id;
    // this.router.navigateByUrl('/pageEditarAtividadeProfessor/' + idAtividade);
    this.router.navigate(['/pageEditarAtividadeProfessor/' + idAtividade]);
    this.ionViewDidLeave();
  }

  irVoltar() {
    // this.router.navigateByUrl('/pageMenuAtividadesProfessor');
    this.router.navigate(['/pageMenuAtividadesProfessor']);
    this.ionViewDidLeave();
  }

  ionViewDidLeave(): void {
    for (let sub of this.$subscriptions)
      sub.unsubscribe();
  }

  async modal(index : number) {
    let idAtividade = this.atividades[index].id;
		const modal = await this.modalCtrl.create({
			component: ModalAtribuirAtividade,
			componentProps: {idAtividade: idAtividade, idProfessor: this.user.id},
		});
		await modal.present();

		await modal.onWillDismiss();
	}
}
