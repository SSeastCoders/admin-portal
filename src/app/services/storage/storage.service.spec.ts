import { StorageService } from './storage.service';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '../http/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('StorageService', () => {
  let service: StorageService;
  let mockHttp: jasmine.SpyObj<HttpService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService, StorageService],
    });
    service = TestBed.inject(StorageService);
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });

  it('should store the item in localStorage', () => {
    service.setLocalObject('somekey', 'sometoken');
    expect(localStorage.getItem('somekey')).toEqual('sometoken');
  });
});

/* import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';


describe('StorageService', () => {
  let injector: TestBed;
  let service: StorageService;
  let httpMock: HttpTestingController;
  let HttpResponseMock: HttpResponse<any> = {
    body: null,
    type: null,
    clone:null,
    status: 200,
    statusText: null,
    url: null,
    ok: true,
    headers: new HttpHeaders({ 'authorization': 'bearer token' })
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(StorageService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });


  it('should call login endpoint', () => {
    service.getResponseHeaders(new LoginUserClass('', ''))
    .subscribe((res: HttpResponse<any>) => {
      expect(res.headers.get('authorization')).toEqual('bearer token');
  });

    const req = httpMock.expectOne(apiUrl + '/login');
    expect(req.request.method).toBe("POST");
    req.flush({}, HttpResponseMock);
  });

  it('should call logout endpoint', () => {
    service.logout().subscribe(() => {});

    const req = httpMock.expectOne(apiUrl + '/logout');
    expect(req.request.method).toBe("GET");
    req.flush("");
  });

}); */
