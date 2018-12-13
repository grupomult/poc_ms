import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoVagao } from 'app/shared/model/tipo-vagao.model';
import { Principal } from 'app/core';
import { TipoVagaoService } from './tipo-vagao.service';

@Component({
    selector: 'jhi-tipo-vagao',
    templateUrl: './tipo-vagao.component.html'
})
export class TipoVagaoComponent implements OnInit, OnDestroy {
    tipoVagaos: ITipoVagao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoVagaoService: TipoVagaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.tipoVagaoService.query().subscribe(
            (res: HttpResponse<ITipoVagao[]>) => {
                this.tipoVagaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoVagaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITipoVagao) {
        return item.id;
    }

    registerChangeInTipoVagaos() {
        this.eventSubscriber = this.eventManager.subscribe('tipoVagaoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
