import React, { useState } from 'react'

const DatePicker = ({
  label,
  value,
  onChange,
  required = false,
  error,
  disabled = false,
  min,
  max,
  className = '',
  helpText,
  size = 'medium',
  ...props
}) => {
  const [focused, setFocused] = useState(false)

  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 text-base',
    large: 'px-5 py-4 text-lg'
  }

  const inputClasses = `
    w-full border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200
    ${error 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
      : focused 
        ? 'border-purple-medium focus:ring-purple-medium focus:border-purple-medium' 
        : 'border-border-gray hover:border-purple-light focus:ring-purple-medium focus:border-purple-medium'
    }
    ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'}
    ${sizes[size]}
    ${className}
  `.trim()

  const labelClasses = `
    block text-sm font-medium mb-2 transition-colors duration-200
    ${error ? 'text-red-600' : focused ? 'text-purple-medium' : 'text-text-dark'}
  `

  // Format date for display (DD/MM/YYYY)
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return ''
    
    // Handle different input formats
    if (dateString.includes('/')) {
      // Already in DD/MM/YYYY format
      return dateString
    } else if (dateString.includes('-')) {
      // Convert YYYY-MM-DD to DD/MM/YYYY
      const [year, month, day] = dateString.split('-')
      return `${day}/${month}/${year}`
    }
    
    // Try to parse as Date object
    try {
      const date = new Date(dateString)
      if (!isNaN(date.getTime())) {
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
      }
    } catch (e) {
      console.warn('Invalid date format:', dateString)
    }
    
    return dateString
  }

  // Convert DD/MM/YYYY to YYYY-MM-DD for input
  const formatDateForInput = (dateString) => {
    if (!dateString) return ''
    
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/')
      if (day && month && year) {
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    } else if (dateString.includes('-')) {
      // Already in YYYY-MM-DD format
      return dateString
    }
    
    return dateString
  }

  // Format min/max dates for input
  const formatMinMaxDate = (dateString) => {
    if (!dateString) return ''
    return formatDateForInput(dateString)
  }

  const handleChange = (e) => {
    const inputDate = e.target.value
    if (inputDate) {
      // Convert YYYY-MM-DD to DD/MM/YYYY for storage
      const [year, month, day] = inputDate.split('-')
      const formattedDate = `${day}/${month}/${year}`
      onChange(formattedDate)
    } else {
      onChange('')
    }
  }

  // Validate date range
  const validateDateRange = (dateValue) => {
    if (!dateValue || !min) return true
    
    const inputDate = new Date(formatDateForInput(dateValue))
    const minDate = new Date(formatDateForInput(min))
    
    return inputDate >= minDate
  }

  // Format date for nice display (e.g., "27th November 2024")
  const formatDateNice = (dateString) => {
    if (!dateString) return ''
    
    try {
      const inputFormatted = formatDateForInput(dateString)
      const date = new Date(inputFormatted)
      
      if (!isNaN(date.getTime())) {
        const day = date.getDate()
        const month = date.toLocaleString('en-US', { month: 'long' })
        const year = date.getFullYear()
        
        const dayWithSuffix = day + (day % 10 === 1 && day !== 11 ? 'st' : 
                                   day % 10 === 2 && day !== 12 ? 'nd' : 
                                   day % 10 === 3 && day !== 13 ? 'rd' : 'th')
        
        return `${dayWithSuffix} ${month} ${year}`
      }
    } catch (e) {
      console.warn('Error formatting date:', e)
    }
    
    return dateString
  }

  return (
    <div className="mb-4">
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          type="date"
          value={formatDateForInput(value)}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          disabled={disabled}
          className={inputClasses}
          min={formatMinMaxDate(min)}
          max={formatMinMaxDate(max)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id || 'date'}-error` : helpText ? `${props.id || 'date'}-help` : undefined}
          {...props}
        />
        
        {/* Calendar icon */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      
      {/* Display formatted date */}
      {value && !error && (
        <p className="mt-1 text-xs text-text-medium">
          Selected: {formatDateNice(value)}
        </p>
      )}
      
      {helpText && !error && (
        <p className="mt-1 text-sm text-text-medium" id={`${props.id || 'date'}-help`}>
          {helpText}
        </p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center" id={`${props.id || 'date'}-error`}>
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

export default DatePicker