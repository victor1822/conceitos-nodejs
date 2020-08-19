const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // DONE
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // DONE
  const {title, url, techs} = request.body;

  const repository = {
    title,
    url,
    techs,
    likes: 0,
    id: uuid()
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // DONE
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id===id);

  if(repositoryIndex < 0) return response.status(400).send()

  const { title, url, techs } = request.body;

  const repository = {
    title,
    url,
    techs,
    id: repositories[repositoryIndex].id,
    likes: repositories[repositoryIndex].likes
  }
  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // DONE
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if(repositoryIndex < 0) return response.status(400).send();

  repositories.splice(repositoryIndex,1);

  return response.status(204).send();
  
});

app.post("/repositories/:id/like", (request, response) => {
  // DONE
  const { id } = request.params;

  const repository = repositories.find(thisrepository => thisrepository.id===id);

  if(!repository) return response.status(400).send();

  repository.likes++;

  return response.json(repository);
});

module.exports = app;
