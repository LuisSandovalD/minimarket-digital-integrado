import React from 'react';
import DashboardLayout from '../../dashboard/components/layout/DashboardLayout';
import DashboardContainer from '../../dashboard/components/layout/DashboardContainer';

const Company = () => {
  return (
    <DashboardLayout>
      <DashboardContainer>
        <h1 className="text-2xl font-bold text-gray-900">Empresa</h1>
        <p className="mt-4 text-gray-600">Configuración de la empresa - Próximamente</p>
      </DashboardContainer>
    </DashboardLayout>
  );
};

export default Company;
