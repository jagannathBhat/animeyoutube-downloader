# AnimeYoutube Downloader

Download the anime you want from AnimeYoutube without any of the ads. This project is not rpduction ready because of some issues. Please check the issues section if you can help me out with any of them.

## How to Use

1. Download this repo.
2. Install [NodeJS](https://nodejs.org/en/download/), [Python](https://www.python.org/downloads/) and [Pip](https://pip.pypa.io/en/stable/installing/).
3. Run the following commands inside the folder. (It might take a few minutes to execute)

   ```bash
   npm run install
   npm run build
   npm start
   ```

4. Open the web app on <http://localhost:5000>.

## How it works

Open Development servers using the following command.

```bash
   npm run dev
```

### Backend

- The BeautifulSoup4 library is used for scrapping the download links of the videos from AnimeYoutube.
- The server is built using Flask.

### Frontend

- The frontend uses ReactJS.
