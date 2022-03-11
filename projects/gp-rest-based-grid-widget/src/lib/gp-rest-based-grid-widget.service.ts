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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryService, IdentityService } from '@c8y/client';

@Injectable()
export class GpRestBasedGridWidgetService {

  restItems: any;
  response: any;
  deviceExternalId: any;

constructor(private http: HttpClient,
            public inventory: InventoryService,
            public identity: IdentityService) { }

async getRestItems(url): Promise<any>  {

this.restItems = await this.http.get(url).toPromise();

return this.restItems;

}

async getExternalIdForDevice(config) {

  const inventory = await this.inventory.detail(config.device.id);
  this.response = inventory.data;

  // Check that the response is a Group and not a device
  if (this.response.hasOwnProperty('c8y_IsDevice') || this.response.hasOwnProperty('c8y_IsAsset')) {
    // Get External Id
    this.deviceExternalId = await this.getExternalId(config.device.id);

  }
  else {
    alert('Please select a device for this widget to fuction correctly');
  }
  return this.deviceExternalId;
}

async getExternalId(id) {

const { data, res, paging } = await this.identity.list(id);

return data[0].externalId;

}
}
