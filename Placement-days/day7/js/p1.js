const userUrl= `https://jsonplaceholder.typicode.com/users/1`
 const postUrl= `https://jsonplaceholder.typicode.com/posts?userId=1`
const commentUrl =`https://jsonplaceholder.typicode.com/comments?postId={postId}`


async function fetchData(){

    try{
        const [userRes, postRes] = await Promise.all([fetch(userUrl), fetch(postUrl)]);

        const user = await userRes.json();
        const post = await postRes.json();
        
        const firstPostId = post[0].id;
        const commentUrl = `https://jsonplaceholder.typicode.com/comments?postId=${firstPostId}`;
        const commentRes = await fetch(commentUrl);
        const comments = await commentRes.json();

       console.log({
        userName: user.name,
        firstPostTitle: post[0].title,
        commentCount: comments.length,
        topComment: comments[0].body
        })


    }catch(err){
        console.log(err);
    }

}

fetchData();