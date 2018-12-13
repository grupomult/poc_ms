import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoVagao } from 'app/shared/model/tipo-vagao.model';
import { TipoVagaoService } from './tipo-vagao.service';
import { TipoVagaoComponent } from './tipo-vagao.component';
import { TipoVagaoDetailComponent } from './tipo-vagao-detail.component';
import { TipoVagaoUpdateComponent } from './tipo-vagao-update.component';
import { TipoVagaoDeletePopupComponent } from './tipo-vagao-delete-dialog.component';
import { ITipoVagao } from 'app/shared/model/tipo-vagao.model';

@Injectable({ providedIn: 'root' })
export class TipoVagaoResolve implements Resolve<ITipoVagao> {
    constructor(private service: TipoVagaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TipoVagao> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TipoVagao>) => response.ok),
                map((tipoVagao: HttpResponse<TipoVagao>) => tipoVagao.body)
            );
        }
        return of(new TipoVagao());
    }
}

export const tipoVagaoRoute: Routes = [
    {
        path: 'tipo-vagao',
        component: TipoVagaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoVagaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-vagao/:id/view',
        component: TipoVagaoDetailComponent,
        resolve: {
            tipoVagao: TipoVagaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoVagaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-vagao/new',
        component: TipoVagaoUpdateComponent,
        resolve: {
            tipoVagao: TipoVagaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoVagaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-vagao/:id/edit',
        component: TipoVagaoUpdateComponent,
        resolve: {
            tipoVagao: TipoVagaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoVagaos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoVagaoPopupRoute: Routes = [
    {
        path: 'tipo-vagao/:id/delete',
        component: TipoVagaoDeletePopupComponent,
        resolve: {
            tipoVagao: TipoVagaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoVagaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
