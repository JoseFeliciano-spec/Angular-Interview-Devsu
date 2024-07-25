import { TestBed } from '@angular/core/testing';

import { ActionPopperService } from './action-popper.service';

describe('ActionPopperService', () => {
  let service: ActionPopperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionPopperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
