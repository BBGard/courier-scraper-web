# Courier Python Scraper

## Overview

Courier Python Scraper is a web application designed to demonstrate how to fetch and display article content from The Courier website. This project showcases a frontend interface that allows users to input article URLs and a backend that scrapes and formats the article content. Note that this application is intended for educational purposes to illustrate how paywalls can sometimes be circumvented on certain websites.

## Features

- Input a URL from The Courier.
- Fetch and display the article title and content.
- Clean and format the content for better readability.
- Hosted on Vercel for both frontend and backend.

## Prerequisites

- Python 3.x
- Node.js and npm (for frontend development)
- Vercel account (for deployment)

## Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/courier-python-scraper.git
   cd courier-python-scraper
   ```

2. **Navigate to the backend directory and install dependencies:**

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Set up environment variables (if necessary).**

4. **Run the backend server locally:**

   ```bash
   python app.py
   ```

5. **Deploy the backend to Vercel:**

   - Ensure you have the Vercel CLI installed.
   - Run `vercel` and follow the prompts to deploy your backend.

## Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the frontend locally:**

   ```bash
   npm start
   ```

4. **Deploy the frontend to Vercel:**

   - Ensure you have the Vercel CLI installed.
   - Run `vercel` and follow the prompts to deploy your frontend.

## CORS Configuration

Ensure that your backend server allows requests from the frontend. In the backend code, use the `flask_cors` library to enable CORS:

```python
from flask_cors import CORS
CORS(app, resources={r"/*": {"origins": "https://courier-scraper-web.vercel.app"}})
```

## Usage

1. Navigate to your deployed frontend URL.
2. Enter a valid article URL from The Courier.
3. Click the "Fetch Content" button.
4. View the article title and content displayed on the page.

## Troubleshooting

- **CORS Errors:** Ensure that CORS is correctly configured in your backend to accept requests from your frontend URL.
- **Module Not Found Errors:** Ensure all dependencies are installed and listed in `requirements.txt` for Python or `package.json` for Node.js.
- **Deployment Issues:** Check Vercel logs and configurations for any deployment-related errors.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- [Flask](https://flask.palletsprojects.com/en/2.2.x/)
- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/)
- [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/)
- [Requests](https://docs.python-requests.org/en/latest/)
- [Vercel](https://vercel.com/)
