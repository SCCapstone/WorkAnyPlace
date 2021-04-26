// Tests for successful job posting locally

import { postJob, getPosts } from "./postJob";

fdescribe('postJob', () => {
   fit('should add job to posts array', () => {
        let job = {
            "title":"car wash",
            "pay":10.00,
            "category":"labor",
            "description":"thanks"
        }
        postJob("car wash", 10.00, "labor", "thanks");
        expect(getPosts()).toContain(job);
    });
});