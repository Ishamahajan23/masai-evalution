async function fetchAndTransformUsers() {
    try {
        const [usersResponse, postsResponse] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users'),
            fetch('https://jsonplaceholder.typicode.com/posts')
        ]);

        if (!usersResponse.ok || !postsResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const users = await usersResponse.json();
        const posts = await postsResponse.json();

        const postCountByUser = posts.reduce((acc, post) => {
            acc[post.userId] = (acc[post.userId] || 0) + 1;
            return acc;
        }, {});

        const transformedUsers = users.map(user => ({
            userId: user.id,
            name: user.name,
            postCount: postCountByUser[user.id] || 0
        }));

        return transformedUsers;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

fetchAndTransformUsers()
    .then(data => console.log(data))
    .catch(err => console.error('Error:', err));