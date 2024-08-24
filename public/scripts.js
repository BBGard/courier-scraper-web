document.getElementById('fetch-button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    const url = document.getElementById('url-input').value;

    if (!url) {
        alert('Please enter an article URL.');
        return;
    }

    fetch('/api/fetch-article', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("data: ", data);
        const titleElement = document.getElementById('title');
        const contentElement = document.getElementById('content');

        if (data.title && data.content) {
            titleElement.innerHTML = `<h1>${data.title}</h1>`;
            const formattedContent = data.content
                .split('\n\n')
                .map(paragraph => `<p>${paragraph}</p>`)
                .join('\n');
            contentElement.innerHTML = formattedContent;
        } else {
            titleElement.innerHTML = '<h1>No title found</h1>';
            contentElement.innerHTML = '<p>No content found</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to fetch the article.');
    });
});
