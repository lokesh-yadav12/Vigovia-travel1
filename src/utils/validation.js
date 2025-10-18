import { VALIDATION_RULES, FILE_CONSTRAINTS } from './constants'

// Validation error messages
export const VALIDATION_ERRORS = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_DATE: 'Please enter a valid date',
  DATE_ORDER: 'Arrival date must be after departure date',
  CHECKOUT_AFTER_CHECKIN: 'Check-out date must be after check-in date',
  FILE_SIZE: `File size must be less than ${FILE_CONSTRAINTS.MAX_SIZE / (1024 * 1024)}MB`,
  FILE_TYPE: `Only ${FILE_CONSTRAINTS.ACCEPTED_EXTENSIONS.join(', ')} files are allowed`,
  IATA_CODE: `IATA code must be exactly ${VALIDATION_RULES.IATA_CODE_LENGTH} uppercase letters`,
  MIN_LENGTH: (min) => `Minimum ${min} characters required`,
  MAX_LENGTH: (max) => `Maximum ${max} characters allowed`,
  MIN_VALUE: (min) => `Value must be at least ${min}`,
  MAX_VALUE: (max) => `Value must be at most ${max}`,
  POSITIVE_NUMBER: 'Value must be a positive number',
  MIN_ACTIVITIES: `At least ${VALIDATION_RULES.MIN_TOTAL_ACTIVITIES} activities recommended`
}

// Individual field validators
export const validators = {
  required: (value) => {
    if (value === null || value === undefined || value === '') {
      return VALIDATION_ERRORS.REQUIRED_FIELD
    }
    return null
  },

  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return VALIDATION_ERRORS.MIN_LENGTH(min)
    }
    return null
  },

  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return VALIDATION_ERRORS.MAX_LENGTH(max)
    }
    return null
  },

  minValue: (min) => (value) => {
    if (value !== null && value !== undefined && value < min) {
      return VALIDATION_ERRORS.MIN_VALUE(min)
    }
    return null
  },

  maxValue: (max) => (value) => {
    if (value !== null && value !== undefined && value > max) {
      return VALIDATION_ERRORS.MAX_VALUE(max)
    }
    return null
  },

  email: (value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return VALIDATION_ERRORS.INVALID_EMAIL
    }
    return null
  },

  phone: (value) => {
    if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
      return VALIDATION_ERRORS.INVALID_PHONE
    }
    return null
  },

  iataCode: (value) => {
    if (value && (value.length !== VALIDATION_RULES.IATA_CODE_LENGTH || !/^[A-Z]{3}$/.test(value))) {
      return VALIDATION_ERRORS.IATA_CODE
    }
    return null
  },

  date: (value) => {
    if (value) {
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
      if (!dateRegex.test(value)) {
        return VALIDATION_ERRORS.INVALID_DATE
      }
      
      const [day, month, year] = value.split('/').map(Number)
      const date = new Date(year, month - 1, day)
      
      if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
        return VALIDATION_ERRORS.INVALID_DATE
      }
    }
    return null
  },

  dateAfter: (afterDate) => (value) => {
    if (value && afterDate) {
      const [day1, month1, year1] = value.split('/').map(Number)
      const [day2, month2, year2] = afterDate.split('/').map(Number)
      
      const date1 = new Date(year1, month1 - 1, day1)
      const date2 = new Date(year2, month2 - 1, day2)
      
      if (date1 <= date2) {
        return VALIDATION_ERRORS.DATE_ORDER
      }
    }
    return null
  },

  checkoutAfterCheckin: (checkinDate) => (checkoutDate) => {
    if (checkoutDate && checkinDate) {
      const [day1, month1, year1] = checkinDate.split('/').map(Number)
      const [day2, month2, year2] = checkoutDate.split('/').map(Number)
      
      const checkin = new Date(year1, month1 - 1, day1)
      const checkout = new Date(year2, month2 - 1, day2)
      
      if (checkout <= checkin) {
        return VALIDATION_ERRORS.CHECKOUT_AFTER_CHECKIN
      }
    }
    return null
  }
}

// Compose multiple validators
export const composeValidators = (...validators) => (value, ...args) => {
  for (const validator of validators) {
    const error = typeof validator === 'function' ? validator(value, ...args) : validator
    if (error) return error
  }
  return null
}

