# Script Documentation

This documentation provides instructions on how to use the script for performing a search and extracting information from a web page. Follow the steps below to clone the repository, install dependencies, and run the script.

## Prerequisites

- Node.js and npm installed on your machine

## Cloning the Repository

To clone the repository, open a terminal or command prompt and execute the following command:

`git clone <repository_url>`


Replace `<repository_url>` with the URL of the repository.

## Installation

Navigate to the project directory in the terminal or command prompt, then run the following command to install the required dependencies:

`npm install`


## Running the Script

To execute the script, use the following command format:

`npm run search "<search term>"`


Replace `<search term>` with the term you want to search for. If the search term contains spaces, it should be wrapped in double quotes.

Example:

`npm run search "Iphone Pro Max"`


The script will launch a headless browser, perform the search on the specified webpage, extract relevant information from the search results, and save the extracted data to a CSV file named `search-output.csv`.

Please note that the script is expecting the search term as a command-line argument. If you don't provide a search term, an error message will be displayed.

**Note:** You can modify the script's configuration in the `config.ts` files according to your specific requirements to search other e-commerce website (uses Amazon by default).

If you encounter any issues or errors while using the script, please refer to the error messages displayed in the terminal or command prompt for further information.

That's it! You have successfully used the script to perform a search and extract information from a web page.
