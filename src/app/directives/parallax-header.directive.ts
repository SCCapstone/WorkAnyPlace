import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appParallaxHeader]'
})
export class ParallaxHeaderDirective {

  header: any;
  headerHeifht: number;
  moveImage: number;
  scaleImage: number;

  constructor(public element:ElementRef, public renderer: Renderer2, private domCtrl:DomController) { }

  ngOnInit() {
    let content = this.element.nativeElement;
    this.header = content.getElementsByClassName('parallax-image')[0];
    this.domCtrl.read(() => {

    });
  }
}
