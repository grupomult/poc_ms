import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Vagao } from 'app/shared/model/vagao.model';
import { VagaoService } from './vagao.service';
import { VagaoComponent } from './vagao.component';
import { VagaoDetailComponent } from './vagao-detail.component';
import { VagaoUpdateComponent } from './vagao-update.component';
import { VagaoDeletePopupComponent } from './vagao-delete-dialog.component';
import { IVagao } from 'app/shared/model/vagao.model';

@Injectable({ providedIn: 'root' })
export class VagaoResolve implements Resolve<IVagao> {
    constructor(private service: VagaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vagao> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Vagao>) => response.ok),
                map((vagao: HttpResponse<Vagao>) => vagao.body)
            );
        }
        return of(new Vagao());
    }
}

export const vagaoRoute: Routes = [
    {
        path: 'vagao',
        component: VagaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vagaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vagao/:id/view',
        component: VagaoDetailComponent,
        resolve: {
            vagao: VagaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vagaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vagao/new',
        component: VagaoUpdateComponent,
        resolve: {
            vagao: VagaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vagaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vagao/:id/edit',
        component: VagaoUpdateComponent,
        resolve: {
            vagao: VagaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vagaos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vagaoPopupRoute: Routes = [
    {
        path: 'vagao/:id/delete',
        component: VagaoDeletePopupComponent,
        resolve: {
            vagao: VagaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vagaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
