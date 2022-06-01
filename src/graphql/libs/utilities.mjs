import getFieldNames from 'graphql-list-fields';

const getFields = info => {
  const primaryFields = getFieldNames(info)
    .filter(field => !field.includes('.'));

  const secondaryFields = getFieldNames(info)
    .filter(field => field.includes('.'))
    .map(field => field.split('.')[1]);

  return [primaryFields, secondaryFields];
};

export { getFields };
