# NeuroSafe Web App

Publication: https://ieeexplore.ieee.org/document/10511610

NeuroSafe is a full stack mental wellness platform that combines reflective journaling, machine learning based emotion classification, Seq2Seq conversational support, therapist coordination, and report generation in one integrated system. The project is built to help users understand emotional patterns early and to make that information more actionable through guided interfaces, analytics, and clinical workflows.

## Project Vision

Mental health applications often separate self reflection, communication, and care coordination into disconnected tools. NeuroSafe brings these capabilities together so that daily journaling, emotional trend analysis, patient therapist interaction, and conversational support can exist in a single product flow. The implementation in this repository focuses on practical local development with clear expansion paths for production hardening.

## What This Repository Contains

1. A frontend application in `client/` built with Next.js and React.
2. A backend API in `server/` built with Express and MongoDB.
3. Two Python Flask inference services in `server/flask/` for emotion prediction and chatbot responses.
4. Model artifacts and inference services that support text based emotion understanding in practical product workflows.

## End to End Product Capabilities

### 1. Authentication and Identity

The platform supports account creation with email and password, login, JWT protected backend routes, Google sign in integration, user validation checks, and profile updates. The backend middleware resolves both regular JWT tokens and Google issued identity tokens so the rest of the application can operate with a unified user context.

### 2. Journaling with BERT Based Emotion Inference

Users can write journal entries that include title, free form content, and selected emotion chips from the interface. The journal text is sent to an ML service endpoint that performs BERT based emotion analysis to classify affective state labels such as joy, sadness, anger, fear, love, and surprise. The resulting sentiment label is persisted together with the entry so later analytics can represent not only raw journal activity but emotional direction over time.

### 3. Mood and Emotion Analytics

The dashboard visualizes journal history through trend and distribution style charts. One endpoint returns time ordered sentiment mappings for recent history, while another returns aggregate emotion counts. This enables users and therapists to quickly identify recurring emotional patterns rather than relying only on single entry interpretation.

### 4. Seq2Seq Chat Application

NeuroSafe includes a Seq2Seq architecture based chat application for conversational interaction. The chatbot pipeline is served through Flask inference endpoints with trained model artifacts and tokenizer resources, enabling text to response generation aligned with the wellness workflow.

The conversational stack follows an encoder decoder sequence to sequence design. User text is tokenized and encoded into latent context vectors, and the decoder generates a response sequence token by token. This structure allows contextual replies beyond rule based intent matching and supports richer conversational continuity for mental wellness prompts.

### 5. Therapist Discovery and Appointments

The platform supports therapist listing, appointment creation, and role specific appointment history retrieval. Both patient and therapist views can separate upcoming and past sessions based on server side date logic. This creates a direct connection between emotional tracking and scheduled care touchpoints.

### 6. Report Creation and Sharing Pipeline

The frontend can generate a PDF report from mood and emotion visual components. The backend accepts uploaded report blobs and includes scaffolding for decentralized storage integration. This enables a future pathway for secure sharing and verifiable storage of wellness summaries.

### 7. Blockchain Integration Layer

The repository includes smart contract and Web3 integration artifacts under the frontend blockchain directory. This layer is designed for health record access control and permission management workflows.

The blockchain component focuses on consent driven data sharing between patients and therapists. In this model, access privileges can be granted and revoked through contract backed logic, creating a transparent permission trail for sensitive records. Instead of relying only on centralized access flags, the contract layer adds verifiable ownership and authorization states that can be checked before allowing record level actions.

At the application level, this supports key care scenarios such as granting a therapist temporary visibility into relevant health records, revoking access after treatment windows, and preserving an auditable history of permission transitions. This design strengthens trust, improves accountability, and aligns with privacy first mental health data handling goals.

## Technical Architecture

### Frontend Layer

The frontend uses Next.js App Router with React components, Redux state slices, and Chart.js visualizations. UI composition currently mixes Chakra UI, Bootstrap, Material UI, Sass, and Tailwind utilities, reflecting an iterative product build process.

