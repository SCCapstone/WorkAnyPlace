import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostedJobDetailPage } from './posted-job-detail.page';

describe('PostedJobDetailPage', () => {
  let component: PostedJobDetailPage;
  let fixture: ComponentFixture<PostedJobDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostedJobDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostedJobDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
