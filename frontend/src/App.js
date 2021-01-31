import React, {useState, useEffect }from 'react';

import Header from './components/Header';

import api from './services/api'


//Estilização
import './App.css';


function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => { 
    api.get('/').then(response => {
      setProjects(response.data);
    })
   }, []);

  async function handleAddProject() {
    //setProjects([...projects, `New Project ${Date.now()}`]);

    const response = await api.post('/', {
      title: `New project ${Date.now()}`,
      owner: 'Weverton Icaro'
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects" />
      
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type='button' onClick={handleAddProject}> Adicionar um Projeto</button>
    </>
  );
}

export default App;