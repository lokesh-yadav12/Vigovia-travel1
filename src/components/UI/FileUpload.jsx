import React, { useRef, useState, useEffect } from 'react'

const FileUpload = ({
  label,
  value,
  onChange,
  required = false,
  error,
  disabled = false,
  className = '',
  helpText,
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png'],
  previewSize = 'large', // small, medium, large
  ...props
}) => {
  const fileInputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState('')
  const [uploading, setUploading] = useState(false)

  // Preview sizes
  const previewSizes = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  }

  useEffect(() => {
    if (value?.imagePreview) {
      setPreview(value.imagePreview)
    }
  }, [value])

  const validateFile = (file) => {
    const errors = []

    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      errors.push(`Only ${acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} files are allowed`)
    }

    // Validate file size
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1)
      errors.push(`File size must be less than ${maxSizeMB}MB`)
    }

    return errors
  }

  const compressImage = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(resolve, 'image/jpeg', quality)
      }

      img.src = URL.createObjectURL(file)
    })
  }

  const handleFiles = async (files) => {
    const file = files[0]
    if (!file) return

    setUploading(true)

    // Validate file
    const validationErrors = validateFile(file)
    if (validationErrors.length > 0) {
      onChange({ error: validationErrors[0] })
      setUploading(false)
      return
    }

    try {
      // Compress image if it's too large
      let processedFile = file
      if (file.size > 1024 * 1024) { // If larger than 1MB, compress
        processedFile = await compressImage(file)
      }

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        const imagePreview = e.target.result
        setPreview(imagePreview)
        onChange({ 
          file: processedFile, 
          imagePreview,
          error: null 
        })
        setUploading(false)
      }
      reader.onerror = () => {
        onChange({ error: 'Failed to read file' })
        setUploading(false)
      }
      reader.readAsDataURL(processedFile)
    } catch (error) {
      onChange({ error: 'Failed to process image' })
      setUploading(false)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled) return

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (disabled) return
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  const removeImage = () => {
    setPreview('')
    onChange({ file: null, imagePreview: '', error: null })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-text-dark mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {preview ? (
        <div className="relative">
          <div className={`${previewSizes[previewSize]} mx-auto mb-4 relative group`}>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <button
                type="button"
                onClick={removeImage}
                className="text-white hover:text-red-300 transition-colors"
                aria-label="Remove image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={handleClick}
              className="text-purple-medium hover:text-purple-dark text-sm font-medium transition-colors"
            >
              Change Image
            </button>
            <button
              type="button"
              onClick={removeImage}
              className="block mx-auto text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
            >
              Remove Image
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
            ${dragActive ? 'border-purple-medium bg-purple-lighter scale-105' : 'border-border-gray hover:border-purple-light'}
            ${error ? 'border-red-500 bg-red-50' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
            ${uploading ? 'pointer-events-none' : ''}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleChange}
            accept={acceptedTypes.join(',')}
            className="hidden"
            disabled={disabled}
            aria-describedby={error ? `${props.id || 'file'}-error` : helpText ? `${props.id || 'file'}-help` : undefined}
            {...props}
          />
          
          {uploading ? (
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12">
                <svg className="animate-spin h-12 w-12 text-purple-medium" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div className="text-sm text-purple-medium font-medium">
                Processing image...
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="mx-auto w-12 h-12 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 48 48" className="w-full h-full">
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-text-medium">
                  <span className="font-medium text-purple-medium">Click to upload</span> or drag and drop
                </div>
                <div className="text-xs text-text-light">
                  {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} up to {formatFileSize(maxSize)}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {helpText && !error && (
        <p className="mt-1 text-sm text-text-medium" id={`${props.id || 'file'}-help`}>
          {helpText}
        </p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center" id={`${props.id || 'file'}-error`}>
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

export default FileUpload