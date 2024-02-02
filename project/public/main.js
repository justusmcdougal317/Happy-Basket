document.addEventListener('DOMContentLoaded', async () => {
    // Fetch thoughts and render them on page load
    await fetchAndRenderThoughts();

    // Handle form submission
    const thoughtForm = document.getElementById('thought-form');
    thoughtForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const thoughtInput = document.getElementById('thought-input');
        const thought = thoughtInput.value;

        // Send the thought to the server
        await submitThought(thought);

        // Fetch and render thoughts again after submission
        await fetchAndRenderThoughts();

        // Clear the input field after submission
        thoughtInput.value = '';
    });
});

async function submitThought(thought) {
    try {
        // Assume you have a user ID available, replace 'userId' with the actual user ID
        const userId = 'userId';
        
        await fetch('/api/post-thought', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: userId,
                text: thought,
            }),
        });
    } catch (error) {
        console.error('Error submitting thought:', error);
    }
}
async function fetchAndRenderThoughts() {
    try {
        const response = await fetch('/api/get-thoughts'); // Assuming you have a route to get thoughts
        const thoughts = await response.json();

        // Render thoughts on the page
        const thoughtList = document.getElementById('thought-list');
        thoughtList.innerHTML = '';

        thoughts.forEach((thought) => {
            const li = document.createElement('li');
            li.textContent = thought.content;
            thoughtList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching thoughts:', error);
    }
}