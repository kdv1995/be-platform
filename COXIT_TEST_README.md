# PDF Upload, OpenAI API summary generation and History display

Technologies: Nest.js, Typescript, Supabase and Supabase Storage, OpenAI API

## Local Project setup:

```bash
$ npm install
```

```bash
$ copy .env.example .env
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker setup:

### Docker image setup:

```bash
$ docker build -t be-platform .
```

### Docker compose setup:

```bash
$ docker-compose up -d
```

## Production deployment:

- Sign up for a free account on [Koyeb](https://www.koyeb.com/)
- Spin up a new service
- Test if real service is running and send the desired summarization and history
