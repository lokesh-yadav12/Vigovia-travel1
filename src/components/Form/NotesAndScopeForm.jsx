import React from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'

const NotesAndScopeForm = ({ 
  data, 
  errors, 
  updateArrayData, 
  addArrayItem, 
  removeArrayItem 
}) => {
  // Safe access to data with default values
  const importantNotes = data?.importantNotes || []
  const scopeOfService = data?.scopeOfService || []
  const inclusionSummary = data?.inclusionSummary || []

  const addImportantNote = () => {
    const newNote = { point: '', details: '' }
    addArrayItem('importantNotes', newNote)
  }

  const removeImportantNote = (index) => {
    if (importantNotes.length > 1) {
      removeArrayItem('importantNotes', index)
    }
  }

  const addScopeItem = () => {
    const newScope = { service: '', details: '' }
    addArrayItem('scopeOfService', newScope)
  }

  const removeScopeItem = (index) => {
    if (scopeOfService.length > 1) {
      removeArrayItem('scopeOfService', index)
    }
  }

  const addInclusionItem = () => {
    const newInclusion = { category: '', count: 0, details: '', status: '' }
    addArrayItem('inclusionSummary', newInclusion)
  }

  const removeInclusionItem = (index) => {
    if (inclusionSummary.length > 1) {
      removeArrayItem('inclusionSummary', index)
    }
  }

  return (
    <div className="space-y-8">
      {/* Important Notes */}
      <div className="bg-white border border-border-gray rounded-lg p-6">
        <h3 className="text-xl font-semibold text-purple-dark mb-6">Important Notes</h3>
        
        <div className="space-y-4">
          {importantNotes.map((note, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border-light-purple rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-purple-dark">Note {index + 1}</h4>
                {importantNotes.length > 1 && (
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => removeImportantNote(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Point"
                  value={note.point}
                  onChange={(e) => updateArrayData('importantNotes', index, 'point', e.target.value)}
                  placeholder="Airlines Standard Policy"
                  className="mb-0"
                />
                
                <Input
                  label="Details"
                  value={note.details}
                  onChange={(e) => updateArrayData('importantNotes', index, 'details', e.target.value)}
                  placeholder="In Case Of Visa Rejection, Visa Fees..."
                  className="mb-0"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Button
            variant="secondary"
            onClick={addImportantNote}
          >
            + Add Important Note
          </Button>
        </div>
      </div>

      {/* Scope of Service */}
      <div className="bg-white border border-border-gray rounded-lg p-6">
        <h3 className="text-xl font-semibold text-purple-dark mb-6">Scope of Service</h3>
        
        <div className="space-y-4">
          {scopeOfService.map((scope, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border-light-purple rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-purple-dark">Service {index + 1}</h4>
                {scopeOfService.length > 1 && (
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => removeScopeItem(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Service"
                  value={scope.service}
                  onChange={(e) => updateArrayData('scopeOfService', index, 'service', e.target.value)}
                  placeholder="Flight Tickets And Hotel Vouchers"
                  className="mb-0"
                />
                
                <Input
                  label="Details"
                  value={scope.details}
                  onChange={(e) => updateArrayData('scopeOfService', index, 'details', e.target.value)}
                  placeholder="Delivered 3 Days Post Full Payment"
                  className="mb-0"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Button
            variant="secondary"
            onClick={addScopeItem}
          >
            + Add Service Item
          </Button>
        </div>
      </div>

      {/* Inclusion Summary */}
      <div className="bg-white border border-border-gray rounded-lg p-6">
        <h3 className="text-xl font-semibold text-purple-dark mb-6">Inclusion Summary</h3>
        
        <div className="space-y-4">
          {inclusionSummary.map((inclusion, index) => (
            <div key={index} className="p-4 border border-border-light-purple rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-purple-dark">Inclusion {index + 1}</h4>
                {inclusionSummary.length > 1 && (
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => removeInclusionItem(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input
                  label="Category"
                  value={inclusion.category}
                  onChange={(e) => updateArrayData('inclusionSummary', index, 'category', e.target.value)}
                  placeholder="Flight"
                  className="mb-0"
                />
                
                <Input
                  label="Count"
                  type="number"
                  value={inclusion.count}
                  onChange={(e) => updateArrayData('inclusionSummary', index, 'count', parseInt(e.target.value) || 0)}
                  placeholder="2"
                  className="mb-0"
                />
                
                <Input
                  label="Details"
                  value={inclusion.details}
                  onChange={(e) => updateArrayData('inclusionSummary', index, 'details', e.target.value)}
                  placeholder="All Flights Mentioned"
                  className="mb-0"
                />
                
                <Input
                  label="Status/Comments"
                  value={inclusion.status}
                  onChange={(e) => updateArrayData('inclusionSummary', index, 'status', e.target.value)}
                  placeholder="Awaiting Confirmation"
                  className="mb-0"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Button
            variant="secondary"
            onClick={addInclusionItem}
          >
            + Add Inclusion Item
          </Button>
        </div>

        <div className="mt-6 p-4 bg-purple-lighter rounded-lg border border-purple-light">
          <h4 className="font-semibold text-purple-dark mb-2">Transfer Policy</h4>
          <p className="text-sm text-text-dark">
            <strong>Transfer Policy(Refundable Upon Claim)</strong> *Hotel Transfers & Sightseeing Expenses Under Customers May Book Air Ticket/Hotel And Claim A Refund For That Specific Leg
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotesAndScopeForm