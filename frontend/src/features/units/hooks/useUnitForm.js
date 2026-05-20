import { useState } from "react";

const initialState = {
  name: "",
  abbreviation: "",
  type: "",
  conversionFactor: 1,
};

export const useUnitForm = () => {
  const [form, setForm] = useState(initialState);

  const resetForm = () => {
    setForm(initialState);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return {
    form,
    setForm,
    resetForm,
    handleChange,
  };
};
