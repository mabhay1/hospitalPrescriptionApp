import { TestBed } from '@angular/core/testing';
import { MedicineMasterService } from './medicine-master-service';

describe('MedicineMasterService', () => {
  let service: MedicineMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
