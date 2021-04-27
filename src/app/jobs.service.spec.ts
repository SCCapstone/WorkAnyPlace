import { TestBed } from '@angular/core/testing';
import firebase from 'firebase/app';
import { JobsService } from './jobs.service';

describe('JobsService', () => {
  let service: JobsService;

  beforeEach(() => {
    //TestBed.configureTestingModule({});
    //service = TestBed.inject(JobsService);
    //service = new JobsService();
  });

  // fit('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('Should return real value', () => {
    expect(service.getPosts()).toBe('real value');
  });
});
