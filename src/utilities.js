export const refactorData = doc => {
  return {
    id: doc.id,
    ...doc.data()
  };
};
