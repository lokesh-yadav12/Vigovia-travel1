import React from 'react'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// PDF Styles matching Figma design exactly
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 15,
    fontFamily: 'Helvetica'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 15
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5B3A99'
  },
  tagline: {
    fontSize: 8,
    color: '#666666',
    textAlign: 'center',
    marginTop: 2
  },
  heroCard: {
    backgroundColor: '#4A9FE8',
    borderRadius: 16,
    padding: 30,
    marginBottom: 25,
    alignItems: 'center'
  },
  heroText: {
    color: '#FFFFFF',
    textAlign: 'center'
  },
  heroName: {
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 8
  },
  heroDestination: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 4
  },
  heroDuration: {
    fontSize: 18,
    fontWeight: 400,
    marginBottom: 20
  },
  tripSummary: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 25
  },
  summaryColumn: {
    flex: 1,
    alignItems: 'center'
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: '#000000',
    textTransform: 'uppercase',
    marginBottom: 4
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: 400,
    color: '#000000'
  },
  dayCard: {
    marginBottom: 15,
    padding: 15,
    border: '1px solid #E5E5E5',
    borderRadius: 8
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#3D2463'
  },
  dayDate: {
    fontSize: 11,
    marginBottom: 8,
    color: '#666666'
  },
  timeLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#5B3A99',
    marginBottom: 4
  },
  activity: {
    fontSize: 9,
    marginLeft: 15,
    marginBottom: 2,
    color: '#333333'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000000'
  },
  sectionTitleAccent: {
    color: '#5B3A99'
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3D2463',
    padding: 8
  },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderLeft: '1px solid #D0C0E8',
    borderRight: '1px solid #D0C0E8',
    borderBottom: '1px solid #D0C0E8'
  },
  tableCell: {
    fontSize: 8,
    textAlign: 'center',
    color: '#333333'
  },
  tableCellLeft: {
    fontSize: 8,
    textAlign: 'left',
    paddingLeft: 5,
    color: '#333333'
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '2px solid #E5E5E5',
    paddingTop: 12
  },
  footerLeft: {
    flex: 1
  },
  footerRight: {
    alignItems: 'flex-end'
  },
  footerText: {
    fontSize: 9,
    color: '#666666',
    lineHeight: 1.5
  },
  companyName: {
    fontSize: 11,
    fontWeight: 700,
    color: '#000000',
    marginBottom: 2
  }
})

