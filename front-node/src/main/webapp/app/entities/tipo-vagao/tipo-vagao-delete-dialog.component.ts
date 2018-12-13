import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoVagao } from 'app/shared/model/tipo-vagao.model';
import { TipoVagaoService } from './tipo-vagao.service';

@Component({
    selector: 'jhi-tipo-vagao-delete-dialog',
    templateUrl: './tipo-vagao-delete-dialog.component.html'
})
export class TipoVagaoDeleteDialogComponent {
    tipoVagao: ITipoVagao;

    constructor(private tipoVagaoService: TipoVagaoService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoVagaoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tipoVagaoListModification',
                content: 'Deleted an tipoVagao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-vagao-delete-popup',
    template: ''
})
export class TipoVagaoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoVagao }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TipoVagaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.tipoVagao = tipoVagao;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
