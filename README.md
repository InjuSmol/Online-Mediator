### **Project Summary:**

**Mediation Assistant Web Application**  
The Mediation Assistant is a web-based platform designed to help individuals resolve conflicts in a structured and emotionally-aware manner. The application uses AI to analyze messages, suggest better responses, and provide a calming, formal tone to prevent escalations. It offers a secure, temporary communication channel for two parties in conflict, allowing them to communicate through a mediated interface, encouraging healthier conversation, and preventing emotional outbursts.

### **Key Features:**
- **Session Initiation**: Initiate a mediation session by inviting another party using phone number or email.
- **Two-Factor Authentication**: Both parties set up a password and complete a two-step verification to log into the session.
- **Conflict Description**: Provide details about the conflict to guide the mediation process and help AI suggestions.
- **AI Mediator**: Analyzes messages in real-time, suggesting more formal, calm, and constructive responses.
- **Escalation Prevention**: Alerts users if their message might escalate the situation, offering alternatives.
- **Non-Screenshotable**: Prevents participants from taking screenshots or erasing messages during the mediation.
- **Session Data Deletion**: Upon the conclusion of the session, all data (messages, passwords, and session details) is deleted.
- **Legal Warning**: If the conflict seems serious, the AI may suggest seeking police or legal advice.

### **Implementation Steps:**

1. **Frontend Development**:
   - **UI Design**: Create a chat-like interface similar to messaging apps (e.g., Telegram).
   - **Technologies**: React.js, Tailwind CSS for a responsive and user-friendly UI.
   
2. **Session Management**:
   - **User Authentication**: Implement a two-step verification process for both parties to join the mediation session.
   - **Technologies**: Next.js for the frontend framework, Clerk for user authentication.
   
3. **AI Integration**:
   - **Message Analysis**: Implement an AI model (possibly using natural language processing APIs) to analyze and suggest improvements to the conversation.
   - **Technologies**: Integrate OpenAI's GPT models or a custom NLP model for response analysis and suggestions.
   
4. **Backend and Data Storage**:
   - **Temporary Data Storage**: Use **MongoDB Atlas** for storing temporary session logs (messages, conflict details).
   - **Session Data Management**: Use **Redis** for storing active session information (user authentication tokens, session status).
   - **Technologies**: MongoDB, Redis for temporary storage and fast retrieval.
   
5. **Security and Data Deletion**:
   - **Secure Communication**: Ensure all messages during the session are encrypted.
   - **Data Deletion**: Implement automatic deletion of session data once the session ends.
   - **Technologies**: Use encryption libraries (e.g., CryptoJS for frontend) to ensure data security, and implement server-side deletion scripts for MongoDB and Redis.

6. **Additional Features**:
   - **Non-Screenshot Protection**: Use web-based methods to try to block screenshots (such as disabling copy-paste functionality or overlaying transparent elements).
   - **Legal Escalation**: Implement AI-driven prompts that suggest legal or police consultation based on the severity of the conflict.

### **Technologies Used**:
- **Frontend**: React.js, Tailwind CSS, Next.js
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas (for session data), Redis (for session management)
- **Authentication**: Clerk (for user authentication and two-factor verification)
- **AI/NLP**: OpenAI API or custom NLP model
- **Security**: HTTPS, encryption libraries (CryptoJS)
- **Deployment**: AWS EC2 (for hosting), S3 (for temporary file storage)

By implementing these steps and technologies, the Mediation Assistant aims to provide a peaceful, emotionally-aware platform to help individuals resolve conflicts in a secure, temporary space.
