import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface CadastrarTarefaProps {
  onAdicionarTarefa: (tarefa: string) => void;
}

const CadastrarTarefa: React.FC<CadastrarTarefaProps> = ({ onAdicionarTarefa }) => {
  const [tarefa, setTarefa] = useState('');

  const lidarComAdicionarTarefa = () => {
    if (tarefa.trim() === '') return;
    onAdicionarTarefa(tarefa);
    setTarefa('');
  };

  return (
    <View style={styles.containerInput}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma tarefa"
        value={tarefa}
        onChangeText={text => setTarefa(text)}
      />
      <Button title="Adicionar" onPress={lidarComAdicionarTarefa} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default CadastrarTarefa;

