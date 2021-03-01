import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompletedJobsPage } from './completed-jobs.page';

describe('CompletedJobsPage', () => {
  let component: CompletedJobsPage;
  let fixture: ComponentFixture<CompletedJobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedJobsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
