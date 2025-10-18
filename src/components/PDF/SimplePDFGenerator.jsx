import React from 'react'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// Simple PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Helvetica'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5B3A99',
    textAlign: 'center',
    marginBottom: 20
  },
  section: {
    marginBottom: 15,
    padding: 10,
    border: '1px solid #E5E5E5',
    borderRadius: 5
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3D2463',
    marginBottom: 10
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#333333'
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666666'
  }
})

// Simple PDF Document
const SimpleItineraryPDF = ({ formData }) => {
  // Safe data access
  const customer = formData?.customer || {}
  const days = formData?.days || []
  const flights = formData?.flights || []
  const hotels = formData?.hotels || []
  const activities = formData?.activities || []
  const payment = formData?.payment || {}
  const visa = formData?.visa || {}
  const company = formData?.company || {}

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Title */}
        <Text style={styles.title}>
          {customer.destination || 'Travel'} Itinerary
        </Text>

        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <Text style={styles.text}>Name: {customer.name || 'N/A'}</Text>
          <Text style={styles.text}>Destination: {customer.destination || 'N/A'}</Text>
          <Text style={styles.text}>Duration: {customer.days || 0} Days, {customer.nights || 0} Nights</Text>
          <Text style={styles.text}>Travelers: {customer.travelers || 0}</Text>
          <Text style={styles.text}>Departure From: {customer.departureFrom || 'N/A'}</Text>
          <Text style={styles.text}>Departure Date: {customer.departureDate || 'N/A'}</Text>
          <Text style={styles.text}>Arrival Date: {customer.arrivalDate || 'N/A'}</Text>
        </View>

        {/* Days */}
        {days.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Day-by-Day Itinerary</Text>
            {days.slice(0, 3).map((day, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.text}>Day {day.dayNumber}: {day.title || 'Untitled'}</Text>
                <Text style={styles.label}>Date: {day.date || 'Not set'}</Text>
                
                {day.morning && day.morning.filter(a => a).length > 0 && (
                  <View>
                    <Text style={styles.label}>Morning:</Text>
                    {day.morning.filter(a => a).slice(0, 3).map((activity, i) => (
                      <Text key={i} style={{ fontSize: 10, marginLeft: 10 }}>• {activity}</Text>
                    ))}
                  </View>
                )}
                
                {day.afternoon && day.afternoon.filter(a => a).length > 0 && (
                  <View>
                    <Text style={styles.label}>Afternoon:</Text>
                    {day.afternoon.filter(a => a).slice(0, 3).map((activity, i) => (
                      <Text key={i} style={{ fontSize: 10, marginLeft: 10 }}>• {activity}</Text>
                    ))}
                  </View>
                )}
                
                {day.evening && day.evening.filter(a => a).length > 0 && (
                  <View>
                    <Text style={styles.label}>Evening:</Text>
                    {day.evening.filter(a => a).slice(0, 3).map((activity, i) => (
                      <Text key={i} style={{ fontSize: 10, marginLeft: 10 }}>• {activity}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Flights */}
        {flights.filter(f => f.airline).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Flight Information</Text>
            {flights.filter(f => f.airline).map((flight, index) => (
              <Text key={index} style={styles.text}>
                {flight.date}: {flight.airline} ({flight.flightNumber}) - {flight.from} to {flight.to}
              </Text>
            ))}
          </View>
        )}

        {/* Hotels */}
        {hotels.filter(h => h.name).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hotel Bookings</Text>
            {hotels.filter(h => h.name).map((hotel, index) => (
              <Text key={index} style={styles.text}>
                {hotel.city}: {hotel.name} ({hotel.checkIn} to {hotel.checkOut}, {hotel.nights} nights)
              </Text>
            ))}
          </View>
        )}

        {/* Activities */}
        {activities.filter(a => a.name).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Activities</Text>
            {activities.filter(a => a.name).slice(0, 8).map((activity, index) => (
              <Text key={index} style={styles.text}>
                {activity.city}: {activity.name} ({activity.type}, {activity.time})
              </Text>
            ))}
          </View>
        )}

        {/* Payment */}
        {payment.totalAmount > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Information</Text>
            <Text style={styles.text}>Total Amount: ₹{payment.totalAmount?.toLocaleString('en-IN')} for {payment.pax} travelers</Text>
            <Text style={styles.text}>TCS Status: {payment.tcs}</Text>
            {payment.installments && payment.installments.map((inst, index) => (
              <Text key={index} style={styles.text}>
                Installment {index + 1}: {typeof inst.amount === 'number' ? `₹${inst.amount.toLocaleString('en-IN')}` : inst.amount} - {inst.dueDate}
              </Text>
            ))}
          </View>
        )}

        {/* Visa */}
        {(visa.type || visa.validity || visa.processingDate) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Visa Information</Text>
            {visa.type && <Text style={styles.text}>Type: {visa.type}</Text>}
            {visa.validity && <Text style={styles.text}>Validity: {visa.validity}</Text>}
            {visa.processingDate && <Text style={styles.text}>Processing Date: {visa.processingDate}</Text>}
          </View>
        )}

        {/* Company Footer */}
        <View style={{ marginTop: 30, borderTop: '1px solid #E5E5E5', paddingTop: 15 }}>
          <Text style={styles.text}>{company.name || 'Company Name'}</Text>
          <Text style={{ fontSize: 10, color: '#666666' }}>{company.address || 'Company Address'}</Text>
          <Text style={{ fontSize: 10, color: '#666666' }}>Phone: {company.phone || 'N/A'} | Email: {company.email || 'N/A'}</Text>
          <Text style={{ fontSize: 10, color: '#666666' }}>CIN: {company.cin || 'N/A'}</Text>
        </View>
      </Page>
    </Document>
  )
}

const SimplePDFGenerator = ({ formData, isGenerating }) => {
  const fileName = `${formData?.customer?.name || 'Customer'}_${formData?.customer?.destination || 'Destination'}_Itinerary.pdf`

  if (isGenerating) {
    return (
      <div className="text-center p-4">
        <div className="inline-flex items-center px-4 py-2 bg-purple-lighter rounded-lg">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-medium" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-purple-dark">Generating PDF...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center p-4">
      <PDFDownloadLink
        document={<SimpleItineraryPDF formData={formData} />}
        fileName={fileName}
        className="inline-flex items-center px-6 py-3 bg-purple-medium hover:bg-purple-dark text-white font-semibold rounded-lg transition-colors"
      >
        {({ blob, url, loading, error }) => {
          if (error) {
            console.error('PDF Error:', error)
            return 'Error generating PDF - Check console'
          }
          return loading ? 'Preparing PDF...' : 'Download PDF'
        }}
      </PDFDownloadLink>
    </div>
  )
}

export default SimplePDFGenerator