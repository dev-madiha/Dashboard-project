import React from 'react'
import PrescriptionTrendsChart from '../../components/PrescriptionTrendsChart'
import MostPrescribedChart from '../../components/MostPrescribed/MostPrescribedChart'
import PrescriptionCategoriesChart from '../../components/PrescriptionCategoriesChart'
const Prescription = () => {
  return (
      <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <MostPrescribedChart />
        <PrescriptionCategoriesChart />
      </div>
      <PrescriptionTrendsChart />
    </div>
  )
}

export default Prescription