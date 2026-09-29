# web-scraper-API

HTTP API for scraping text, images, lists, and nested objects from web pages.

## Run locally

Install dependencies and start the server:

```sh
npm ci
node server.js
```

The API listens on `http://localhost:5000` by default. `POST /scrape` accepts a JSON scraping task and returns the extracted data as JSON. API-key authentication is not required; requests are rate-limited to 100 per 15 minutes.

## Example: Wikipedia tables

The included [wikiTables.json](src/task-templates/wikiTables.json) task scrapes tables from Wikipedia's list of U.S. presidents. With the server running, send it using PowerShell:

```powershell
curl.exe -X POST "http://localhost:5000/scrape" `
	-H "Content-Type: application/json" `
	--data-binary "@src/task-templates/wikiTables.json"
```

The response contains a `tables` array. Each table has `header` and `body` arrays. To scrape a different page or table, edit the task's `config.url` and CSS selectors in `data`.
