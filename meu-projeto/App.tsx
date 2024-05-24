import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import CadastrarTarefa from './components/CadastrarTarefa';
import ListaTarefas from './components/ListaTarefas';
import Tarefa from './components/Tarefa';

interface TarefaItem {
  id: number;
  tarefa: string;
  concluida: boolean;
}

export default function App() {
  const [tarefas, setTarefas] = useState<TarefaItem[]>([]);

  const adicionarTarefa = (novaTarefa: string) => {
    setTarefas([...tarefas, { id: Date.now(), tarefa: novaTarefa, concluida: false }]);
  };

  const removerTarefa = (id: number) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  };

  const alternarConclusaoTarefa = (id: number) => {
    setTarefas(tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  };

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