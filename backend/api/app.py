from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests
import os

app = Flask(__name__)

# Initialize CORS
CORS(app, resources={r"/*": {"origins": "https://courier-scraper-web.vercel.app"}})

@app.route('/fetch-article', methods=['POST'])
def fetch_article():
    data = request.get_json()
    url = data.get('url')

    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 400

    soup = BeautifulSoup(response.text, 'html.parser')
    title = soup.find('h1').get_text() if soup.find('h1') else "No title found"
    paragraphs = soup.find_all('p')

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

    return jsonify({
        "title": title,
        "content": "\n\n".join(article_text)
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
