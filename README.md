# kj-tutorial

Tutorial de testes com Karma e Jasmine

## Como instalar/executar

### Dependencias necessárias

- [node & npm](https://nodejs.org/en/download/)
- [angular-cli](https://cli.angular.io/)

### Instalação

`git clone https://github.com/edujtm/kj-tutorial.git`

**Backend**

- `chdir backend`
- `npm install`
- `npm run build`
- `npm run start`

**Frontend**

- `chdir frontend`
- `npm install`
- `ng serve`

É necessário executar o backend e o frontend em terminais separados ou executar o backend em background.

Se tudo ocorrer corretamente, a aplicação deve estar rodando em `http://localhost:4200/` e o backend em `http://localhost:4000/`.

## Estrutura do App

### Frontend
```
frontend/src/app/
├── app.component.css
├── app.component.html
├── app.component.ts
├── app.module.ts
├── app-routing.module.ts
├── components
│   ├── todo-form
│   │   ├── todo-form.component.css
│   │   ├── todo-form.component.html
│   │   ├── todo-form.component.spec.ts
│   │   └── todo-form.component.ts
│   └── todo-list
│       ├── todo-list.component.css
│       ├── todo-list.component.html
│       ├── todo-list.component.spec.ts
│       └── todo-list.component.ts
├── models
│   └── todo.model.ts
├── services
│   ├── todos.service.spec.ts
│   └── todos.service.ts
└── utils
    ├── int-route-constraint.guard.ts
    └── store.ts
```

### Backend

```
backend/src/
├── app.ts
├── controllers
│   └── todos
│       └── index.ts
├── models
│   └── todo.ts
├── routes
│   └── index.ts
└── types
    └── todo.ts
```

Os arquivos de testes que serão utilizados são `todos.service.spec.ts` e `todo-list.component.spec.ts`.
