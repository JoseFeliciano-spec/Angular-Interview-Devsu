interface IunstructuredErrors {
  variablesError: any;
  form: any;
  key: string;
}

export function unstructuredErrors({
  variablesError,
  form,
  key,
}: IunstructuredErrors) {
  let msg = '';
  const genericControl = form.get(key);
  if (genericControl) {
    Object.keys(variablesError).forEach((key) => {
      if (genericControl.errors?.[key] !== undefined) {
        msg = variablesError[key];
      }
    });
  } else {
    console.log('Control no encontrado');
  }

  return msg;
}
