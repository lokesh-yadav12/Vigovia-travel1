import { useState, useCallback, useEffect } from 'react'
import { DEFAULT_COMPANY_INFO, DEFAULT_INSTALLMENT_DUE_DATES } from '../utils/constants'
import { calculateNights } from '../utils/formatting'

// Initial form state
const createInitialState = () => ({
  customer: {
    name: '',
    destination: '',
    title: '',
    days: 0,
    nights: 0,
    departureFrom: '',
    departureDate: '',
    arrivalDate: '',
    travelers: 0
  },
  days: [
    {
      dayNumber: 1,
      date: '',
      title: '',
      image: null,
      imagePreview: '',
      morning: [''],
      afternoon: [''],
      evening: ['']
    }
  ],
  flights: [
    {
      date: '',
      airline: '',
      flightNumber: '',
      from: '',
      fromCode: '',
      to: '',
      toCode: ''
    }
  ],
  hotels: [
    {
      city: '',
      checkIn: '',
      checkOut: '',
      nights: 0,
      name: ''
    }
  ],
  activities: Array(7).fill().map(() => ({
    city: '',
    name: '',
    type: '',
    time: ''
  })),
  payment: {
    totalAmount: 0,
    pax: 0,
    tcs: 'Not Collected',
    installments: DEFAULT_INSTALLMENT_DUE_DATES.map((dueDate, index) => ({
      amount: index < 2 ? 0 : 'Remaining',
      dueDate
    }))
  },
  visa: {
    type: '',
    validity: '',
    processingDate: ''
  },
  company: { ...DEFAULT_COMPANY_INFO }
})

