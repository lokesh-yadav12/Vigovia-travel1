import React from 'react'
import Input from '../UI/Input'
import DatePicker from '../UI/DatePicker'
import Button from '../UI/Button'

const HotelForm = ({ data, errors, updateArrayData, addArrayItem, removeArrayItem }) => {
  const addHotel = () => {
    const newHotel = {
      city: '',
      checkIn: '',
      checkOut: '',
      nights: 0,
      name: ''
    }
    addArrayItem('hotels', newHotel)
  }

  const removeHotel = (index) => {
    if (data.hotels.length > 1) {
      removeArrayItem('hotels', index)
    }
  }

  const updateHotel = (index, field, value) => {
    updateArrayData('hotels', index, field, value)
    
    // Auto-calculate nights when dates change
    if (field === 'checkIn' || field === 'checkOut') {
      const hotel = data.hotels[index]
      const checkIn = field === 'checkIn' ? value : hotel.checkIn
      const checkOut = field === 'checkOut' ? value : hotel.checkOut
      
      if (checkIn && checkOut) {
        const checkInDate = new Date(checkIn.split('/').reverse().join('-'))
        const checkOutDate = new Date(checkOut.split('/').reverse().join('-'))
        const nights = Math.max(0, Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)))
        updateArrayData('hotels', index, 'nights', nights)
      }
    }
  }

  return (
    <div className="space-y-6">
      {data.hotels.map((hotel, index) => (
        <div key={index} className="border border-border-gray rounded-lg p-6 bg-bg-off-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-purple-dark">
              Hotel {index + 1}
            </h3>
            {data.hotels.length > 1 && (
              <Button
                variant="danger"
                onClick={() => removeHotel(index)}
                className="px-3 py-1 text-sm"
              >
                Remove Hotel
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Input
              label="City"
              value={hotel.city}
              onChange={(e) => updateHotel(index, 'city', e.target.value)}
              placeholder="Singapore"
              required
            />

            <DatePicker
              label="Check-in Date"
              value={hotel.checkIn}
              onChange={(value) => updateHotel(index, 'checkIn', value)}
              required
            />

            <DatePicker
              label="Check-out Date"
              value={hotel.checkOut}
              onChange={(value) => updateHotel(index, 'checkOut', value)}
              required
              min={hotel.checkIn}
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-text-dark mb-2">
                Number of Nights
              </label>
              <div className="w-full px-4 py-2 border border-border-gray rounded-lg bg-gray-50 text-text-dark">
                {hotel.nights || 0}
              </div>
            </div>
          </div>

          <Input
            label="Hotel Name"
            value={hotel.name}
            onChange={(e) => updateHotel(index, 'name', e.target.value)}
            placeholder="Super Townhouse Oak Vashi Ponmeni Blue Diamond"
            maxLength={100}
            required
          />
        </div>
      ))}

      <div className="text-center">
        <Button
          variant="secondary"
          onClick={addHotel}
          className="px-6"
        >
          + Add Another Hotel
        </Button>
      </div>

      {errors.hotels && (
        <p className="text-red-600 text-sm">{errors.hotels}</p>
      )}
    </div>
  )
}

export default HotelForm