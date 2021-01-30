let posts = [{"title":"Lawn Care","pay":7.99,"category":"Yard Work", "description":"I need help cutting my grass."},{"title":"JOB 2","pay":7.20,"category":"Yard Work", "description":"I need help cutting my grass."}];
export function postJob(title,pay,category,description){
    posts.push({
      'title': title,
      'pay': pay,
      'category': category,
      'description': description
    }); 
  }

export function getPosts() {
    return posts;
}