// Specific field validation rules
export const fieldValidators = {
  customerName: composeValidators(
    validators.required,
    validators.minLength(VALIDATION_RULES.MIN_NAME_LENGTH)
  ),

  destination: validators.required,

  tripTitle: composeValidators(
    validators.required,
    validators.maxLength(VALIDATION_RULES.MAX_TITLE_LENGTH)
  ),

  days: composeValidators(
    validators.required,
    validators.minValue(VALIDATION_RULES.MIN_DAYS),
    validators.maxValue(VALIDATION_RULES.MAX_DAYS)
  ),

  nights: composeValidators(
    validators.required,
    validators.minValue(VALIDATION_RULES.MIN_NIGHTS),
    validators.maxValue(VALIDATION_RULES.MAX_NIGHTS)
  ),

  travelers: composeValidators(
    validators.required,
    validators.minValue(VALIDATION_RULES.MIN_TRAVELERS),
    validators.maxValue(VALIDATION_RULES.MAX_TRAVELERS)
  ),

  departureFrom: validators.required,

  departureDate: composeValidators(
    validators.required,
    validators.date
  ),

  arrivalDate: (value, departureDate) => composeValidators(
    validators.required,
    validators.date,
    validators.dateAfter(departureDate)
  )(value),

  dayDate: composeValidators(
    validators.required,
    validators.date
  ),

  dayTitle: composeValidators(
    validators.required,
    validators.maxLength(VALIDATION_RULES.MAX_TITLE_LENGTH)
  ),

  dayImage: validators.required,

  airline: validators.required,
  flightNumber: validators.required,
  departureAirport: validators.required,
  arrivalAirport: validators.required,
  
  iataCode: composeValidators(
    validators.required,
    validators.iataCode
  ),

  hotelCity: validators.required,
  hotelName: composeValidators(
    validators.required,
    validators.maxLength(VALIDATION_RULES.MAX_HOTEL_NAME_LENGTH)
  ),

  checkInDate: composeValidators(
    validators.required,
    validators.date
  ),

  checkOutDate: (value, checkInDate) => composeValidators(
    validators.required,
    validators.date,
    validators.checkoutAfterCheckin(checkInDate)
  )(value),

  activityCity: validators.required,
  activityName: validators.required,
  activityType: validators.required,
  activityTime: validators.required,

  totalAmount: composeValidators(
    validators.required,
    validators.minValue(1)
  ),

  paymentPax: composeValidators(
    validators.required,
    validators.minValue(1)
  ),

  installmentAmount: validators.minValue(0),

  companyName: validators.required,
  companyAddress: validators.required,
  companyPhone: composeValidators(
    validators.required,
    validators.phone
  ),
  companyEmail: composeValidators(
    validators.required,
    validators.email
  ),
  companyCin: validators.required
}

// Validate entire form
export const validateForm = (formData) => {
  const errors = {}

  // Customer validation
  const customerErrors = validateCustomer(formData.customer)
  Object.assign(errors, customerErrors)

  // Days validation
  const daysErrors = validateDays(formData.days)
  Object.assign(errors, daysErrors)

  // Flights validation
  const flightsErrors = validateFlights(formData.flights)
  Object.assign(errors, flightsErrors)

  // Hotels validation
  const hotelsErrors = validateHotels(formData.hotels)
  Object.assign(errors, hotelsErrors)

  // Activities validation
  const activitiesErrors = validateActivities(formData.activities)
  Object.assign(errors, activitiesErrors)

  // Payment validation
  const paymentErrors = validatePayment(formData.payment)
  Object.assign(errors, paymentErrors)

  // Company validation
  const companyErrors = validateCompany(formData.company)
  Object.assign(errors, companyErrors)

  return errors
}

// Section validators
export const validateCustomer = (customer) => {
  const errors = {}

  const nameError = fieldValidators.customerName(customer.name)
  if (nameError) errors.customerName = nameError

  const destinationError = fieldValidators.destination(customer.destination)
  if (destinationError) errors.destination = destinationError

  const titleError = fieldValidators.tripTitle(customer.title)
  if (titleError) errors.title = titleError

  const daysError = fieldValidators.days(customer.days)
  if (daysError) errors.days = daysError

  const nightsError = fieldValidators.nights(customer.nights)
  if (nightsError) errors.nights = nightsError

  const travelersError = fieldValidators.travelers(customer.travelers)
  if (travelersError) errors.travelers = travelersError

  const departureFromError = fieldValidators.departureFrom(customer.departureFrom)
  if (departureFromError) errors.departureFrom = departureFromError

  const departureDateError = fieldValidators.departureDate(customer.departureDate)
  if (departureDateError) errors.departureDate = departureDateError

  const arrivalDateError = fieldValidators.arrivalDate(customer.arrivalDate, customer.departureDate)
  if (arrivalDateError) errors.arrivalDate = arrivalDateError

  return errors
}

