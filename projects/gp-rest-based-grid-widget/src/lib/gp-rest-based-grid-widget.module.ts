/**
 * Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import {CoreModule, HOOK_COMPONENTS} from '@c8y/ngx-components';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { GpRestBasedGridWidgetComponent } from './gp-rest-based-grid-widget.component';
import { GpRestBasedGridWidgetService } from './gp-rest-based-grid-widget.service';
import { GpRestBasedGridWidgetConfigComponent } from './gp-rest-based-grid-widget-config/gp-rest-based-grid-widget-config.component';
import * as preview from './preview-image';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [GpRestBasedGridWidgetComponent, GpRestBasedGridWidgetConfigComponent],
  imports: [
    MatTableModule,
    MatSortModule,
    CoreModule,
    PaginationModule.forRoot()
  ],
  exports: [GpRestBasedGridWidgetComponent, GpRestBasedGridWidgetConfigComponent],
  entryComponents: [GpRestBasedGridWidgetComponent, GpRestBasedGridWidgetConfigComponent],
  providers: [
    GpRestBasedGridWidgetService,
    {
    provide: HOOK_COMPONENTS,
    multi: true,
    useValue: {
        id: 'rest-based-grid.widget',
        label: 'Rest Based Grid',
        previewImage: preview.previewImage,
        description: 'Rest Based Grid - Displays Document Lists from REST API as grids',
        component: GpRestBasedGridWidgetComponent,
        configComponent: GpRestBasedGridWidgetConfigComponent,
        data: {
            ng1: {
                options: {
                noDeviceTarget: false,
                noNewWidgets: false,
                deviceTargetNotRequired: true,
                groupsSelectable: true
                }
            }
        }
    }
    }],
})
export class GpRestBasedGridWidgetModule { }
