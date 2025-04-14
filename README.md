# Online Mediator — AI-Powered Mediator Chat App

<img width="547" alt="Screenshot 2025-04-14 at 6 20 49 PM" src="https://github.com/user-attachments/assets/364aa64f-ddcc-474d-a908-57baaeafe05c" />

<img width="547" alt="Screenshot 2025-04-14 at 6 24 09 PM" src="https://github.com/user-attachments/assets/5991f093-428b-4eb8-bab3-a3e7f5a5a6fa" />


Online AI Mediator is a full-stack web application designed to facilitate thoughtful and respectful communication between users through real-time chat. Built with the MERN stack (MongoDB, Express, React, Node.js), socket.io for real-time messages exchanges. The platform integrates a Python-based Flask microservice that leverages a NLP model (prithivida/informal_to_formal_styletransfer) to transform informal or emotionally charged messages into a more formal and neutral tone before delivery.

This unique mediation layer fosters conflict resolution, reduces miscommunication, and promotes civil discourse — making the application suitable for environments where constructive communication is critical, such as online support groups, team collaboration platforms, or educational discussions. The application also features real-time user presence indicators, JWT-based authentication and authorization, modern UI styling with TailwindCSS and Daisy UI, global state management with Zustand, and end-to-end error handling.

The application is still under active development, and further improvements are planned for the NLP component to enhance efficiency and flexibility.

## Getting Started

### 1. Install dependencies

```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install

# For Python AI microservice
cd ../py_service
pip install -r requirements.txt
```

### 2. Run the services

In three separate terminals:

```bash
# Start Flask microservice
cd python
python3 app.py

# Start backend server
cd ../backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```

### 3. Access the Application locally: 

Visit: [http://localhost:5173](http://localhost:5173)


