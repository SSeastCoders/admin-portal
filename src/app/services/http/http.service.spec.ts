import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/services/http/http.service';


describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers: [HttpClientTestingModule, HttpService],
      declarations: [],
    })
    .compileComponents();

    service = TestBed.get(HttpService);
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
