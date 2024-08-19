document.getElementById('fetch-button').addEventListener('click', function() {
  const url = document.getElementById('url-input').value;
  if (!url) {
      alert('Please enter an article URL.');
      return;
  }

  fetch('http://localhost:5000/fetch-article', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
  })
  .then(response => response.json())
  .then(data => {
      if (data.title && data.content) {
          document.getElementById('title').innerText = data.title;
          document.getElementById('content').innerHTML = data.content;
      } else {
          document.getElementById('title').innerText = 'No title found';
          document.getElementById('content').innerHTML = 'No content found';
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Failed to fetch the article.');
  });
});
