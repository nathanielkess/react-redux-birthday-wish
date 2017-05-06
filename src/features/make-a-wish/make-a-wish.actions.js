

export const onUpdateCount = newNumber => 
  ({ 
    type: 'COUNT_UPDATED', 
    payload: newNumber,
  });