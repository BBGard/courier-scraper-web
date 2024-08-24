// document.getElementById('fetch-button').addEventListener('click', function() {
//   const url = document.getElementById('url-input').value;
//   if (!url) {
//       alert('Please enter an article URL.');
//       return;
//   }

// //   fetch('http://localhost:5000/fetch-article', {
//   fetch('https://courier-scraper-web-backend.vercel.app/fetch-article', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ url: url })
//   })
//   .then(response => response.json())
//   .then(data => {
//       if (data.title && data.content) {
//           document.getElementById('title').innerText = data.title;
//           document.getElementById('content').innerHTML = data.content;
//       } else {
//           document.getElementById('title').innerText = 'No title found';
//           document.getElementById('content').innerHTML = 'No content found';
//       }
//   })
//   .catch(error => {
//       console.error('Error:', error);
//       alert('Failed to fetch the article.');
//   });
// });
document.getElementById('fetch-button').addEventListener('click', function() {
    const url = document.getElementById('url-input').value;

    if (!url) {
        alert('Please enter an article URL.');
        return;
    }

    console.log("fetching article from: ", url);

    fetch('https://courier-scraper-web-backend.vercel.app/fetch-article', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {

        console.log("data: ", data);
        const titleElement = document.getElementById('title');
        const contentElement = document.getElementById('content');

        if (data.title && data.content) {
            // Update title
            titleElement.innerHTML = `<h1>${data.title}</h1>`;

            // Update content with formatting
            const formattedContent = data.content
                .split('\n\n')   // Split by double newlines
                .map(paragraph => `<p>${paragraph}</p>`)  // Wrap each paragraph in <p> tags
                .join('\n');     // Join paragraphs with newlines

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
