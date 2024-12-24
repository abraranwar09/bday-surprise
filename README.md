# Birthday Surprise

Birthday Surprise is a web application that allows users to discover historical events, births, and deaths that occurred on their birthday. The application fetches data from an external API and displays it in a user-friendly interface, complete with images sourced from Wikipedia.

## Features

- **Date Input**: Users can input their birth date using a day input and a month dropdown.
- **Event Display**: Displays historical events, births, and deaths for the selected date.
- **Dynamic Image Loading**: Fetches and displays images related to each event from Wikipedia.
- **Tab Navigation**: Users can filter results by category (All, Events, Births, Deaths).
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **External APIs**: 
  - [ZenQuotes API](https://zenquotes.io/) for event data
  - [Wikimedia API](https://www.mediawiki.org/wiki/API:Main_page) for images

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/birthday-surprise.git
   cd birthday-surprise
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the server**:
   ```bash
   node server.js
   ```

4. **Open the application**:
   Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Enter your birth date using the day input and month dropdown.
2. Click the "Search" button to fetch and display historical data.
3. Use the tabs to filter results by category.
4. Images will load progressively as they are fetched from Wikipedia.

## Project Structure

- **src/**: Contains the frontend files (HTML, CSS, JavaScript).
  - `index.html`: Main HTML file.
  - `style.css`: Stylesheet for the application.
  - `main.js`: JavaScript file for handling UI interactions and API calls.
- **server.js**: Node.js server file that handles API requests.

## API Endpoints

- **GET /api/get-events**: Fetches historical events, births, and deaths for a given date.
- **GET /api/get-image**: Fetches an image URL from Wikipedia based on an article name.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [ZenQuotes API](https://zenquotes.io/) for providing historical data.
- [Wikimedia API](https://www.mediawiki.org/wiki/API:Main_page) for image resources.
