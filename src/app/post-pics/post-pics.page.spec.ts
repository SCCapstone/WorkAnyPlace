import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostPicsPage } from './post-pics.page';

describe('PostPicsPage', () => {
  let component: PostPicsPage;
  let fixture: ComponentFixture<PostPicsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPicsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostPicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
