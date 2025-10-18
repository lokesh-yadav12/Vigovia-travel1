import React from 'react'
import Input from '../UI/Input'
import DatePicker from '../UI/DatePicker'
import FileUpload from '../UI/FileUpload'
import Button from '../UI/Button'

const DayItinerary = ({ 
  data, 
  errors, 
  updateArrayData, 
  addArrayItem, 
  removeArrayItem,
  updateDayActivity,
  addDayActivity,
  removeDayActivity
}) => {
  const addDay = () => {
    const newDay = {
      dayNumber: data.days.length + 1,
      date: '',
      title: '',
      image: null,
      imagePreview: '',
      morning: [''],
      afternoon: [''],
      evening: ['']
    }
    addArrayItem('days', newDay)
  }

  const removeDay = (index) => {
    if (data.days.length > 1) {
      removeArrayItem('days', index)
      // Update day numbers
      data.days.forEach((day, i) => {
        if (i > index) {
          updateArrayData('days', i - 1, 'dayNumber', i)
        }
      })
    }
  }

  const updateDay = (dayIndex, field, value) => {
    updateArrayData('days', dayIndex, field, value)
  }

  const addActivity = (dayIndex, period) => {
    if (addDayActivity) {
      addDayActivity(dayIndex, period)
    } else {
      // Fallback for compatibility
      const currentActivities = data.days[dayIndex][period]
      if (currentActivities.length < 10) {
        updateArrayData('days', dayIndex, period, [...currentActivities, ''])
      }
    }
  }

  const removeActivity = (dayIndex, period, activityIndex) => {
    if (removeDayActivity) {
      removeDayActivity(dayIndex, period, activityIndex)
    } else {
      // Fallback for compatibility
      const currentActivities = data.days[dayIndex][period]
      if (currentActivities.length > 1) {
        const newActivities = currentActivities.filter((_, i) => i !== activityIndex)
        updateArrayData('days', dayIndex, period, newActivities)
      }
    }
  }

  const updateActivity = (dayIndex, period, activityIndex, value) => {
    if (updateDayActivity) {
      updateDayActivity(dayIndex, period, activityIndex, value)
    } else {
      // Fallback for compatibility
      const currentActivities = [...data.days[dayIndex][period]]
      currentActivities[activityIndex] = value
      updateArrayData('days', dayIndex, period, currentActivities)
    }
  }

  const handleImageUpload = (dayIndex, uploadResult) => {
    if (uploadResult.error) {
      // Handle error
      console.error(uploadResult.error)
      return
    }
    updateDay(dayIndex, 'image', uploadResult.file)
    updateDay(dayIndex, 'imagePreview', uploadResult.imagePreview)
  }

  const renderActivitySection = (dayIndex, period, activities) => {
    const periodLabels = {
      morning: 'Morning Activities',
      afternoon: 'Afternoon Activities',
      evening: 'Evening Activities'
    }

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-text-dark">{periodLabels[period]}</h4>
          <Button
            variant="outline"
            onClick={() => addActivity(dayIndex, period)}
            disabled={activities.length >= 10}
            className="text-xs px-3 py-1"
          >
            + Add Activity
          </Button>
        </div>
        
        <div className="space-y-2">
          {activities.map((activity, activityIndex) => (
            <div key={activityIndex} className="flex items-center gap-2">
              <span className="text-purple-medium font-medium">•</span>
              <Input
                value={activity}
                onChange={(e) => updateActivity(dayIndex, period, activityIndex, e.target.value)}
                placeholder={`Enter ${period} activity`}
                className="mb-0"
              />
              {activities.length > 1 && (
                <Button
                  variant="danger"
                  onClick={() => removeActivity(dayIndex, period, activityIndex)}
                  className="px-2 py-1 text-xs"
                >
                  ×
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {data.days.map((day, dayIndex) => (
        <div key={dayIndex} className="border border-border-gray rounded-lg p-6 bg-bg-off-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-purple-dark">
              Day {day.dayNumber}
            </h3>
            {data.days.length > 1 && (
              <Button
                variant="danger"
                onClick={() => removeDay(dayIndex)}
                className="px-3 py-1 text-sm"
              >
                Remove Day
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <DatePicker
                label="Date"
                value={day.date}
                onChange={(value) => updateDay(dayIndex, 'date', value)}
                required
                error={errors[`day${dayIndex}Date`]}
              />

              <Input
                label="Day Title/Summary"
                value={day.title}
                onChange={(e) => updateDay(dayIndex, 'title', e.target.value)}
                placeholder="Arrival In Singapore & City Exploration"
                required
                maxLength={100}
                error={errors[`day${dayIndex}Title`]}
              />
            </div>

            <div>
              <FileUpload
                label="Day Image"
                value={{ imagePreview: day.imagePreview }}
                onChange={(result) => handleImageUpload(dayIndex, result)}
                required
                error={errors[`day${dayIndex}Image`]}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              {renderActivitySection(dayIndex, 'morning', day.morning)}
            </div>
            <div>
              {renderActivitySection(dayIndex, 'afternoon', day.afternoon)}
            </div>
            <div>
              {renderActivitySection(dayIndex, 'evening', day.evening)}
            </div>
          </div>
        </div>
      ))}

      <div className="text-center">
        <Button
          variant="secondary"
          onClick={addDay}
          className="px-6"
        >
          + Add Another Day
        </Button>
      </div>

      {/* Days Summary */}
      {data.days.length > 0 && (
        <div className="mt-8 p-4 bg-purple-lighter rounded-lg border border-purple-light">
          <h3 className="font-semibold text-purple-dark mb-2">Itinerary Summary</h3>
          <div className="text-sm text-text-dark">
            <p><strong>Total Days:</strong> {data.days.length}</p>
            <div className="mt-2">
              {data.days.map((day, index) => (
                <div key={index} className="flex items-center gap-2 mb-1">
                  <span className="font-medium">Day {day.dayNumber}:</span>
                  <span>{day.date || 'Date not set'}</span>
                  <span>-</span>
                  <span>{day.title || 'Title not set'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DayItinerary