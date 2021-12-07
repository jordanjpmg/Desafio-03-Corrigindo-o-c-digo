const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const updatedRepository = request.body;

  const repos = repositories.find(repository => repository.id === id);
  repositoryIndex = repositories.indexOf(repos);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  if(updatedRepository.likes){
    updatedRepository.likes = repos.likes;
  }
  const repository = { ...repositories[repositoryIndex], ...updatedRepository };
  repositories[repositoryIndex] = repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const repositoryIndex = repositories.find(repository => repository.id === id);
  const Index = repositories.indexOf(repositoryIndex);
  console.log(Index);
  
  console.log(repositoryIndex);

  if (!repositoryIndex) {
    return response.status(404).json({ error: "Repository not found" });
  }
  repositories.splice(Index, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repository = repositories.find(repository => repository.id === id);
  console.log(repository);
  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }
  repository.likes += 1;
  console.log(repository);
  return response.json(repository);

});

module.exports = app;
