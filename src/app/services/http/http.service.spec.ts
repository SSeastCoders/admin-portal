import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/services/http/http.service';


describe('HttpService', () => {
  let service: HttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers: [HttpClientTestingModule],
      declarations: [],
    })
    .compileComponents();

    service = TestBed.get(HttpService);
  });

  beforeEach(() => {
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
