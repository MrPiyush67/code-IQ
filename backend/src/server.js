import express from 'express';
import path from 'path';
import cors from 'cors';
import { serve } from 'inngest/express';
import { clerkMiddleware } from '@clerk/express';

import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import { functions, inngest } from './lib/inngest.js';
import { fileURLToPath } from 'url';
import { protectRoute } from './middlewares/protectRoute.js';
import chatRoutes from './routes/chatRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware()); // this will add auth field to req: req.auth()
console.log(ENV.CLIENT_URL);

app.use('/api/inngest', serve({ client: inngest, functions }));
app.use('/api/chat', protectRoute, chatRoutes);
app.use('/api/sessions', protectRoute, sessionRoutes);

app.get('/health', (req, res) => {
  return res.status(200).json({ message: 'api is up and running' });
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
