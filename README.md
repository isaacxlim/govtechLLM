Overview
This application is built as part of a take-home assignment and focuses on delivering an easy-to-use frontend interface to interact with an LLM. The application supports multiple conversations, allowing users to send prompts and view responses in real time. You can choose between different LLM models and manage your conversations with ease.

![image](https://github.com/user-attachments/assets/8de5174e-ad31-480a-896e-cbef7f999057)

Features
CRUD Conversations: Create, update, and delete conversations with an LLM.
Send Prompts: Submit questions or prompts and receive answers from the LLM.
Multiple LLM Models: Choose from different LLM models (e.g., GPT-3.5 Turbo, GPT-4o Mini).
Real-Time Updates: Messages and conversation history are dynamically updated.
Customizable Experience: Users can select the model that best suits their needs.
Error Handling: Graceful error handling for API failures and invalid inputs.
Technologies Used
The application is built with modern frontend technologies, ensuring a responsive and efficient user experience.

Next.js 13: A React framework for building performant web applications.
React 18: A popular JavaScript library for building user interfaces.
Mantine 6: A modern UI component library for React.
React Query 4: State and server-side data management.
Axios: HTTP client for API interactions.
Jest: Testing framework for writing unit tests.

Prerequisites
Before running the application, ensure you have the following installed:
Node.js v18.17 or later
npm v7 or later

Installation
Follow these steps to get the application up and running locally:

1. Clone the Repository:
   git clone <repository-url>
   cd llm-frontend
2. Install Dependencies: Install the required dependencies using npm:
   npm install
3. Start the Development Server: Start the app in development mode:
   npm run dev
4. Open in Browser: Once the server is running, open your browser and visit: http://localhost:3000

Running Tests
This project follows Test-Driven Development (TDD). Tests are located in the page.test.tsx file in the /chat directory.

Install Jest: If Jest and testing dependencies aren't installed yet: 
  npm install --save-dev jest @testing-library/react @testing-library/jest-dom ts-jest @types/jest
  
Run Tests: To run the tests, use:
  npm test
