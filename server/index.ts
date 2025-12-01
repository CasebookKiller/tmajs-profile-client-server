import cors from 'cors';

import express, { Express, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import { Credentials, generateToken, jwtPrivateKey, PORT } from './common/common';
import { requestTUser } from './supabaseClient';

const app: Express = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Запущен сервер на Typescript...')
});

app.listen(PORT, () => {
  console.log(`Сервер прослушивает порт ${PORT}`)
});

app.post('/login', async (req: Request, res: Response) => {
  const { email, password }:Credentials = req.body;

  const response = await requestTUser(email);

  const user = response?.find(user => {return user.email === email && user.password === password});

  if (!user) return res.status(404).json({message: 'Пользователь не найден либо пароль неверен!' });

  const result = { 
    id: user.id,
    name: user.username,
    email: user.email,
    token: generateToken(user)
  }
  
  return res.status(200).json(result);
});

app.get('/about', (req: Request, res: Response) => {
  res.send('about');
  /*
  const token = req.headers.authorization?.split(' ')[1].replace(' ', '')||'';
  console.log('token: ', token);
  const decoded = jwt.verify(token, jwtPrivateKey) as jwt.JwtPayload;
  const { id, name, email } = decoded;
  const exp = decoded?.exp;
  const expdate = exp ? new Date(exp * 1000).toLocaleString() : '';  
  if (!exp) {
    res.status(404).json({message: 'Токен не действует!' });
  } else {
    if (new Date() < new Date(exp * 1000)) {
      res.status(200).json({ 
        message: `Добро пожаловать, ${name} (id: ${id}, email: ${email})! Токен действует до ${expdate}...`
      });    
    } else {  
      res.status(404).json({
        message: 'Срок действия токена истёк!'
      });
    }  
  }
  */
});

app.get('/private', (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1].replace(' ', '')||'';
  console.log('token: ', token);
  const decoded = jwt.verify(token, jwtPrivateKey) as jwt.JwtPayload;
  const { id, name, email } = decoded;
  const exp = decoded?.exp;
  const expdate = exp ? new Date(exp * 1000).toLocaleString() : '';  
  if (!exp) {
    res.status(404).json({message: 'Токен не действует!' });
  } else {
    if (new Date() < new Date(exp * 1000)) {
      res.status(200).json({ 
        message: `Добро пожаловать, ${name} (id: ${id}, email: ${email})! Токен действует до ${expdate}...`
      });    
    } else {  
      res.status(404).json({
        message: 'Срок действия токена истёк!'
      });
    }  
  }

});