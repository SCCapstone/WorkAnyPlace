import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatedJobsPage } from './created-jobs.page';

describe('CreatedJobsPage', () => {
  let component: CreatedJobsPage;
  let fixture: ComponentFixture<CreatedJobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedJobsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatedJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
