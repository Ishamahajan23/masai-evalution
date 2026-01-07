
const postUrl= "https://jsonplaceholder.typicode.com/posts"
const commentsUrl= "https://jsonplaceholder.typicode.com/comments"



async function fetchPostsWithComments() {
  // Your implementation here
  try{
    const [postres, commentRes ]= await Promise.all([fetch(postUrl), fetch(commentsUrl)]);
    const posts= await postres.json();
    const comments= await commentRes.json();

    const commentMap= comments.reduce((acc, comment)=>{
        if(!acc[comment.postId]){
            acc[comment.postId]=[];
        }
        acc[comment.postId].push(comment);
        return acc;

    }, {})
    let  postsResult = posts.filter(post=>commentMap[post.id]).map(post=>({
        postId: post.id,
        title:post.title,
        commentCount : commentMap[post.id].length,
        firstCommenterEmail: commentMap[post.id][0].email
    })).sort((a,b)=>b.commentCount - a.commentCount).slice(0,5);
    
    return postsResult ;


    
  }catch(err){
      console.log("Error:", err);
      throw err;
  }
}

fetchPostsWithComments().then(result => console.log(result));

/* Expected Output (top 5 posts by comment count):
[
  {
    postId: 1,
    title: 'sunt aut facere repellat provident...',
    commentCount: 5,
    firstCommenterEmail: 'Eliseo@gardner.biz'
  },
  {
    postId: 2,
    title: 'qui est esse',
    commentCount: 5,
    firstCommenterEmail: 'Jayne_Kuhic@sydney.com'
  },
  // ... 3 more posts
]
*/
