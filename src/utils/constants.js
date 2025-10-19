// Application constants
export const ACTIVITY_TYPES = [
  'Nature/Sightseeing',
  'Airlines Standard', 
  'Adventure',
  'Cultural',
  'Other'
]

export const TCS_OPTIONS = [
  'Not Collected',
  'Collected'
]

export const FILE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
  ACCEPTED_EXTENSIONS: ['.jpg', '.jpeg', '.png']
}

export const VALIDATION_RULES = {
  MIN_NAME_LENGTH: 2,
  MAX_TITLE_LENGTH: 100,
  MAX_HOTEL_NAME_LENGTH: 100,
  MIN_DAYS: 1,
  MAX_DAYS: 30,
  MIN_NIGHTS: 0,
  MAX_NIGHTS: 29,
  MIN_TRAVELERS: 1,
  MAX_TRAVELERS: 50,
  IATA_CODE_LENGTH: 3,
  MIN_ACTIVITIES_PER_PERIOD: 1,
  MAX_ACTIVITIES_PER_PERIOD: 10,
  MIN_TOTAL_ACTIVITIES: 7
}

export const DEFAULT_INSTALLMENT_DUE_DATES = [
  'Initial Payment',
  'Post Visa Approval', 
  '20 Days Before Departure'
]

export const DEFAULT_COMPANY_INFO = {
  name: 'Vigovia Tech Pvt. Ltd',
  address: 'Registered Office: H4-109 Cimalai Hills, Links Business Park, Karnataka, India',
  phone: '+91-9504061112',
  email: 'Utkarsh@Vigovia.Com',
  cin: 'U79110KA2024PTC191896'
}

export const PDF_CONFIG = {
  PAGE_SIZE: 'A4',
  MARGINS: 15, // mm
  COLORS: {
    PURPLE_DARK: '#3D2463',
    PURPLE_MEDIUM: '#5B3A99',
    PURPLE_LIGHT: '#E8DFF5',
    PURPLE_LIGHTER: '#F5F0FF',
    GRADIENT_START: '#4A9FE8',
    GRADIENT_END: '#7B6FDB',
    BLUE_LINK: '#2B7DE9',
    BORDER_GRAY: '#E5E5E5',
    BORDER_PURPLE: '#D0C0E8',
    BORDER_LIGHT_PURPLE: '#E8E0F5',
    TEXT_BLACK: '#000000',
    TEXT_DARK: '#333333',
    TEXT_MEDIUM: '#666666',
    TEXT_LIGHT: '#999999',
    BG_WHITE: '#FFFFFF',
    BG_OFF_WHITE: '#FAFAFA',
    BG_LIGHT_GRAY: '#F8F8F8'
  }
}