import { StorageService } from "./storage.service";
import { TestBed } from '@angular/core/testing';
import { HttpService } from "../http/http.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('StorageService', () => {
  let service: StorageService;
  let mockHttp: jasmine.SpyObj<HttpService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService, StorageService,]
    });
    service = TestBed.get(StorageService);
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
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });

  describe('setLocalObject', () => {
    it('should store the item in localStorage',
      () => {
        service.setLocalObject('somekey','sometoken');
        expect(localStorage.getItem('somekey')).toEqual('sometoken');
    });
  });

});
