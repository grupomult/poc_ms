import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FrontSharedModule } from 'app/shared';
import {
    VagaoComponent,
    VagaoDetailComponent,
    VagaoUpdateComponent,
    VagaoDeletePopupComponent,
    VagaoDeleteDialogComponent,
    vagaoRoute,
    vagaoPopupRoute
} from './';

const ENTITY_STATES = [...vagaoRoute, ...vagaoPopupRoute];

@NgModule({
    imports: [FrontSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [VagaoComponent, VagaoDetailComponent, VagaoUpdateComponent, VagaoDeleteDialogComponent, VagaoDeletePopupComponent],
    entryComponents: [VagaoComponent, VagaoUpdateComponent, VagaoDeleteDialogComponent, VagaoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontVagaoModule {}
