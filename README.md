# Sushift
Lightweight restaurant scheduling software, tailored for Akira Ramen &amp;  Izakaya.

## How to Run

To get Sushift up and running on your local machine, follow the steps below. These instructions assume you have Node.js and npm installed on your computer.

### Prerequisites

- Ensure you have Node.js and npm installed. You can download and install them from [Node.js official website](https://nodejs.org/).

### Setup

1. **Clone the Repository**

   First, clone the repository to your local machine. You can do this by running the following command in your terminal:

   ```bash
   git clone https://github.com/sm467d/sushift.git
   ```

2. **Create Environment File**

   After cloning the repo, you need to set up the environment variables. Create 2 `.env` files in the root directories of both the client and server, and replace the necessary values:

   For the client environment, you will need to set the following variable:
   ```plaintext
   # .env
   REACT_APP_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"

   For the server environment, you will need to set the following variables:
   ```plaintext
   # .env
    MONGODB_URI="MONGODB_URI_PLACEHOLDER"
    PRIVATE_KEY_PATH="PRIVATE_KEY_PATH_PLACEHOLDER"
    CERTIFICATE_PATH="CERTIFICATE_PATH_PLACEHOLDER"
    GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"

3. **Install Dependencies**

   Navigate to the project directories and install the necessary npm packages:

   ```bash
   cd path/to/sushift/client
   npm install
   ```

   Do so again for the server:
   ```bash
   cd path/to/sushift/server
   npm install
   ```

### Running the Application

Sushift requires running both the client and the server side. You will need two terminals to start each part separately.

1. **Client**

   In one terminal, start the client:

   ```bash
   cd path/to/sushift/client
   npm start
   ```

   This command will launch the frontend part of Sushift, typically accessible via `http://localhost:3000`.

2. **Server**

   In a second terminal, navigate to the server directory (if applicable) and run:

   ```bash
   cd path/to/sushift/server
   npm run dev
   ```

   This command will start the backend server, which by default is accessible via `http://localhost:8000`.

Now, both the client and server sides of the Sushift application should be running, and you can begin using the application locally.
