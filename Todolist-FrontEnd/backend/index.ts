import express from 'express';
import cors from 'cors';

const app = express();

// Add before routes
app.use(cors({
  origin: 'http://localhost:3000', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
