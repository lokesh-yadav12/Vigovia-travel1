import React from 'react'
import Input from '../UI/Input'
import DatePicker from '../UI/DatePicker'

const CustomerDetails = ({ data, errors, updateFormData, getFieldError }) => {
  const handleChange = (field, value) => {
    updateFormData('customer', field, value)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Customer Name"
          value={data.customer.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter customer name (e.g., Rahul)"
          required
          error={getFieldError ? getFieldError('customerName') : errors.customerName}
          maxLength={100}
        />

        <Input
          label="Destination"
          value={data.customer.destination}
          onChange={(e) => handleChange('destination', e.target.value)}
          placeholder="Enter destination (e.g., Singapore)"
          required
          error={getFieldError ? getFieldError('destination') : errors.destination}
          maxLength={100}
        />
      </div>

      <Input
        label="Trip Title"
        value={data.customer.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Enter trip description (e.g., Singapore Itinerary)"
        required
        error={getFieldError ? getFieldError('title') : errors.title}
        maxLength={100}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="Number of Days"
          type="number"
          value={data.customer.days}
          onChange={(e) => handleChange('days', parseInt(e.target.value) || 0)}
          placeholder="4"
          required
          min={1}
          max={30}
          error={getFieldError ? getFieldError('days') : errors.days}
        />

        <Input
          label="Number of Nights"
          type="number"
          value={data.customer.nights}
          onChange={(e) => handleChange('nights', parseInt(e.target.value) || 0)}
          placeholder="3"
          required
          min={0}
          max={29}
          error={getFieldError ? getFieldError('nights') : errors.nights}
        />

        <Input
          label="Number of Travelers"
          type="number"
          value={data.customer.travelers}
          onChange={(e) => handleChange('travelers', parseInt(e.target.value) || 0)}
          placeholder="4"
          required
          min={1}
          max={50}
          error={getFieldError ? getFieldError('travelers') : errors.travelers}
        />
      </div>

      <Input
        label="Departure From"
        value={data.customer.departureFrom}
        onChange={(e) => handleChange('departureFrom', e.target.value)}
        placeholder="Mumbai"
        required
        error={getFieldError ? getFieldError('departureFrom') : errors.departureFrom}
        maxLength={100}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DatePicker
          label="Departure Date"
          value={data.customer.departureDate}
          onChange={(value) => handleChange('departureDate', value)}
          required
          error={getFieldError ? getFieldError('departureDate') : errors.departureDate}
        />

        <DatePicker
          label="Arrival Date"
          value={data.customer.arrivalDate}
          onChange={(value) => handleChange('arrivalDate', value)}
          required
          error={getFieldError ? getFieldError('arrivalDate') : errors.arrivalDate}
          min={data.customer.departureDate}
        />
      </div>

      {/* Trip Summary Preview */}
      {data.customer.name && data.customer.destination && (
        <div className="mt-8 p-4 bg-purple-lighter rounded-lg border border-purple-light">
          <h3 className="font-semibold text-purple-dark mb-2">Trip Summary Preview</h3>
          <div className="text-sm text-text-dark">
            <p><strong>Customer:</strong> {data.customer.name}</p>
            <p><strong>Destination:</strong> {data.customer.destination}</p>
            <p><strong>Duration:</strong> {data.customer.days} Days, {data.customer.nights} Nights</p>
            <p><strong>Travelers:</strong> {data.customer.travelers} people</p>
            {data.customer.departureDate && data.customer.arrivalDate && (
              <p><strong>Travel Dates:</strong> {data.customer.departureDate} to {data.customer.arrivalDate}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerDetails