import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageUploadPage } from './image-upload.page';

describe('ImageUploadPage', () => {
  let component: ImageUploadPage;
  let fixture: ComponentFixture<ImageUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
