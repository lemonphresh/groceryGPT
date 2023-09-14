import { useCallback, useState } from 'react';

const useForm = (onSubmitCb, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const onSubmitCallback = useCallback(() => onSubmitCb(), [onSubmitCb]);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onSubmitCallback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};

export default useForm;
