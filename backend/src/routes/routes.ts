import express from 'express';
import authRoute from './features/authRoute';
import ordersRoute from './features/ordersRoute';
import userRoute from './features/userRoute';

const app = express();

app.use('/auth', authRoute);
app.use('/orders', ordersRoute);
app.use('/users', userRoute);

export default app;
