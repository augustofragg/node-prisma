import {Router} from 'express';
import { createUser, createUsers, deleteUser, getAllUser, getUserByEmail, updateUser } from '../services/user';

export const mainRouter = Router();

mainRouter.get('/ping', (req,res) => {
    res.json({pong:true})
})

mainRouter.post('/user',async (req,res) => {
    const user = await createUser({
        name:'teste3',
        email:'teste3@b7web.com',
    })

    if(user) {
        res.status(201).json(user);
    }
    else {
        res.status(500).json({error:'Ocorreu um erro '});
    }
})

mainRouter.post('/users',async (req , res) => {
    const result = await createUsers([
            // {name:'Joao',email:'joao@gmail.com'},
            // {name:'joao 2',email:'joao@gmail.com'},
            // {name: 'ciclano ', email: 'ciclando@gmail.com'},
            // {name: 'fulano', email: 'fulano@gmail.com'}
            {name:'Alex Brown', email:'alex@hotmail.com'},
            {name:'Maria  Green', email:'maria@hotmail.com'}
        ])
   res.json({result})
})

mainRouter.get('/users', async (req, res) => {
    const result = await getAllUser();
    res.json(result);
})

mainRouter.get('/user', async (req, res) => {
    const result = await getUserByEmail('joao@gmail.com');

    res.json(result);
})

mainRouter.put('/user', async (req, res) => {
    const result =  await updateUser();

    res.json(result);
})

mainRouter.delete('/user',async (req, res) => {
    const result = await deleteUser();

    res.json(result);
})