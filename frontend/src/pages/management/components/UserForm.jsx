import React, { useState, useEffect } from 'react';
import Input from '../../../components/inputs/Input';
import Button from '../../../components/buttons/ModernButton';
import Select from '../../../components/common/Select';

const UserForm = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'EMPLOYEE',
    phone: '',
    isActive: true
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: user.role || 'EMPLOYEE',
        phone: user.phone || '',
        isActive: user.isActive !== false
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const roleOptions = [
    { value: 'ADMIN', label: 'Administrador' },
    { value: 'MANAGER', label: 'Gerente' },
    { value: 'SUPERVISOR', label: 'Supervisor' },
    { value: 'EMPLOYEE', label: 'Empleado' },
    { value: 'VIEWER', label: 'Solo Lectura' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nombre completo"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Juan Pérez"
      />

      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="juan@example.com"
      />

      {!user && (
        <Input
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required={!user}
          placeholder="Mínimo 8 caracteres"
        />
      )}

      <Select
        label="Rol"
        name="role"
        value={formData.role}
        onChange={handleChange}
        options={roleOptions}
        required
      />

      <Input
        label="Teléfono"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+51 999 999 999"
      />

      <div className="flex items-center">
        <input
          id="isActive"
          name="isActive"
          type="checkbox"
          checked={formData.isActive}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
          Usuario activo
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button type="submit">
          {user ? 'Actualizar' : 'Crear'} Usuario
        </Button>
      </div>
    </form>
  );
};

export default UserForm;