// PDF Document Component with exact Figma design
const ItineraryPDF = ({ formData }) => {
  // Safe data access to prevent errors
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
      {/* PAGE 1: Cover + Day Itinerary */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>vigovia ✈️</Text>
            <Text style={styles.tagline}>PLAN.PACK.GO!</Text>
          </View>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Text style={[styles.heroText, styles.heroName]}>
            Hi, {customer.name || 'Customer'}!
          </Text>
          <Text style={[styles.heroText, styles.heroDestination]}>
            {customer.destination || 'Destination'} Itinerary
          </Text>
          <Text style={[styles.heroText, styles.heroDuration]}>
            {customer.days || 0} Days {customer.nights || 0} Nights
          </Text>
          <Text style={styles.heroText}>✈️ 🏨 🎭 🚗 🍽️</Text>
        </View>

        {/* Trip Summary Bar */}
        <View style={styles.tripSummary}>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Departure From</Text>
            <Text style={styles.summaryValue}>{customer.departureFrom || 'N/A'}</Text>
          </View>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Departure</Text>
            <Text style={styles.summaryValue}>{customer.departureDate || 'N/A'}</Text>
          </View>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Arrival</Text>
            <Text style={styles.summaryValue}>{customer.arrivalDate || 'N/A'}</Text>
          </View>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Destination</Text>
            <Text style={styles.summaryValue}>{customer.destination || 'N/A'}</Text>
          </View>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>No. Of Travel.</Text>
            <Text style={styles.summaryValue}>{customer.travelers || 0}</Text>
          </View>
        </View>

        {/* Day Cards */}
        {days.slice(0, 2).map((day, index) => (
          <View key={index} style={styles.dayCard}>
            <Text style={styles.dayTitle}>
              Day {day.dayNumber || index + 1}: {day.title || 'Untitled'}
            </Text>
            <Text style={styles.dayDate}>Date: {day.date || 'Not set'}</Text>
            
            {day.morning && day.morning.filter(a => a).length > 0 && (
              <View style={{ marginBottom: 6 }}>
                <Text style={styles.timeLabel}>○ Morning</Text>
                {day.morning.filter(a => a).map((activity, i) => (
                  <Text key={i} style={styles.activity}>• {activity}</Text>
                ))}
              </View>
            )}
            
            {day.afternoon && day.afternoon.filter(a => a).length > 0 && (
              <View style={{ marginBottom: 6 }}>
                <Text style={styles.timeLabel}>○ Afternoon</Text>
                {day.afternoon.filter(a => a).map((activity, i) => (
                  <Text key={i} style={styles.activity}>• {activity}</Text>
                ))}
              </View>
            )}
            
            {day.evening && day.evening.filter(a => a).length > 0 && (
              <View>
                <Text style={styles.timeLabel}>○ Evening</Text>
                {day.evening.filter(a => a).map((activity, i) => (
                  <Text key={i} style={styles.activity}>• {activity}</Text>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.companyName}>{company.name || 'Vigovia Tech Pvt. Ltd'}</Text>
            <Text style={styles.footerText}>{company.address || 'Company Address'}</Text>
          </View>
          <View style={styles.footerRight}>
            <Text style={styles.footerText}>Phone: {company.phone || '+91-9504061112'}</Text>
            <Text style={styles.footerText}>Email: {company.email || 'email@company.com'}</Text>
            <Text style={styles.footerText}>CIN: {company.cin || 'CIN Number'}</Text>
            <View style={{ marginTop: 8, alignItems: 'flex-end' }}>
              <Text style={[styles.logo, { fontSize: 14 }]}>vigovia ✈️</Text>
              <Text style={styles.tagline}>PLAN.PACK.GO!</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* PAGE 2: Day Continuation + Flight + Hotel */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>vigovia ✈️</Text>
            <Text style={styles.tagline}>PLAN.PACK.GO!</Text>
          </View>
        </View>

        {/* Remaining Days */}
        {days.slice(2).map((day, index) => (
          <View key={index + 2} style={styles.dayCard}>
            <Text style={styles.dayTitle}>
              Day {day.dayNumber || index + 3}: {day.title || 'Untitled'}
            </Text>
            <Text style={styles.dayDate}>Date: {day.date || 'Not set'}</Text>
            
            {day.morning && day.morning.filter(a => a).length > 0 && (
              <View style={{ marginBottom: 6 }}>
                <Text style={styles.timeLabel}>○ Morning</Text>
                {day.morning.filter(a => a).map((activity, i) => (
                  <Text key={i} style={styles.activity}>• {activity}</Text>
                ))}
              </View>
            )}
            
            {day.afternoon && day.afternoon.filter(a => a).length > 0 && (
              <View style={{ marginBottom: 6 }}>
                <Text style={styles.timeLabel}>○ Afternoon</Text>
                {day.afternoon.filter(a => a).map((activity, i) => (
                  <Text key={i} style={styles.activity}>• {activity}</Text>
                ))}
              </View>
            )}
            
            {day.evening && day.evening.filter(a => a).length > 0 && (
              <View>
                <Text style={styles.timeLabel}>○ Evening</Text>
                {day.evening.filter(a => a).map((activity, i) => (
                  <Text key={i} style={styles.activity}>• {activity}</Text>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Flight Summary */}
        {flights.filter(f => f.airline).length > 0 && (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.sectionTitle}>
              Flight <Text style={styles.sectionTitleAccent}>Summary</Text>
            </Text>
            {flights.filter(f => f.airline).map((flight, index) => (
              <View key={index} style={[
                styles.tableRow,
                { backgroundColor: index % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }
              ]}>
                <View style={{ 
                  backgroundColor: '#E8DFF5', 
                  borderRadius: 15, 
                  padding: 8, 
                  marginRight: 10,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#5B3A99' }}>
                    {flight.date} →
                  </Text>
                </View>
                <Text style={{ fontSize: 9, flex: 1, color: '#333333' }}>
                  Fly {flight.airline} ({flight.flightNumber}) From {flight.from} ({flight.fromCode}) To {flight.to} ({flight.toCode})
                </Text>
              </View>
            ))}
            <Text style={{ fontSize: 8, fontStyle: 'italic', color: '#666666', marginTop: 8 }}>
              Note: All Flights Include Meals, Seat Choice (Excluding XL), And 23Kg-25Kg Checked Baggage
            </Text>
          </View>
        )}

        {/* Hotel Bookings */}
        {hotels.filter(h => h.name).length > 0 && (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.sectionTitle}>
              Hotel <Text style={styles.sectionTitleAccent}>Bookings</Text>
            </Text>
            
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>City</Text>
              <Text style={[styles.tableHeaderText, { flex: 1.8 }]}>Check In</Text>
              <Text style={[styles.tableHeaderText, { flex: 1.8 }]}>Check Out</Text>
              <Text style={[styles.tableHeaderText, { flex: 1.2 }]}>Nights</Text>
              <Text style={[styles.tableHeaderText, { flex: 3.7 }]}>Hotel Name</Text>
            </View>
            
            {/* Table Rows */}
            {hotels.filter(h => h.name).map((hotel, index) => (
              <View key={index} style={[
                styles.tableRow,
                { backgroundColor: index % 2 === 0 ? '#F5F0FF' : '#FAFAFA' }
              ]}>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>{hotel.city}</Text>
                <Text style={[styles.tableCell, { flex: 1.8 }]}>{hotel.checkIn}</Text>
                <Text style={[styles.tableCell, { flex: 1.8 }]}>{hotel.checkOut}</Text>
                <Text style={[styles.tableCell, { flex: 1.2 }]}>{hotel.nights}</Text>
                <Text style={[styles.tableCellLeft, { flex: 3.7 }]}>{hotel.name}</Text>
              </View>
            ))}
            
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 8, color: '#666666', marginBottom: 2 }}>1. All Hotels Are Tentative And Can Be Replaced With Similar</Text>
              <Text style={{ fontSize: 8, color: '#666666', marginBottom: 2 }}>2. Breakfast Included For All Hotel Stays</Text>
              <Text style={{ fontSize: 8, color: '#666666', marginBottom: 2 }}>3. All Hotels Will Be 3* And Above Category</Text>
              <Text style={{ fontSize: 8, color: '#666666' }}>4. A maximum occupancy of 2 guests/room is allowed in most hotels</Text>
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.companyName}>{company.name || 'Vigovia Tech Pvt. Ltd'}</Text>
            <Text style={styles.footerText}>{company.address || 'Company Address'}</Text>
          </View>
          <View style={styles.footerRight}>
            <Text style={styles.footerText}>Phone: {company.phone || '+91-9504061112'}</Text>
            <Text style={styles.footerText}>Email: {company.email || 'email@company.com'}</Text>
            <Text style={styles.footerText}>CIN: {company.cin || 'CIN Number'}</Text>
            <View style={{ marginTop: 8, alignItems: 'flex-end' }}>
              <Text style={[styles.logo, { fontSize: 14 }]}>vigovia ✈️</Text>
              <Text style={styles.tagline}>PLAN.PACK.GO!</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* PAGE 3: Activities + Payment + Visa */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>vigovia ✈️</Text>
            <Text style={styles.tagline}>PLAN.PACK.GO!</Text>
          </View>
        </View>

        {/* Activity Table */}
        {activities.filter(a => a.name).length > 0 && (
          <View style={{ marginBottom: 25 }}>
            <Text style={styles.sectionTitle}>
              Activity <Text style={styles.sectionTitleAccent}>Table</Text>
            </Text>
            
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>City</Text>
              <Text style={[styles.tableHeaderText, { flex: 4.5 }]}>Activity</Text>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>Type</Text>
              <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Time Required</Text>
            </View>
            
            {/* Table Rows */}
            {activities.filter(a => a.name).slice(0, 15).map((activity, index) => (
              <View key={index} style={[
                styles.tableRow,
                { backgroundColor: index % 2 === 0 ? '#F5F0FF' : '#FFFFFF' }
              ]}>
                <Text style={[styles.tableCell, { flex: 2 }]}>{activity.city}</Text>
                <Text style={[styles.tableCellLeft, { flex: 4.5 }]}>{activity.name}</Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>{activity.type}</Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>{activity.time}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Payment Plan */}
        {payment.totalAmount > 0 && (
          <View style={{ marginBottom: 25 }}>
            <Text style={styles.sectionTitle}>
              Payment <Text style={styles.sectionTitleAccent}>Plan</Text>
            </Text>
            
            {/* Total Amount */}
            <View style={{ 
              flexDirection: 'row', 
              backgroundColor: '#F5F0FF', 
              padding: 12,
              marginBottom: 10,
              borderRadius: 8
            }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>Total Amount</Text>
              <Text style={{ fontSize: 11, fontWeight: 'bold', flex: 2, textAlign: 'center' }}>
                ₹ {payment.totalAmount?.toLocaleString('en-IN')} For {payment.pax} Pax (Inclusive Of GST)
              </Text>
            </View>

            {/* TCS Status */}
            <View style={{ 
              flexDirection: 'row', 
              backgroundColor: '#F5F0FF', 
              padding: 12,
              marginBottom: 15,
              borderRadius: 8
            }}>
              <Text style={{ fontSize: 10, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>TCS</Text>
              <Text style={{ fontSize: 10, flex: 2, textAlign: 'center' }}>{payment.tcs}</Text>
            </View>

            {/* Installments Table */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>Installment</Text>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>Amount</Text>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>Due Date</Text>
            </View>
            
            {payment.installments && payment.installments.map((installment, index) => (
              <View key={index} style={[
                styles.tableRow,
                { backgroundColor: index % 2 === 0 ? '#F5F0FF' : '#FFFFFF' }
              ]}>
                <Text style={[styles.tableCell, { flex: 1 }]}>Installment {index + 1}</Text>
                <Text style={[styles.tableCell, { flex: 1, fontWeight: 'bold' }]}>
                  {typeof installment.amount === 'number' ? `₹${installment.amount.toLocaleString('en-IN')}` : installment.amount}
                </Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>{installment.dueDate}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Visa Details */}
        {(visa.type || visa.validity || visa.processingDate) && (
          <View style={{ marginBottom: 25 }}>
            <Text style={styles.sectionTitle}>
              Visa <Text style={styles.sectionTitleAccent}>Details</Text>
            </Text>
            
            <View style={{ 
              flexDirection: 'row', 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E0D0E8',
              padding: 15,
              borderRadius: 8
            }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#666666', marginBottom: 4 }}>Visa Type :</Text>
                <Text style={{ fontSize: 10, color: '#333333' }}>{visa.type || 'N/A'}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#666666', marginBottom: 4 }}>Validity:</Text>
                <Text style={{ fontSize: 10, color: '#333333' }}>{visa.validity || 'N/A'}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#666666', marginBottom: 4 }}>Processing Date :</Text>
                <Text style={{ fontSize: 10, color: '#333333' }}>{visa.processingDate || 'N/A'}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Call to Action */}
        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 80 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#5B3A99', marginBottom: 15, letterSpacing: 2 }}>
            PLAN.PACK.GO!
          </Text>
          <View style={{ 
            backgroundColor: '#5B3A99', 
            borderRadius: 25, 
            paddingVertical: 12, 
            paddingHorizontal: 40
          }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF' }}>Book Now</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.companyName}>{company.name || 'Vigovia Tech Pvt. Ltd'}</Text>
            <Text style={styles.footerText}>{company.address || 'Company Address'}</Text>
          </View>
          <View style={styles.footerRight}>
            <Text style={styles.footerText}>Phone: {company.phone || '+91-9504061112'}</Text>
            <Text style={styles.footerText}>Email: {company.email || 'email@company.com'}</Text>
            <Text style={styles.footerText}>CIN: {company.cin || 'CIN Number'}</Text>
            <View style={{ marginTop: 8, alignItems: 'flex-end' }}>
              <Text style={[styles.logo, { fontSize: 14 }]}>vigovia ✈️</Text>
              <Text style={styles.tagline}>PLAN.PACK.GO!</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

const PDFGenerator = ({ formData, isGenerating }) => {
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
        document={<ItineraryPDF formData={formData} />}
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

export default PDFGenerator