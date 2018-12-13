import { NgModule } from '@angular/core';

import { FrontSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [FrontSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [FrontSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class FrontSharedCommonModule {}
