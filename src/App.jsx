import React from 'react'
import FormContainer from './components/Form/FormContainer'
import { useFormState } from './hooks/useFormState'
import { useFormValidation } from './hooks/useFormValidation'
import './App.css'

function App() {
  // Use custom hooks for form state and validation
  const {
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
    getFormDataJSON
  } = useFormState()

  const {
    errors,
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
  } = useFormValidation(formData)

  return (
    <div className="min-h-screen bg-bg-light-gray">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            vigovia ✈️
          </h1>
          <p className="text-text-medium mt-2">PLAN.PACK.GO!</p>
          
          {/* Form Status Indicator */}
          {isDirty && (
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-lighter text-purple-dark">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Auto-saved • {formStatus.completionPercentage}% complete
            </div>
          )}
        </header>
        
        <FormContainer 
          formData={formData}
          errors={errors}
          formStatus={formStatus}
          sectionStatus={getSectionStatus}
          updateFormData={updateFormData}
          updateArrayData={updateArrayData}
          updateNestedArrayData={updateNestedArrayData}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
          updateDayActivity={updateDayActivity}
          addDayActivity={addDayActivity}
          removeDayActivity={removeDayActivity}
          validateAll={validateAll}
          validateSection={validateSection}
          touchField={touchField}
          clearError={clearError}
          clearAllErrors={clearAllErrors}
          getFieldError={getFieldError}
          hasFieldError={hasFieldError}
          hasSectionErrors={hasSectionErrors}
          setErrors={setErrors}
          resetForm={resetForm}
          getFormDataJSON={getFormDataJSON}
        />
      </div>
    </div>
  )
}

export default App