import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloword(request: Request, response: Response) {
  const user = createUser({
    email: 'weverton.dev@gmail.com',
    password: '123456',
    techs: ['NodeJS', 'ReactJS', 'React Native', 'Python']
  });

  return response.json({ messege: 'Hello World!'})
}