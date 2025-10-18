import { useState, useCallback, useMemo } from 'react'
import { validateForm, validateCustomer, validateDays, validateFlights, validateHotels, validateActivities, validatePayment, validateCompany } from '../utils/validation'

export const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Validate entire form
  const validateAll = useCallback(() => {
    const allErrors = validateForm(formData)
    setErrors(allErrors)
    return Object.keys(allErrors).length === 0
  }, [formData])

  // Validate specific section
  const validateSection = useCallback((section) => {
    let sectionErrors = {}
    
    switch (section) {
      case 'customer':
        sectionErrors = validateCustomer(formData.customer)
        break
      case 'days':
        sectionErrors = validateDays(formData.days)
        break
      case 'flights':
        sectionErrors = validateFlights(formData.flights)
        break
      case 'hotels':
        sectionErrors = validateHotels(formData.hotels)
        break
      case 'activities':
        sectionErrors = validateActivities(formData.activities)
        break
      case 'payment':
        sectionErrors = validatePayment(formData.payment)
        break
      case 'company':
        sectionErrors = validateCompany(formData.company)
        break
      default:
        break
    }

    setErrors(prev => ({
      ...prev,
      ...sectionErrors
    }))

    return Object.keys(sectionErrors).length === 0
  }, [formData])

  // Mark field as touched
  const touchField = useCallback((fieldName) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }))
  }, [])

  // Clear specific error
  const clearError = useCallback((fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[fieldName]
      return newErrors
    })
  }, [])

  // Clear all errors
  const clearAllErrors = useCallback(() => {
    setErrors({})
    setTouched({})
  }, [])

  // Get error for specific field
  const getFieldError = useCallback((fieldName) => {
    return touched[fieldName] ? errors[fieldName] : null
  }, [errors, touched])

  // Check if field has error
  const hasFieldError = useCallback((fieldName) => {
    return Boolean(touched[fieldName] && errors[fieldName])
  }, [errors, touched])

  // Check if section has errors
  const hasSectionErrors = useCallback((section) => {
    const sectionErrorKeys = Object.keys(errors).filter(key => 
      key.toLowerCase().includes(section.toLowerCase())
    )
    return sectionErrorKeys.length > 0
  }, [errors])

  // Get section completion status
  const getSectionStatus = useMemo(() => {
    const status = {
      customer: {
        isValid: !hasSectionErrors('customer'),
        isComplete: formData.customer.name && formData.customer.destination && 
                   formData.customer.title && formData.customer.departureDate && 
                   formData.customer.arrivalDate && formData.customer.travelers > 0
      },
      days: {
        isValid: !hasSectionErrors('day'),
        isComplete: formData.days.length > 0 && formData.days.every(day => 
          day.date && day.title && day.image
        )
      },
      flights: {
        isValid: !hasSectionErrors('flight'),
        isComplete: formData.flights.length > 0 && formData.flights.some(flight => 
          flight.airline && flight.flightNumber
        )
      },
      hotels: {
        isValid: !hasSectionErrors('hotel'),
        isComplete: formData.hotels.length > 0 && formData.hotels.some(hotel => 
          hotel.name && hotel.city
        )
      },
      activities: {
        isValid: !hasSectionErrors('activity'),
        isComplete: formData.activities.filter(activity => 
          activity.city && activity.name
        ).length >= 15
      },
      payment: {
        isValid: !hasSectionErrors('payment') && !hasSectionErrors('company'),
        isComplete: formData.payment.totalAmount > 0 && formData.payment.pax > 0 &&
                   formData.company.name && formData.company.email
      }
    }

    return status
  }, [formData, hasSectionErrors])

  // Get overall form status
  const formStatus = useMemo(() => {
    const sections = Object.values(getSectionStatus)
    const completedSections = sections.filter(section => section.isComplete).length
    const validSections = sections.filter(section => section.isValid).length
    
    return {
      isValid: Object.keys(errors).length === 0,
      isComplete: sections.every(section => section.isComplete),
      completionPercentage: Math.round((completedSections / sections.length) * 100),
      validationPercentage: Math.round((validSections / sections.length) * 100),
      totalErrors: Object.keys(errors).length
    }
  }, [errors, getSectionStatus])

  return {
    errors,
    touched,
    validateAll,
    validateSection,
    touchField,
    clearError,
    clearAllErrors,
    getFieldError,
    hasFieldError,
    hasSectionErrors,
    getSectionStatus,
    formStatus,
    setErrors
  }
}