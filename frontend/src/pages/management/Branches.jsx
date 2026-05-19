import React from 'react';
import DashboardLayout from '../../dashboard/components/layout/DashboardLayout';
import DashboardContainer from '../../dashboard/components/layout/DashboardContainer';

const Branches = () => {
  return (
    <DashboardLayout>
      <DashboardContainer>
        <h1 className="text-2xl font-bold text-gray-900">Sucursales</h1>
        <p className="mt-4 text-gray-600">Gestión de sucursales - Próximamente</p>
      </DashboardContainer>
    </DashboardLayout>
  );
};

export default Branches;
