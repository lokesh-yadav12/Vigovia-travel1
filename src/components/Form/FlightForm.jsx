import React from 'react'
import Input from '../UI/Input'
import DatePicker from '../UI/DatePicker'
import Button from '../UI/Button'

const FlightForm = ({ data, errors, updateArrayData, addArrayItem, removeArrayItem }) => {
  const addFlight = () => {
    const newFlight = {
      date: '',
      airline: '',
      flightNumber: '',
      from: '',
      fromCode: '',
      to: '',
      toCode: ''
    }
    addArrayItem('flights', newFlight)
  }

  const removeFlight = (index) => {
    if (data.flights.length > 1) {
      removeArrayItem('flights', index)
    }
  }

  const updateFlight = (index, field, value) => {
    if (field === 'fromCode' || field === 'toCode') {
      value = value.toUpperCase().slice(0, 3)
    }
    updateArrayData('flights', index, field, value)
  }

  return (
    <div className="space-y-6">
      {data.flights.map((flight, index) => (
        <div key={index} className="border border-border-gray rounded-lg p-6 bg-bg-off-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-purple-dark">
              Flight {index + 1}
            </h3>
            {data.flights.length > 1 && (
              <Button
                variant="danger"
                onClick={() => removeFlight(index)}
                className="px-3 py-1 text-sm"
              >
                Remove Flight
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DatePicker
              label="Flight Date"
              value={flight.date}
              onChange={(value) => updateFlight(index, 'date', value)}
              required
            />

            <Input
              label="Airline Name"
              value={flight.airline}
              onChange={(e) => updateFlight(index, 'airline', e.target.value)}
              placeholder="Air India"
              required
            />

            <Input
              label="Flight Number"
              value={flight.flightNumber}
              onChange={(e) => updateFlight(index, 'flightNumber', e.target.value)}
              placeholder="AX-123"
              required
            />

            <Input
              label="Departure Airport"
              value={flight.from}
              onChange={(e) => updateFlight(index, 'from', e.target.value)}
              placeholder="Delhi"
              required
            />

            <Input
              label="Departure IATA Code"
              value={flight.fromCode}
              onChange={(e) => updateFlight(index, 'fromCode', e.target.value)}
              placeholder="DEL"
              maxLength={3}
              required
            />

            <Input
              label="Arrival Airport"
              value={flight.to}
              onChange={(e) => updateFlight(index, 'to', e.target.value)}
              placeholder="Singapore"
              required
            />

            <Input
              label="Arrival IATA Code"
              value={flight.toCode}
              onChange={(e) => updateFlight(index, 'toCode', e.target.value)}
              placeholder="SIN"
              maxLength={3}
              required
            />
          </div>
        </div>
      ))}

      <div className="text-center">
        <Button
          variant="secondary"
          onClick={addFlight}
          className="px-6"
        >
          + Add Another Flight
        </Button>
      </div>

      {errors.flights && (
        <p className="text-red-600 text-sm">{errors.flights}</p>
      )}
    </div>
  )
}

export default FlightForm