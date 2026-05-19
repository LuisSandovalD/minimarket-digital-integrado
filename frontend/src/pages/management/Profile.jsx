import React from 'react';
import DashboardLayout from '../../dashboard/components/layout/DashboardLayout';
import DashboardContainer from '../../dashboard/components/layout/DashboardContainer';

const Profile = () => {
  return (
    <DashboardLayout>
      <DashboardContainer>
        <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>
        <p className="mt-4 text-gray-600">Configuración del perfil - Próximamente</p>
      </DashboardContainer>
    </DashboardLayout>
  );
};

export default Profile;
