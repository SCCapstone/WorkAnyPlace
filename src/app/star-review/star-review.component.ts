import { Component, OnInit, Input } from '@angular/core';
import { StarService } from '../star.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss'],
})
export class StarReviewComponent implements OnInit {

  @Input() raterID;
  @Input() userID;

  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(private starService: StarService) { }

  ngOnInit() {
    this.stars = this.starService.getUserStars(this.userID)

   // this.avgRating = this.stars.map(arr => {
   //   const ratings = arr.map(v => v.value)
   //   return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
   // })
  }

  starHandler(value) {
    this.starService.setStar(this.raterID, this.userID, value)
  }

}
