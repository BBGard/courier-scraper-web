from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/fetch-article', methods=['POST'])
def fetch_article():
    data = request.get_json()
    url = data.get('url')

    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 400

    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract title
    title = soup.find('h1').get_text() if soup.find('h1') else "No title found"
    paragraphs = soup.find_all('p')

    # Extract article content
    article_text = []
    capture = False
    stop_phrases = [
        "sign up to receive the courier's news alerts",
        "today's top stories curated by our news team",
    ]

    for paragraph in paragraphs:
        text = paragraph.get_text().strip()

        if "your digital subscription" in text.lower():
            capture = True
            continue

        if any(phrase in text.lower() for phrase in stop_phrases):
            break

        if capture:
            article_text.append(text)

    # Extract author name and profile URL
    author_element = soup.find('a', {'data-testid': 'author-link'})
    if author_element:
        author_name = author_element.get_text()
        author_link = author_element['href']
    else:
        author_name = "Author not found"
        author_link = "N/A"

    return jsonify({
        "title": title,
        "content": "\n\n".join(article_text),
        "author_name": author_name,
        "author_link": author_link
    })

if __name__ == '__main__':
    app.run(debug=True)  # Ensure debug mode is enabled for detailed error messages
