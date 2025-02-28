import express from 'express';
import authRoute from './features/authRoute';
import ordersRoute from './features/ordersRoute';

const app = express();

app.use('/auth', authRoute);
app.use('/orders', ordersRoute);

export default app;
