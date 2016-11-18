/// <reference path="typings/index.d.ts" />

import events = require('events');

export class FeathersApp {
  // Authentication.
  authenticate(options: any) :Promise<any>;
  logout(): void;
  get(type: string): any;

  // Services.
  service(name: string): FeathersService;
}

export class FeathersService extends events.EventEmitter {
  find(params?: any): Promise<any>;
  create(data: any, params?: any): Promise<any>;
  update(id: string, data: any, params?:any): Promise<any>;
  patch(id: string, data: any, params?:any) : Promise<any>;
  remove(id: string, params?: any): Promise<any>;
}
