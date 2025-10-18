import React from 'react'
import Input from '../UI/Input'
import VisaForm from './VisaForm'

const PaymentForm = ({ data, errors, updateFormData, updateNestedArrayData }) => {
  const handlePaymentChange = (field, value) => {
    updateFormData('payment', field, value)
  }

  const handleInstallmentChange = (index, field, value) => {
    if (updateNestedArrayData) {
      updateNestedArrayData('payment', 'installments', index, field, value)
    } else {
      // Fallback for compatibility
      console.warn('updateNestedArrayData not available, using direct update')
    }
  }

  const formatCurrency = (amount) => {
    if (!amount || amount === 'Remaining') return amount
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-8">
      {/* Payment Information */}
      <div className="bg-white border border-border-gray rounded-lg p-6">
        <h3 className="text-xl font-semibold text-purple-dark mb-6">Payment Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Input
            label="Total Amount (₹)"
            type="number"
            value={data.payment.totalAmount}
            onChange={(e) => handlePaymentChange('totalAmount', parseInt(e.target.value) || 0)}
            placeholder="900000"
            required
          />

          <Input
            label="Number of Travelers (for payment)"
            type="number"
            value={data.payment.pax}
            onChange={(e) => handlePaymentChange('pax', parseInt(e.target.value) || 0)}
            placeholder="3"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-text-dark mb-2">
            TCS Status <span className="text-red-500">*</span>
          </label>
          <select
            value={data.payment.tcs}
            onChange={(e) => handlePaymentChange('tcs', e.target.value)}
            className="w-full px-4 py-2 border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-medium focus:border-transparent"
            required
          >
            <option value="Not Collected">Not Collected</option>
            <option value="Collected">Collected</option>
          </select>
        </div>

        {/* Payment Preview */}
        {data.payment.totalAmount > 0 && data.payment.pax > 0 && (
          <div className="p-4 bg-purple-lighter rounded-lg border border-purple-light">
            <h4 className="font-semibold text-purple-dark mb-2">Payment Summary</h4>
            <p className="text-sm text-text-dark">
              <strong>Total:</strong> {formatCurrency(data.payment.totalAmount)} for {data.payment.pax} Pax (Inclusive of GST)
            </p>
            <p className="text-sm text-text-dark">
              <strong>TCS:</strong> {data.payment.tcs}
            </p>
          </div>
        )}
      </div>

      {/* Installment Details */}
      <div className="bg-white border border-border-gray rounded-lg p-6">
        <h3 className="text-xl font-semibold text-purple-dark mb-6">Installment Plan</h3>
        
        <div className="space-y-4">
          {data.payment.installments.map((installment, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border-light-purple rounded-lg">
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">
                  Installment {index + 1} Amount (₹)
                </label>
                {index < 2 ? (
                  <Input
                    type="number"
                    value={installment.amount}
                    onChange={(e) => handleInstallmentChange(index, 'amount', parseInt(e.target.value) || 0)}
                    placeholder={index === 0 ? "350000" : "400000"}
                    className="mb-0"
                  />
                ) : (
                  <div className="w-full px-4 py-2 border border-border-gray rounded-lg bg-gray-50 text-text-dark">
                    {typeof installment.amount === 'number' ? formatCurrency(installment.amount) : installment.amount}
                  </div>
                )}
              </div>

              <Input
                label={`Installment ${index + 1} Due Date`}
                value={installment.dueDate}
                onChange={(e) => handleInstallmentChange(index, 'dueDate', e.target.value)}
                placeholder={installment.dueDate}
                className="mb-0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Company Details */}
      <div className="bg-white border border-border-gray rounded-lg p-6">
        <h3 className="text-xl font-semibold text-purple-dark mb-6">Company Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company Name"
            value={data.company.name}
            onChange={(e) => updateFormData('company', 'name', e.target.value)}
            required
          />

          <Input
            label="Phone Number"
            value={data.company.phone}
            onChange={(e) => updateFormData('company', 'phone', e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={data.company.email}
            onChange={(e) => updateFormData('company', 'email', e.target.value)}
            required
          />

          <Input
            label="CIN Number"
            value={data.company.cin}
            onChange={(e) => updateFormData('company', 'cin', e.target.value)}
            required
          />
        </div>

        <Input
          label="Registered Address"
          value={data.company.address}
          onChange={(e) => updateFormData('company', 'address', e.target.value)}
          required
          className="mt-4"
        />
      </div>

      {/* Visa Information */}
      <VisaForm 
        data={data}
        errors={errors}
        updateFormData={updateFormData}
      />
    </div>
  )
}

export default PaymentForm