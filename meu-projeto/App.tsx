import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import CadastrarTarefa from './components/CadastrarTarefa';
import ListaTarefas from './components/ListaTarefas';
import Tarefa from './components/Tarefa';
import axios from 'axios';

interface TarefaItem {
  id: number;
  tarefa: string;
  concluida: boolean;
}

export default function App() {
  const [tarefas, setTarefas] = useState<TarefaItem[]>([]);

  const carregarTarefas = () => {
    axios.get('http://localhost:3000/tarefas').then((response) => {
      setTarefas(response.data)
    }).catch((err) => {
      console.error(err)
    })
  }

  const adicionarTarefa = (novaTarefa: string) => {
    axios.post('http://localhost:3000/tarefa', novaTarefa).then(() => {
      carregarTarefas()
    }).catch((err) => {
      console.error(err)
    })
  };

  const removerTarefa = (id: number) => {
    axios.delete(`http://localhost:3000/tarefas/${id}`).then(() => {
      carregarTarefas()
    }).catch((err) => {
      console.error(err)
    })
  };

  const alternarConclusaoTarefa = (id: number) => {
    setTarefas(tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  };

  useEffect(() => {
    carregarTarefas()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <CadastrarTarefa onAdicionarTarefa={adicionarTarefa} />
      <ListaTarefas tarefas={tarefas} />
      {tarefas.map(tarefa => (
        <Tarefa
          key={tarefa.id}
          tarefa={tarefa}
          onDelete={() => removerTarefa(tarefa.id)}
          onToggle={() => alternarConclusaoTarefa(tarefa.id)}
        />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
});