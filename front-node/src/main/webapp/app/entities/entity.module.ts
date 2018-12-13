import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FrontTipoVagaoModule } from './tipo-vagao/tipo-vagao.module';
import { FrontVagaoModule } from './vagao/vagao.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        FrontTipoVagaoModule,
        FrontVagaoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontEntityModule {}
