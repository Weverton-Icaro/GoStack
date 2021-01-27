import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';


export default function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/').then(response => {
      setProjects(response.data);
    });
  }, []);
  
  async function handleAddProject() {
    const response = await api.post('/', {
      title: `Python ${Date.now()}`,
      owner: 'Weverton Icaro'
    });

    const newProject = response.data;

    setProjects([...projects, newProject])
  }

  return (
    <>
      <StatusBar
        barStyle = "light-content"
        backgroundColor = "#7156c1"
        networkActivityIndicatorVisible = {true}
      />
     
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>

      </SafeAreaView>
      

     
     {/* < View style={styles.container}>
        {projects.map(project => (
          <Text style={styles.project} key={project.id}>{project.title}</Text>)
        )}
        </View >*/}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7156c1'
  },
  project: {
    color: '#FFF',
    fontSize: 50,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent:'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});