import React, { useState } from 'react'
import CustomerDetails from './CustomerDetails'
import DayItinerary from './DayItinerary'
import FlightForm from './FlightForm'
import HotelForm from './HotelForm'
import ActivityForm from './ActivityForm'
import PaymentForm from './PaymentForm'
import VisaForm from './VisaForm'
import Button from '../UI/Button'
import PDFGenerator from '../PDF/PDFGenerator'

const FormContainer = ({
  formData,
  errors,
  formStatus,
  sectionStatus,
  updateFormData,
  updateArrayData,
  updateNestedArrayData,
  addArrayItem,
  removeArrayItem,
  updateDayActivity,
  addDayActivity,
  removeDayActivity,
  validateAll,
  validateSection,
  touchField,
  clearError,
  clearAllErrors,
  getFieldError,
  hasFieldError,
  hasSectionErrors,
  setErrors,
  resetForm,
  getFormDataJSON
}) => {
  const [currentSection, setCurrentSection] = useState(0)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const sections = [
    { title: 'Customer & Trip Details', component: CustomerDetails },
    { title: 'Day-by-Day Itinerary', component: DayItinerary },
    { title: 'Flight Information', component: FlightForm },
    { title: 'Hotel Bookings', component: HotelForm },
    { title: 'Activities', component: ActivityForm },
    { title: 'Payment & Visa', component: PaymentForm }
  ]

  // Use the validation from hooks
  const validateFormForPDF = () => {
    // Basic required fields check
    const hasCustomerData = formData.customer.name && formData.customer.destination
    const hasDaysData = formData.days.length > 0 && formData.days[0].title
    const hasCompanyData = formData.company.name && formData.company.email
    
    if (!hasCustomerData) {
      alert('Please fill in customer name and destination')
      return false
    }
    
    if (!hasDaysData) {
      alert('Please add at least one day with a title')
      return false
    }
    
    if (!hasCompanyData) {
      alert('Please fill in company details')
      return false
    }

    // Date validation
    const validateDateOrder = (date1, date2, errorMsg) => {
      if (date1 && date2) {
        const [day1, month1, year1] = date1.split('/').map(Number)
        const [day2, month2, year2] = date2.split('/').map(Number)
        const d1 = new Date(year1, month1 - 1, day1)
        const d2 = new Date(year2, month2 - 1, day2)
        
        if (d2 <= d1) {
          alert(errorMsg)
          return false
        }
      }
      return true
    }

    // Check trip dates
    if (!validateDateOrder(
      formData.customer.departureDate, 
      formData.customer.arrivalDate, 
      'Arrival date must be after departure date'
    )) {
      return false
    }

    // Check hotel dates
    for (let i = 0; i < formData.hotels.length; i++) {
      const hotel = formData.hotels[i]
      if (hotel.checkIn && hotel.checkOut) {
        if (!validateDateOrder(
          hotel.checkIn, 
          hotel.checkOut, 
          `Hotel ${i + 1}: Check-out date must be after check-in date`
        )) {
          return false
        }
      }
    }

    // Check day dates are in sequence
    const dayDates = formData.days.filter(day => day.date).map(day => {
      const [day1, month1, year1] = day.date.split('/').map(Number)
      return { date: new Date(year1, month1 - 1, day1), dayNumber: day.dayNumber }
    }).sort((a, b) => a.dayNumber - b.dayNumber)

    for (let i = 1; i < dayDates.length; i++) {
      if (dayDates[i].date <= dayDates[i-1].date) {
        alert(`Day ${dayDates[i].dayNumber} date should be after Day ${dayDates[i-1].dayNumber} date`)
        return false
      }
    }
    
    return true
  }

  const handleGeneratePDF = async () => {
    console.log('Form Data:', formData) // Debug log
    
    if (!validateFormForPDF()) {
      return
    }

    setIsGeneratingPDF(true)
    try {
      // PDF generation will be handled by PDFGenerator component
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate PDF generation
      alert('PDF generated successfully!')
    } catch (error) {
      console.error('PDF Generation Error:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const CurrentSectionComponent = sections[currentSection].component

  return (
    <div className="max-w-4xl mx-auto">
      {/* Section Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSection === index
                  ? 'bg-purple-medium text-white'
                  : 'bg-white text-text-dark hover:bg-purple-lighter border border-border-gray'
              }`}
            >
              {index + 1}. {section.title}
            </button>
          ))}
        </div>
        
        <div className="w-full bg-border-gray rounded-full h-2">
          <div 
            className="bg-purple-medium h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-text-dark mb-6">
          {sections[currentSection].title}
        </h2>
        
        <CurrentSectionComponent
          data={formData}
          errors={errors}
          updateFormData={updateFormData}
          updateArrayData={updateArrayData}
          updateNestedArrayData={updateNestedArrayData}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
          updateDayActivity={updateDayActivity}
          addDayActivity={addDayActivity}
          removeDayActivity={removeDayActivity}
          touchField={touchField}
          clearError={clearError}
          getFieldError={getFieldError}
          hasFieldError={hasFieldError}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
        >
          Previous
        </Button>

        {currentSection === sections.length - 1 ? (
          <Button
            onClick={handleGeneratePDF}
            loading={isGeneratingPDF}
            className="px-8"
          >
            Get Itinerary
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
          >
            Next
          </Button>
        )}
      </div>

      {/* PDF Generator Component */}
      <PDFGenerator 
        formData={formData}
        isGenerating={isGeneratingPDF}
      />
    </div>
  )
}

export default FormContainer