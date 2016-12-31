import events = require('events');

interface FeathersApp {
  // Authentication.
  authenticate(options: any) :Promise<any>;
  logout(): void;
  get(type: string): any;

  // Services.
  service(name: string): FeathersService;

  configure(fn: () => void): FeathersApp;
}

interface FeathersService extends events.EventEmitter {
  // REST interface.
  find(params?: any): Promise<any>;
  get(id: string, params?: any): Promise<any>;
  create(data: any, params?: any): Promise<any>;
  update(id: string, data: any, params?:any): Promise<any>;
  patch(id: string, data: any, params?:any) : Promise<any>;
  remove(id: string, params?: any): Promise<any>;

  // Realtime interface.
  on(eventType: string, callback: (data: any) => void);
  timeout?: number;
}
