# Grammar Correction System

This project is a grammar correction system that uses the GPT-3 model to correct sentences. It provides an Express.js backend for interacting with the OpenAI API and a SQLite database. Additionally, there's a React frontend that allows users to input sentences and retrieve corrected sentences, all corrections, and random corrections.

## Installation

1. Clone the repository: 
    git clone https://github.com/your-username/grammar-correction-project.git
    cd unit-openai

2. Install dependencies:
    First `npm install` on the root directoty to install backend dependencies
    then, 
    `cd frontend`
    `npm install` (for the frontend)


3. Create a `.env` file in the `root` directory and add your OpenAI API key:
   OPENAI_API_KEY=`your_openai_api_key_here`

4. Run the servers:
    `npm start` (on the root diretory will start backend as well as the frontend)

5. SQLite Setup:
    - Ensure you have SQLite installed. If not, download and install it from [SQLite Downloads](https://www.sqlite.org/download.html).

    - Run the SQLite initialization script to create the database and table:
    ```
    node database/initDatabase.js
    ```


## Usage

1. After starting both the backend and frontend servers, open your web browser and go to `http://localhost:3000`.

2. Enter a sentence in the input field and click the "Correct" button to get a corrected sentence.

3. Click the "Get All Corrections" button to retrieve and display all correction pairs.

4. Click the "Get Random Correction" button to retrieve and display a random correction pair.


## Project Structure
- `/` - Express.js backend
- `controllers/` - Contains the controller functions for various routes
- `models/` - Contains the SQLite database setup
- `routes/` - Defines the API routes
- `utils/` - Utility functions
- `frontend/` - React frontend
- `frontend/src/` - Source code for the Next.js application
 - `frontend/pages` - Main application component
 - ...


## Technologies Used

- Express.js
- React
- OpenAI API
- SQLite







