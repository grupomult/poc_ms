import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IVagao } from 'app/shared/model/vagao.model';
import { VagaoService } from './vagao.service';
import { ITipoVagao } from 'app/shared/model/tipo-vagao.model';
import { TipoVagaoService } from 'app/entities/tipo-vagao';

@Component({
    selector: 'jhi-vagao-update',
    templateUrl: './vagao-update.component.html'
})
export class VagaoUpdateComponent implements OnInit {
    vagao: IVagao;
    isSaving: boolean;

    tipovagaos: ITipoVagao[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private vagaoService: VagaoService,
        private tipoVagaoService: TipoVagaoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vagao }) => {
            this.vagao = vagao;
        });
        this.tipoVagaoService.query().subscribe(
            (res: HttpResponse<ITipoVagao[]>) => {
                this.tipovagaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.vagao.id !== undefined) {
            this.subscribeToSaveResponse(this.vagaoService.update(this.vagao));
        } else {
            this.subscribeToSaveResponse(this.vagaoService.create(this.vagao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVagao>>) {
        result.subscribe((res: HttpResponse<IVagao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTipoVagaoById(index: number, item: ITipoVagao) {
        return item.id;
    }
}
