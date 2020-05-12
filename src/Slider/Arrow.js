import React from 'react'

const getIcon = direction => direction === 'right' ? '>>' : '<<'
const getAriaLabel = direction => direction === 'right' ? 'Next' : 'Previous'
const getClassName = direction => direction === 'right' ?'glider-next': 'glider-prev'

const Arrow = ({ direction = 'right', className = '' }) => {
  const icon = getIcon(direction)
  const ariaLabel = getAriaLabel(direction)
  const mountedClassName = `${getClassName(direction)} ${className}`.trim()

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={mountedClassName}>
      {icon}
    </button>
  )
}

export default Arrow
