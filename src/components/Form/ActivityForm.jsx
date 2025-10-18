import React from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'

const ActivityForm = ({ data, errors, updateArrayData, addArrayItem, removeArrayItem }) => {
  const activityTypes = [
    'Nature/Sightseeing',
    'Airlines Standard',
    'Adventure',
    'Cultural',
    'Other'
  ]

  const addActivity = () => {
    const newActivity = {
      city: '',
      name: '',
      type: '',
      time: ''
    }
    addArrayItem('activities', newActivity)
  }

  const removeActivity = (index) => {
    if (data.activities.length > 3) {
      removeArrayItem('activities', index)
    }
  }

  const updateActivity = (index, field, value) => {
    updateArrayData('activities', index, field, value)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {data.activities.map((activity, index) => (
          <div key={index} className="border border-border-gray rounded-lg p-4 bg-bg-off-white">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-purple-dark">Activity {index + 1}</h4>
              {data.activities.length > 3 && (
                <Button
                  variant="danger"
                  onClick={() => removeActivity(index)}
                  className="px-2 py-1 text-xs"
                >
                  Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                label="City"
                value={activity.city}
                onChange={(e) => updateActivity(index, 'city', e.target.value)}
                placeholder="Rio De Janeiro"
                required
                className="mb-0"
              />

              <Input
                label="Activity Name"
                value={activity.name}
                onChange={(e) => updateActivity(index, 'name', e.target.value)}
                placeholder="Sydney Harbour Cruise & Taronga Zoo"
                required
                className="mb-0"
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-text-dark mb-2">
                  Activity Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={activity.type}
                  onChange={(e) => updateActivity(index, 'type', e.target.value)}
                  className="w-full px-4 py-2 border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-medium focus:border-transparent"
                  required
                >
                  <option value="">Select type</option>
                  {activityTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <Input
                label="Time Required"
                value={activity.time}
                onChange={(e) => updateActivity(index, 'time', e.target.value)}
                placeholder="2-3 Hours"
                required
                className="mb-0"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button
          variant="secondary"
          onClick={addActivity}
          className="px-6"
        >
          + Add Activity
        </Button>
      </div>

      <div className="mt-6 p-4 bg-purple-lighter rounded-lg border border-purple-light">
        <h3 className="font-semibold text-purple-dark mb-2">Activity Summary</h3>
        <p className="text-sm text-text-dark">
          Total Activities: {data.activities.filter(a => a.name).length} / {data.activities.length}
        </p>
        <p className="text-xs text-text-medium mt-1">
          Minimum 15 activities recommended for complete itinerary
        </p>
      </div>
    </div>
  )
}

export default ActivityForm