import express from 'express';
import path from 'path';
import cors from 'cors';
import { serve } from 'inngest/express';

import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import { functions, inngest } from './lib/inngest.js';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('__dirname:', __dirname);
console.log('dist:', path.resolve(__dirname, '../../frontend/dist'));

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use('/api/inngest', serve({ client: inngest, functions }));

app.get('/health', (req, res) => {
  return res.status(200).json({ msg: 'api is up and running' });
});

app.get('/books', (req, res) => {
  return res.status(200).json({ msg: 'this is books endpoint' });
});

if (ENV.APP_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () =>
      console.log('server is running on port: ', ENV.PORT),
    );
  } catch (error) {
    console.error('error starting the server', error);
    process.exit(1);
  }
};

startServer();