export const useFormState = (initialData = null) => {
  const [formData, setFormData] = useState(() => 
    initialData || createInitialState()
  )
  const [isDirty, setIsDirty] = useState(false)

  // Update form data for simple fields
  const updateFormData = useCallback((section, field, value) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }

      // Auto-calculate remaining installment amount
      if (section === 'payment' && (field === 'totalAmount' || field.startsWith('installments'))) {
        const totalAmount = field === 'totalAmount' ? value : newData.payment.totalAmount
        const inst1 = newData.payment.installments[0]?.amount || 0
        const inst2 = newData.payment.installments[1]?.amount || 0
        const remaining = Math.max(0, totalAmount - inst1 - inst2)
        
        newData.payment.installments[2] = {
          ...newData.payment.installments[2],
          amount: remaining > 0 ? remaining : 'Remaining'
        }
      }

      return newData
    })
    setIsDirty(true)
  }, [])

  // Update array data (for days, flights, hotels, activities)
  const updateArrayData = useCallback((section, index, field, value) => {
    setFormData(prev => {
      const newData = { ...prev }
      const newArray = [...prev[section]]
      
      if (newArray[index]) {
        newArray[index] = {
          ...newArray[index],
          [field]: value
        }

        // Auto-calculate nights for hotels
        if (section === 'hotels' && (field === 'checkIn' || field === 'checkOut')) {
          const hotel = newArray[index]
          const checkIn = field === 'checkIn' ? value : hotel.checkIn
          const checkOut = field === 'checkOut' ? value : hotel.checkOut
          
          if (checkIn && checkOut) {
            newArray[index].nights = calculateNights(checkIn, checkOut)
          }
        }

        newData[section] = newArray
      }

      return newData
    })
    setIsDirty(true)
  }, [])

  // Update nested array data (for installments)
  const updateNestedArrayData = useCallback((section, arrayField, index, field, value) => {
    setFormData(prev => {
      const newData = { ...prev }
      const newArray = [...prev[section][arrayField]]
      
      if (newArray[index]) {
        newArray[index] = {
          ...newArray[index],
          [field]: value
        }

        newData[section] = {
          ...prev[section],
          [arrayField]: newArray
        }

        // Auto-calculate remaining installment amount
        if (section === 'payment' && arrayField === 'installments' && field === 'amount' && index < 2) {
          const totalAmount = newData.payment.totalAmount
          const inst1 = index === 0 ? value : newArray[0]?.amount || 0
          const inst2 = index === 1 ? value : newArray[1]?.amount || 0
          const remaining = Math.max(0, totalAmount - inst1 - inst2)
          
          newArray[2] = {
            ...newArray[2],
            amount: remaining > 0 ? remaining : 'Remaining'
          }
        }
      }

      return newData
    })
    setIsDirty(true)
  }, [])

  // Add new item to array
  const addArrayItem = useCallback((section, newItem) => {
    setFormData(prev => {
      const newData = { ...prev }
      
      // Special handling for days to auto-increment day numbers
      if (section === 'days') {
        const newDay = {
          ...newItem,
          dayNumber: prev.days.length + 1
        }
        newData[section] = [...prev[section], newDay]
      } else {
        newData[section] = [...prev[section], newItem]
      }

      return newData
    })
    setIsDirty(true)
  }, [])

  // Remove item from array
  const removeArrayItem = useCallback((section, index) => {
    setFormData(prev => {
      const newData = { ...prev }
      const newArray = prev[section].filter((_, i) => i !== index)
      
      // Special handling for days to renumber
      if (section === 'days') {
        newArray.forEach((day, i) => {
          day.dayNumber = i + 1
        })
      }

      newData[section] = newArray
      return newData
    })
    setIsDirty(true)
  }, [])

  // Update activity within a day's time period
  const updateDayActivity = useCallback((dayIndex, period, activityIndex, value) => {
    setFormData(prev => {
      const newData = { ...prev }
      const newDays = [...prev.days]
      
      if (newDays[dayIndex] && newDays[dayIndex][period]) {
        const newActivities = [...newDays[dayIndex][period]]
        newActivities[activityIndex] = value
        
        newDays[dayIndex] = {
          ...newDays[dayIndex],
          [period]: newActivities
        }
        
        newData.days = newDays
      }

      return newData
    })
    setIsDirty(true)
  }, [])

  // Add activity to day's time period
  const addDayActivity = useCallback((dayIndex, period) => {
    setFormData(prev => {
      const newData = { ...prev }
      const newDays = [...prev.days]
      
      if (newDays[dayIndex] && newDays[dayIndex][period]) {
        const currentActivities = newDays[dayIndex][period]
        if (currentActivities.length < 10) {
          newDays[dayIndex] = {
            ...newDays[dayIndex],
            [period]: [...currentActivities, '']
          }
          newData.days = newDays
        }
      }

      return newData
    })
    setIsDirty(true)
  }, [])

  // Remove activity from day's time period
  const removeDayActivity = useCallback((dayIndex, period, activityIndex) => {
    setFormData(prev => {
      const newData = { ...prev }
      const newDays = [...prev.days]
      
      if (newDays[dayIndex] && newDays[dayIndex][period]) {
        const currentActivities = newDays[dayIndex][period]
        if (currentActivities.length > 1) {
          newDays[dayIndex] = {
            ...newDays[dayIndex],
            [period]: currentActivities.filter((_, i) => i !== activityIndex)
          }
          newData.days = newDays
        }
      }

      return newData
    })
    setIsDirty(true)
  }, [])

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(createInitialState())
    setIsDirty(false)
  }, [])

  // Load form data from external source
  const loadFormData = useCallback((data) => {
    setFormData(data)
    setIsDirty(false)
  }, [])

  // Get form data as JSON
  const getFormDataJSON = useCallback(() => {
    return JSON.stringify(formData, null, 2)
  }, [formData])

  // Load form data from JSON
  const loadFromJSON = useCallback((jsonString) => {
    try {
      const data = JSON.parse(jsonString)
      setFormData(data)
      setIsDirty(false)
      return true
    } catch (error) {
      console.error('Failed to parse JSON:', error)
      return false
    }
  }, [])

  // Auto-save to localStorage
  useEffect(() => {
    if (isDirty) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem('vigovia-itinerary-draft', JSON.stringify(formData))
      }, 1000) // Debounce auto-save

      return () => clearTimeout(timeoutId)
    }
  }, [formData, isDirty])

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('vigovia-itinerary-draft')
    if (savedData && !initialData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
      } catch (error) {
        console.error('Failed to load saved data:', error)
      }
    }
  }, [initialData])

  return {
    formData,
    isDirty,
    updateFormData,
    updateArrayData,
    updateNestedArrayData,
    addArrayItem,
    removeArrayItem,
    updateDayActivity,
    addDayActivity,
    removeDayActivity,
    resetForm,
    loadFormData,
    getFormDataJSON,
    loadFromJSON
  }
}