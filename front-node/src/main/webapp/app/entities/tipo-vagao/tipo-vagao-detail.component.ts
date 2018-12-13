import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoVagao } from 'app/shared/model/tipo-vagao.model';

@Component({
    selector: 'jhi-tipo-vagao-detail',
    templateUrl: './tipo-vagao-detail.component.html'
})
export class TipoVagaoDetailComponent implements OnInit {
    tipoVagao: ITipoVagao;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoVagao }) => {
            this.tipoVagao = tipoVagao;
        });
    }

    previousState() {
        window.history.back();
    }
}
