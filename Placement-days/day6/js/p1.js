async function fetchAndTransformUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();

        const transformedUsers = users
            .filter(user => user.username.length > 6)
            .map(user => ({
                id: user.id,
                fullName: user.name,
                email: user.email
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