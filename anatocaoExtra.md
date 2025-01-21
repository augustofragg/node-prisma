## Anotacoes extras

- Relacao OR
```js
    const users = await prisma.user.findMany({
        where: {
            OR:[
                {
                    email:{
                        endsWith:'@hotmail.com'
                    },
                    name: {
                        startsWith:'Joao'
                    }
                },
                {
                    email: {
                        endsWith:'@gmail.com'
                    }
                }
            ]
        },
    });
```
- Relacao every e some
```js
    const users = await prisma.user.findMany({
        where: {
            posts: {
                some: {
                    title: {
                        startsWith:'Titulo'
                    }
                }
            }
        },
    });
    return users;
```
- Inclusão de itens via relacionamento

```js
const users = await prisma.user.findMany({
        select: {
            id:true,
            name:true,
            email:true,
            status:true,
            _count: {
                select: {
                    posts:true
                }
            },
            posts:{
                select: {
                    id:true,
                    title:true,
                    body:true
                }
            }
        }
    });
```
- Ordenaçãode de itens
```js
const users = await prisma.user.findMany({
        orderBy: {
            name: 'asc'
        }
    });
```