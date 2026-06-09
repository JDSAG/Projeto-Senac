import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function DisponivelBtn({ ativo: ativoProp, onToggle }) {
  const [ativoLocal, setAtivoLocal] = useState(true);

  const controlled = ativoProp !== undefined;
  const ativo = controlled ? ativoProp : ativoLocal;
  const handlePress = controlled ? onToggle : () => setAtivoLocal((v) => !v);
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
        {ativo ? 'Disponível' : 'Indisponível'}
      </Text>
    </TouchableOpacity>
  );
}