export const validateDays = (days) => {
  const errors = {}

  days.forEach((day, index) => {
    const dateError = fieldValidators.dayDate(day.date)
    if (dateError) errors[`day${index}Date`] = dateError

    const titleError = fieldValidators.dayTitle(day.title)
    if (titleError) errors[`day${index}Title`] = titleError

    const imageError = fieldValidators.dayImage(day.image)
    if (imageError) errors[`day${index}Image`] = imageError

    // Validate activities for each period
    ['morning', 'afternoon', 'evening'].forEach(period => {
      const activities = day[period] || []
      const hasActivities = activities.some(activity => activity.trim())
      if (!hasActivities) {
        errors[`day${index}${period}`] = 'At least one activity is required'
      }
    })
  })

  return errors
}

export const validateFlights = (flights) => {
  const errors = {}

  if (!flights.length || !flights[0].airline) {
    errors.flights = 'At least one flight is required'
    return errors
  }

  flights.forEach((flight, index) => {
    if (!flight.airline && !flight.flightNumber) return // Skip empty flights

    const airlineError = fieldValidators.airline(flight.airline)
    if (airlineError) errors[`flight${index}Airline`] = airlineError

    const flightNumberError = fieldValidators.flightNumber(flight.flightNumber)
    if (flightNumberError) errors[`flight${index}FlightNumber`] = flightNumberError

    const fromError = fieldValidators.departureAirport(flight.from)
    if (fromError) errors[`flight${index}From`] = fromError

    const fromCodeError = fieldValidators.iataCode(flight.fromCode)
    if (fromCodeError) errors[`flight${index}FromCode`] = fromCodeError

    const toError = fieldValidators.arrivalAirport(flight.to)
    if (toError) errors[`flight${index}To`] = toError

    const toCodeError = fieldValidators.iataCode(flight.toCode)
    if (toCodeError) errors[`flight${index}ToCode`] = toCodeError
  })

  return errors
}

export const validateHotels = (hotels) => {
  const errors = {}

  if (!hotels.length || !hotels[0].name) {
    errors.hotels = 'At least one hotel is required'
    return errors
  }

  hotels.forEach((hotel, index) => {
    if (!hotel.name && !hotel.city) return // Skip empty hotels

    const cityError = fieldValidators.hotelCity(hotel.city)
    if (cityError) errors[`hotel${index}City`] = cityError

    const nameError = fieldValidators.hotelName(hotel.name)
    if (nameError) errors[`hotel${index}Name`] = nameError

    const checkInError = fieldValidators.checkInDate(hotel.checkIn)
    if (checkInError) errors[`hotel${index}CheckIn`] = checkInError

    const checkOutError = fieldValidators.checkOutDate(hotel.checkOut, hotel.checkIn)
    if (checkOutError) errors[`hotel${index}CheckOut`] = checkOutError
  })

  return errors
}

export const validateActivities = (activities) => {
  const errors = {}

  const filledActivities = activities.filter(activity => 
    activity.city || activity.name || activity.type || activity.time
  )

  if (filledActivities.length < VALIDATION_RULES.MIN_TOTAL_ACTIVITIES) {
    errors.activities = VALIDATION_ERRORS.MIN_ACTIVITIES
  }

  activities.forEach((activity, index) => {
    if (!activity.city && !activity.name) return // Skip empty activities

    const cityError = fieldValidators.activityCity(activity.city)
    if (cityError) errors[`activity${index}City`] = cityError

    const nameError = fieldValidators.activityName(activity.name)
    if (nameError) errors[`activity${index}Name`] = nameError

    const typeError = fieldValidators.activityType(activity.type)
    if (typeError) errors[`activity${index}Type`] = typeError

    const timeError = fieldValidators.activityTime(activity.time)
    if (timeError) errors[`activity${index}Time`] = timeError
  })

  return errors
}

export const validatePayment = (payment) => {
  const errors = {}

  const totalAmountError = fieldValidators.totalAmount(payment.totalAmount)
  if (totalAmountError) errors.totalAmount = totalAmountError

  const paxError = fieldValidators.paymentPax(payment.pax)
  if (paxError) errors.pax = paxError

  payment.installments.forEach((installment, index) => {
    if (typeof installment.amount === 'number') {
      const amountError = fieldValidators.installmentAmount(installment.amount)
      if (amountError) errors[`installment${index}Amount`] = amountError
    }
  })

  return errors
}

export const validateCompany = (company) => {
  const errors = {}

  const nameError = fieldValidators.companyName(company.name)
  if (nameError) errors.companyName = nameError

  const addressError = fieldValidators.companyAddress(company.address)
  if (addressError) errors.companyAddress = addressError

  const phoneError = fieldValidators.companyPhone(company.phone)
  if (phoneError) errors.companyPhone = phoneError

  const emailError = fieldValidators.companyEmail(company.email)
  if (emailError) errors.companyEmail = emailError

  const cinError = fieldValidators.companyCin(company.cin)
  if (cinError) errors.companyCin = cinError

  return errors
}