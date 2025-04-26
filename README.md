# PDF Summary Generator

A web application that allows users to upload PDF documents and receive AI-generated summaries using OpenAI's API.

## Project Description

### Objective

Design and implement a simple web application that allows users to upload PDF documents and receive AI-generated summaries using OpenAI's API.

### Core Features

- **PDF Upload**: Allow users to upload a PDF file
- **Summary Generation**: Use OpenAI's API to generate a summary of the uploaded PDF
- **History Display**: Show the last 5 processed documents

### Technologies Used

- Nest.js
- TypeScript
- Supabase and Supabase Storage
- OpenAI API

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker (optional, for containerized deployment)
- Supabase account
- OpenAI API key

### Local Development Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:

   - Add your Supabase credentials
   - Add your OpenAI API key
   - Configure other necessary environment variables

5. Start the development server:

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## API Documentation

### Endpoints

#### GET /pdf/history

Returns the last 5 processed and summarized PDF documents.

**Response Format:**

```json
  "data": [
    {
      "id": UUID,
      "title": "string",
      "upload_url": "string",
      "createdAt": "string"
    }
  ]
```

#### POST /pdf/upload

Upload a PDF file for summarization.

**Request:**

- Method: POST
- Content-Type: multipart/form-data
- Body: File (PDF)

**Response Format:**

```json
{
  "summary": "string"
}
```

## Docker Usage

### Building the Docker Image

```bash
docker build -t be-platform .
```

### Running with Docker Compose

```bash
docker-compose up -d
```

### Docker Configuration

For detailed Docker configuration, please refer to [README.Docker.md](README.Docker.md)

## Production Deployment

1. Sign up for a free account on [Koyeb](https://www.koyeb.com/)
2. Create a new service
3. Add the environment variables from your `.env` file during service configuration
4. Deploy the service
5. Test the deployed service by uploading PDFs and checking the history

## Contributing

Please follow the project's coding standards and submit pull requests for any improvements.

## License

MIT License
