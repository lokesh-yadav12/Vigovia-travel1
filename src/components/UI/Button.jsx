import React from 'react'

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'medium',
  disabled = false, 
  loading = false,
  className = '',
  ariaLabel,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:transform active:scale-95'
  
  const sizes = {
    small: 'px-3 py-1 text-sm rounded-md',
    medium: 'px-6 py-3 text-base rounded-lg',
    large: 'px-8 py-4 text-lg rounded-xl'
  }
  
  const variants = {
    primary: 'bg-purple-medium hover:bg-purple-dark text-white focus:ring-purple-medium shadow-lg hover:shadow-xl border-2 border-purple-medium hover:border-purple-dark',
    secondary: 'bg-white border-2 border-purple-medium text-purple-medium hover:bg-purple-lighter hover:border-purple-dark focus:ring-purple-medium shadow-md hover:shadow-lg',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-lg hover:shadow-xl border-2 border-red-500 hover:border-red-600',
    outline: 'border-2 border-border-gray text-text-dark hover:bg-bg-off-white hover:border-purple-light focus:ring-purple-medium bg-white',
    ghost: 'text-purple-medium hover:bg-purple-lighter focus:ring-purple-medium',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500 shadow-lg hover:shadow-xl border-2 border-green-500 hover:border-green-600'
  }
  
  const disabledClasses = 'opacity-50 cursor-not-allowed hover:transform-none active:transform-none'
  
  const buttonClasses = `
    ${baseClasses} 
    ${sizes[size]}
    ${variants[variant]} 
    ${disabled || loading ? disabledClasses : ''} 
    ${className}
  `.trim()

  const LoadingSpinner = () => (
    <svg 
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      aria-label={ariaLabel || (loading ? 'Loading' : undefined)}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner />
          <span>Generating PDF...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button