### Backend Layer

The backend provides REST routes across authentication, users, chat, messages, journal entries, emotions, therapist data, appointments, and reports. MongoDB and Mongoose models represent users, chats, messages, journals, and appointments. JWT based middleware enforces protected access for relevant routes.

### ML Service Layer

The emotion service exposes a BERT driven text classification pipeline that converts journal text into contextual embeddings and predicts an emotion class with transformer based language understanding. This improves sensitivity to phrase level context and nuance compared with simpler bag of words style methods.

The chat service uses a sequence to sequence modeling approach with trained tokenizer and model assets to generate conversational responses from input text. The inference flow includes text normalization, token sequence construction, encoder pass, decoder generation, and response post processing before returning a final reply.

### Model Inference Flow

1. The frontend submits user text to Flask inference endpoints.
2. The emotion endpoint runs BERT based classification and returns a sentiment label.
3. The chatbot endpoint runs Seq2Seq generation and returns a response sentence.
4. The backend or frontend persists relevant outputs for analytics and user interaction continuity.

## Repository Structure

```text
.
├── client/
│   ├── app/
│   ├── redux/
│   └── package.json
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── flask/
│   │   ├── emotion/
│   │   └── chatbot-models/
│   └── package.json
└── README.md
```

## Local Development Setup

### Prerequisites

1. Node.js version 18 or higher.
2. npm package manager.
3. Python 3.9 or higher.
4. A running MongoDB instance, local or hosted.

### Installation

```bash
git clone <your-repository-url>
cd neurosafe
cd server && npm install
cd ../client && npm install
```

### Environment Configuration

Create `server/.env` with the following values.

```env
PORT=8000
BASE_URL=http://localhost:3000
LOCAL_URL=mongodb://127.0.0.1:27017/neurosafe
SECRET=your_jwt_secret
CLIENT_ID=your_google_oauth_client_id
IPFS_TOKEN=your_web3_storage_token
```

Create `client/.env.local` with the following values.

```env
REACT_APP_SERVER_URL=http://localhost:8000
REACT_APP_CLIENT_ID=your_google_oauth_client_id
```

### Service Startup

1. Start the Express backend.

```bash
cd server
npm run start
```

2. Start the Next.js frontend.

```bash
cd client
npm run dev
```

3. Start the emotion inference service.

```bash
cd server/flask/emotion
pip install -r requirements.txt
python app.py
```

4. Start the chatbot inference service.

```bash
cd server/flask/chatbot-models
python app.py
```

### Local Endpoints

1. Frontend UI at `http://localhost:3000`.
2. Express API at `http://localhost:8000`.
3. Emotion inference service at `http://localhost:5000`.
4. Chatbot inference service at its Flask runtime port.

## API Surface Summary

### Authentication and Users

1. `POST /auth/register`
2. `POST /auth/login`
3. `GET /auth/valid`
4. `GET /auth/logout`
5. `POST /api/google`
6. `GET /api/user?search=`
7. `GET /api/users/:id`
8. `PATCH /api/users/update/:id`

### Journal and Emotion Data

1. `POST /api/journal`
2. `GET /api/journal`
3. `DELETE /api/journal/flush`
4. `GET /api/emotion`
5. `GET /api/emotion/bars`

### Chat and Message Data

1. `POST /api/chat`
2. `GET /api/chat`
3. `POST /api/chat/group`
4. `PATCH /api/chat/group/rename`
5. `PATCH /api/chat/groupAdd`
6. `PATCH /api/chat/groupRemove`
7. `POST /api/message`
8. `GET /api/message/:chatId`

### Therapist and Appointment Data

1. `GET /api/therapist/getTherapists`
2. `POST /api/appointment`
3. `GET /api/appointment/therapist/:userId`
4. `GET /api/appointment/patient/:userId`

### Report Upload

1. `POST /api/report/upload`
