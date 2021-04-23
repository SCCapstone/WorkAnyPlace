import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateJobPage } from './create-job.page';

describe('CreateJobPage', () => {
  let component: CreateJobPage;
  let fixture: ComponentFixture<CreateJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateJobPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
