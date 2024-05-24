import { SafeAreaView, StyleSheet } from 'react-native';
import Providers from './Providers';
import CadastrarTarefa from './components/CadastrarTarefa';
import ListaTarefas from './components/ListaTarefas';
import Tarefa from './components/Tarefa';
import { useEstadoGlobal } from './contexts/EstadoGlobal';

export default function App() {
  const { tarefas, adicionarTarefa, editarTarefa, excluirTarefa } = useEstadoGlobal()

  return (
    <Providers>
      <SafeAreaView style={styles.container}>
        <CadastrarTarefa onAdicionarTarefa={adicionarTarefa} />
        <ListaTarefas tarefas={tarefas} />
        {tarefas.map(tarefa => (
          <Tarefa
            key={tarefa.id}
            tarefa={tarefa}
            onDelete={() => excluirTarefa(tarefa.id)}
            onToggle={() => editarTarefa(tarefa.id)}
          />
        ))}
      </SafeAreaView>
    </Providers>
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