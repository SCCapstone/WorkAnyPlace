import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor() {

   }

   posts:Array<any>=[{"title":"Lawn Care","pay":7.99,"category":"Yard Work", "description":"I need help cutting my grass."}];


   postJob(title,pay,category,description){
    this.posts.push({
      'title': title,
      'pay': pay,
      'Category': category,
      'description': description
    }); 
  }
} 
