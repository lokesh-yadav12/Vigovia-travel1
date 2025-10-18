import React from 'react'
import Input from '../UI/Input'

const VisaForm = ({ data, errors, updateFormData }) => {
  const handleVisaChange = (field, value) => {
    updateFormData('visa', field, value)
  }

  return (
    <div className="bg-white border border-border-gray rounded-lg p-6">
      <h3 className="text-xl font-semibold text-purple-dark mb-6">Visa Information</h3>
      <p className="text-sm text-text-medium mb-6">
        These fields are optional and can be filled if visa information is available.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="Visa Type"
          value={data.visa.type}
          onChange={(e) => handleVisaChange('type', e.target.value)}
          placeholder="Tourist Visa"
        />

        <Input
          label="Visa Validity"
          value={data.visa.validity}
          onChange={(e) => handleVisaChange('validity', e.target.value)}
          placeholder="30 Days"
        />

        <Input
          label="Processing Date"
          value={data.visa.processingDate}
          onChange={(e) => handleVisaChange('processingDate', e.target.value)}
          placeholder="15 Days"
        />
      </div>

      {/* Visa Summary */}
      {(data.visa.type || data.visa.validity || data.visa.processingDate) && (
        <div className="mt-6 p-4 bg-purple-lighter rounded-lg border border-purple-light">
          <h4 className="font-semibold text-purple-dark mb-2">Visa Summary</h4>
          <div className="text-sm text-text-dark space-y-1">
            {data.visa.type && <p><strong>Type:</strong> {data.visa.type}</p>}
            {data.visa.validity && <p><strong>Validity:</strong> {data.visa.validity}</p>}
            {data.visa.processingDate && <p><strong>Processing:</strong> {data.visa.processingDate}</p>}
          </div>
        </div>
      )}
    </div>
  )
}

export default VisaForm