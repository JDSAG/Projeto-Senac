import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import BASE_URL from '../services/api'; 

export default function DisponivelBtn({itemId, ativo: ativoProp, onToggle }) {
  const [ativoLocal, setAtivoLocal] = useState(true);

  const controlled = ativoProp !== undefined;
  const ativo = controlled ? ativoProp : ativoLocal;
  const handlePress = async () => {
    try {
      const res = await fetch(`${BASE_URL}/cardapio/${itemId}/disponibilidade`, {
        method: 'PATCH',
      });
      const data = await res.json();
      setAtivoLocal(data.ativo);  // atualiza com o valor real do banco
      onToggle?.(data.ativo);
    } catch (err) {
      console.error('Erro ao atualizar disponibilidade:', err);
    }
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: ativo ? 'green' : 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 0,
        marginBottom: 10,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#fff' }}>
        {ativo ? 'Disponivel' : 'Indisponivel'}
      </Text>
    </TouchableOpacity>
  );
}
