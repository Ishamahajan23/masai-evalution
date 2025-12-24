//  Q2: Multi-level Filtering (10 mins)
// Filter users who have completed at least 2 courses with a rating above 4.0.

const users = [
  {
    id: 1,
    name: 'Alice',
    courses: [
      { title: 'React', rating: 4.5, completed: true },
      { title: 'Node', rating: 3.8, completed: true },
      { title: 'CSS', rating: 4.2, completed: true }
    ]
  },
  {
    id: 2,
    name: 'Bob',
    courses: [
      { title: 'React', rating: 4.7, completed: true },
      { title: 'Vue', rating: 4.3, completed: false }
    ]
  },
  {
    id: 3,
    name: 'Charlie',
    courses: [
      { title: 'Angular', rating: 4.6, completed: true },
      { title: 'React', rating: 4.8, completed: true },
      { title: 'Node', rating: 4.1, completed: true }
    ]
  }
];

let filteredUser = users.filter(u=>{
    let count=0;
   for(let course of u.courses){
       if(course.completed && course.rating > 4.0 ){
           count++;
       }
    
   }
   return count>=2;
}).map((u)=>({
    id:u.id,
    name:u.name
}));
console.log(filteredUser)