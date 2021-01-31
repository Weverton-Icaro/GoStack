const express = require('express');
const cors = require('cors');
const { v4: uuidv4, validate: isUuid } = require('uuid');

const app = express()

app.use(cors());

app.use(express.json())

const projects = [];

function logRequest(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid project ID.' })
  }

  return next();
}

app.use(logRequest);

app.use('/:id', validateProjectId);

app.get('/', (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post('/', (request, response) => {
  const { title, owner} = request.body;

  const project = { id: uuidv4(), title, owner };

  projects.push(project)

  return response.json(project)
});

app.put('/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found!'})
  }

  const project = {
    id,
    title,
    owner
  };

  projects[projectIndex] = project;


  return response.json(project);
});

app.delete('/:id', (request, response) => {
  const { id } = request.params;
  
  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found!'})
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
  
});

app.listen(3335, () => {
  console.log('--> Server ON! <---')
});