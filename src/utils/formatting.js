// Date formatting utilities
export const formatDate = {
  // Convert DD/MM/YYYY to display format
  toDisplay: (dateString) => {
    if (!dateString) return ''
    
    try {
      if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/')
        const date = new Date(year, month - 1, day)
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric'
        })
      }
      return dateString
    } catch (e) {
      return dateString
    }
  },

  // Convert to nice format (27th November 2024)
  toNice: (dateString) => {
    if (!dateString) return ''
    
    try {
      let date
      if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/')
        date = new Date(year, month - 1, day)
      } else {
        date = new Date(dateString)
      }
      
      if (!isNaN(date.getTime())) {
        const day = date.getDate()
        const month = date.toLocaleString('en-US', { month: 'long' })
        const year = date.getFullYear()
        
        const dayWithSuffix = day + (
          day % 10 === 1 && day !== 11 ? 'st' : 
          day % 10 === 2 && day !== 12 ? 'nd' : 
          day % 10 === 3 && day !== 13 ? 'rd' : 'th'
        )
        
        return `${dayWithSuffix} ${month} ${year}`
      }
    } catch (e) {
      console.warn('Error formatting date:', e)
    }
    
    return dateString
  },

  // Convert to flight format (Thu 10 Jan'24)
  toFlightFormat: (dateString) => {
    if (!dateString) return ''
    
    try {
      let date
      if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/')
        date = new Date(year, month - 1, day)
      } else {
        date = new Date(dateString)
      }
      
      if (!isNaN(date.getTime())) {
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
        const day = date.getDate()
        const month = date.toLocaleDateString('en-US', { month: 'short' })
        const year = date.getFullYear().toString().slice(-2)
        
        return `${dayName} ${day} ${month}'${year}`
      }
    } catch (e) {
      console.warn('Error formatting flight date:', e)
    }
    
    return dateString
  },

  // Convert DD/MM/YYYY to YYYY-MM-DD for input
  toInputFormat: (dateString) => {
    if (!dateString) return ''
    
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/')
      if (day && month && year) {
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    } else if (dateString.includes('-')) {
      return dateString // Already in YYYY-MM-DD format
    }
    
    return dateString
  },

  // Convert YYYY-MM-DD to DD/MM/YYYY
  fromInputFormat: (dateString) => {
    if (!dateString) return ''
    
    if (dateString.includes('-')) {
      const [year, month, day] = dateString.split('-')
      if (year && month && day) {
        return `${day}/${month}/${year}`
      }
    }
    
    return dateString
  }
}

// Currency formatting utilities
export const formatCurrency = {
  // Format number to Indian Rupee with commas
  toINR: (amount) => {
    if (!amount || amount === 'Remaining') return amount
    
    try {
      const number = typeof amount === 'string' ? parseFloat(amount) : amount
      if (isNaN(number)) return amount
      
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(number)
    } catch (e) {
      return amount
    }
  },

  // Format with commas only (no currency symbol)
  withCommas: (amount) => {
    if (!amount || amount === 'Remaining') return amount
    
    try {
      const number = typeof amount === 'string' ? parseFloat(amount) : amount
      if (isNaN(number)) return amount
      
      return new Intl.NumberFormat('en-IN').format(number)
    } catch (e) {
      return amount
    }
  },

  // Parse formatted currency back to number
  parse: (formattedAmount) => {
    if (!formattedAmount || formattedAmount === 'Remaining') return 0
    
    try {
      // Remove currency symbols and commas
      const cleaned = formattedAmount.toString().replace(/[₹,\s]/g, '')
      const number = parseFloat(cleaned)
      return isNaN(number) ? 0 : number
    } catch (e) {
      return 0
    }
  }
}

// File size formatting
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Text formatting utilities
export const formatText = {
  // Capitalize first letter of each word
  toTitleCase: (str) => {
    if (!str) return ''
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
  },

  // Convert to uppercase
  toUpperCase: (str) => {
    if (!str) return ''
    return str.toUpperCase()
  },

  // Truncate text with ellipsis
  truncate: (str, maxLength = 50) => {
    if (!str || str.length <= maxLength) return str
    return str.substring(0, maxLength) + '...'
  },

  // Remove extra whitespace
  clean: (str) => {
    if (!str) return ''
    return str.trim().replace(/\s+/g, ' ')
  }
}

// Phone number formatting
export const formatPhone = (phoneNumber) => {
  if (!phoneNumber) return ''
  
  // Remove all non-digit characters except +
  const cleaned = phoneNumber.replace(/[^\d+]/g, '')
  
  // Basic formatting for Indian numbers
  if (cleaned.startsWith('+91')) {
    const number = cleaned.substring(3)
    if (number.length === 10) {
      return `+91-${number.substring(0, 5)}-${number.substring(5)}`
    }
  }
  
  return cleaned
}

// Calculate nights between dates
export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0
  
  try {
    const [day1, month1, year1] = checkIn.split('/').map(Number)
    const [day2, month2, year2] = checkOut.split('/').map(Number)
    
    const checkInDate = new Date(year1, month1 - 1, day1)
    const checkOutDate = new Date(year2, month2 - 1, day2)
    
    const diffTime = checkOutDate - checkInDate
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return Math.max(0, diffDays)
  } catch (e) {
    return 0
  }
}

// Generate filename for PDF
export const generatePDFFilename = (customerName, destination) => {
  const cleanName = formatText.clean(customerName || 'Customer').replace(/[^a-zA-Z0-9]/g, '_')
  const cleanDestination = formatText.clean(destination || 'Destination').replace(/[^a-zA-Z0-9]/g, '_')
  
  return `${cleanName}_${cleanDestination}_Itinerary.pdf`
}

// Format activity count
export const formatActivityCount = (activities) => {
  const filledActivities = activities.filter(activity => 
    activity.city || activity.name || activity.type || activity.time
  )
  
  return {
    filled: filledActivities.length,
    total: activities.length,
    percentage: Math.round((filledActivities.length / activities.length) * 100)
  }
}