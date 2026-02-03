export const filterUpdateData = (data: any) => {
  return Object.keys(data).reduce((acc, key) => {
    if (data[key] !== undefined) {
      acc[key] = data[key];
    }
    return acc;
  }, {} as any);
};