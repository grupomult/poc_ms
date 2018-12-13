import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITipoVagao } from 'app/shared/model/tipo-vagao.model';
import { TipoVagaoService } from './tipo-vagao.service';

@Component({
    selector: 'jhi-tipo-vagao-update',
    templateUrl: './tipo-vagao-update.component.html'
})
export class TipoVagaoUpdateComponent implements OnInit {
    tipoVagao: ITipoVagao;
    isSaving: boolean;

    constructor(private tipoVagaoService: TipoVagaoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoVagao }) => {
            this.tipoVagao = tipoVagao;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoVagao.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoVagaoService.update(this.tipoVagao));
        } else {
            this.subscribeToSaveResponse(this.tipoVagaoService.create(this.tipoVagao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITipoVagao>>) {
        result.subscribe((res: HttpResponse<ITipoVagao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
