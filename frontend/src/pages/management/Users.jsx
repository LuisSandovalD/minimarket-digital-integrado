import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DashboardLayout from '../../dashboard/components/layout/DashboardLayout';
import DashboardContainer from '../../dashboard/components/layout/DashboardContainer';
import Button from '../../components/buttons/ModernButton';
import Table from '../../components/common/Table';
import Modal from '../../components/modals/Modal';
import UserForm from './components/UserForm';
import { userService } from '../../features/users/services/user.service';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const { user: currentUser } = useSelector(state => state.auth);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getUsers();
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await userService.deleteUser(userId);
        loadUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error al eliminar usuario');
      }
    }
  };

  const handleFormSubmit = async (userData) => {
    try {
      if (editingUser) {
        await userService.updateUser(editingUser.id, userData);
      } else {
        await userService.createUser(userData);
      }
      setShowModal(false);
      loadUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error al guardar usuario');
    }
  };

  const columns = [
    { key: 'name', title: 'Nombre', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { key: 'role', title: 'Rol', sortable: true },
    { key: 'isActive', title: 'Estado', render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {value ? 'Activo' : 'Inactivo'}
      </span>
    )},
    { key: 'createdAt', title: 'Creado', render: (value) => new Date(value).toLocaleDateString() },
    { key: 'actions', title: 'Acciones', render: (_, user) => (
      <div className="flex space-x-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleEditUser(user)}
        >
          Editar
        </Button>
        {user.id !== currentUser?.id && (
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDeleteUser(user.id)}
          >
            Eliminar
          </Button>
        )}
      </div>
    )}
  ];

  return (
    <DashboardLayout>
      <DashboardContainer>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
          <Button onClick={handleCreateUser}>
            Nuevo Usuario
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table
            columns={columns}
            data={users}
            loading={loading}
            emptyMessage="No hay usuarios registrados"
          />
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
        >
          <UserForm
            user={editingUser}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      </DashboardContainer>
    </DashboardLayout>
  );
};

export default Users;
