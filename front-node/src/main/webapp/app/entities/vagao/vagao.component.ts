import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVagao } from 'app/shared/model/vagao.model';
import { Principal } from 'app/core';
import { VagaoService } from './vagao.service';

@Component({
    selector: 'jhi-vagao',
    templateUrl: './vagao.component.html'
})
export class VagaoComponent implements OnInit, OnDestroy {
    vagaos: IVagao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private vagaoService: VagaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.vagaoService.query().subscribe(
            (res: HttpResponse<IVagao[]>) => {
                this.vagaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVagaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVagao) {
        return item.id;
    }

    registerChangeInVagaos() {
        this.eventSubscriber = this.eventManager.subscribe('vagaoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
