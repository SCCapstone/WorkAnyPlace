import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor() {

   }

   posts:Array<any>=[{"title":"Lawn Care","pay":7.99,"category":"Yard Work", "description":"I need help cutting my grass."},{"title":"Dog Sitting","pay":50.00,"category":"Pet Sitting", "description":"I need someone to takeout my Dog twice a day on Monday"}];
   // posts:Array<any>=[{"title":"Dog Sitting","pay":50.00,"category":"Pet Sitting", "description":"I need someone to takeout my Dog twice a day on Monday"}];


   postJob(title,pay,category,description){
    this.posts.push({
      'title': title,
      'pay': pay,
      'Category': category,
      'description': description
    }); 
  }

  removeJob(title,pay,category,description){
    const job = {
      'title': title,
      'pay' : pay,
      'Category': category,
      'description': description
    };
    this.posts.forEach((element,index)=> {
      if(element.title==job.title) this.posts.splice(index,1);
    });
    this.posts.forEach(object => console.log(object.title));
  }
} 
