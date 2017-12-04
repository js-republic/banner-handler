import {TestBed, async, inject} from '@angular/core/testing';

import {AuthGard} from './auth.guard';

describe('AuthGard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGard]
    });
  });

  it('should ...', inject([AuthGard], (guard: AuthGard) => {
    expect(guard).toBeTruthy();
  }));
});
