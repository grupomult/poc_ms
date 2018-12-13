import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontSharedModule } from 'app/shared';
import {
    TipoVagaoComponent,
    TipoVagaoDetailComponent,
    TipoVagaoUpdateComponent,
    TipoVagaoDeletePopupComponent,
    TipoVagaoDeleteDialogComponent,
    tipoVagaoRoute,
    tipoVagaoPopupRoute
} from './';

const ENTITY_STATES = [...tipoVagaoRoute, ...tipoVagaoPopupRoute];

@NgModule({
    imports: [FrontSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoVagaoComponent,
        TipoVagaoDetailComponent,
        TipoVagaoUpdateComponent,
        TipoVagaoDeleteDialogComponent,
        TipoVagaoDeletePopupComponent
    ],
    entryComponents: [TipoVagaoComponent, TipoVagaoUpdateComponent, TipoVagaoDeleteDialogComponent, TipoVagaoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontTipoVagaoModule {}
