import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValue] = useState(defaults);

  function updateValue(e) {
    let value = e.target.value;
    if (e.target.type === 'number') {
      value = parseInt(value);
    }
    setValue({
      ...values,
      [e.target.name]: value,
    })
  }
  return { values, updateValue };
}
