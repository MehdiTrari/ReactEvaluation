// handlers.js
import { http, HttpResponse } from "msw";
import products from './products.json';

export const handlers = [
  http.get('/api/products', async () => HttpResponse.json(products, {status: 200})),
];
