import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVagao } from 'app/shared/model/vagao.model';

@Component({
    selector: 'jhi-vagao-detail',
    templateUrl: './vagao-detail.component.html'
})
export class VagaoDetailComponent implements OnInit {
    vagao: IVagao;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vagao }) => {
            this.vagao = vagao;
        });
    }

    previousState() {
        window.history.back();
    }
}
