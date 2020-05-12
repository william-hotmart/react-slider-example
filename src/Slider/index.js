import React, { useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import Glider from 'glider-js'
import 'glider-js/glider.css'

import Arrow from './Arrow'
import Dots from './Dots'

const settings = {
  slidesToShow: 1,
  dots: '.dots',
  draggable: true,
  arrows: {
    prev: '.glider-prev',
    next: '.glider-next'
  }
}

let slider

const Slider = ({
  children,
  onSlideVisible,
  onLoad,
  onAnimated,
  onRemove,
  onRefresh,
  onAdd,
  onDestroy,
  onSlideHidden,
  index = undefined,
  className = '',
  containerClassName = '',
  dotsClassName = '',
  nextArrowClassName = '',
  prevArrowClassName = '',
  showDots = true,
  showArrows = true
}) => {
  const ref = useRef(null)

  const addListeners = useCallback(
    () => {
      ref.current.addEventListener('glider-slide-visible', onSlideVisible);
      ref.current.addEventListener('glider-loaded', onLoad);
      ref.current.addEventListener('glider-animated', onAnimated);
      ref.current.addEventListener('glider-remove', onRemove);
      ref.current.addEventListener('glider-refresh', onRefresh);
      ref.current.addEventListener('glider-add', onAdd);
      ref.current.addEventListener('glider-destroy', onDestroy);
      ref.current.addEventListener('glider-slide-hidden', onSlideHidden);
    }, [onAdd, onAnimated, onDestroy, onLoad, onRefresh, onRemove, onSlideHidden, onSlideVisible]
  )

  const removeListeners = useCallback(
    () => {
      ref.current.removeEventListener('glider-slide-visible', onSlideVisible);
      ref.current.removeEventListener('glider-loaded', onLoad);
      ref.current.removeEventListener('glider-animated', onAnimated);
      ref.current.removeEventListener('glider-remove', onRemove);
      ref.current.removeEventListener('glider-refresh', onRefresh);
      ref.current.removeEventListener('glider-add', onAdd);
      ref.current.removeEventListener('glider-destroy', onDestroy);
      ref.current.removeEventListener('glider-slide-hidden', onSlideHidden);
    }, [onAdd, onAnimated, onDestroy, onLoad, onRefresh, onRemove, onSlideHidden, onSlideVisible]
  )

  useEffect(() => {
    slider = new Glider(ref.current, settings)
    addListeners()

    return () => {
      removeListeners()
      slider.destroy()
    }
  }, [addListeners, removeListeners])

  useEffect(() => {
    if (index) {
      slider.scrollItem(index)
    }
  }, [index])

  return (
    <div className={`glider-contain ${containerClassName}`}>
      <div ref={ref} className={`glider ${className}`}>
        {children}
      </div>

      {
        showArrows && (
          <>
            <Arrow direction="left" className={prevArrowClassName} />
            <Arrow className={nextArrowClassName} />
          </>
        )
      }

      {showDots && <Dots className={dotsClassName} />}
    </div>
  )
}

Slider.propTypes = {
  onSlideVisible: PropTypes.func,
  onLoad: PropTypes.func,
  onAnimated: PropTypes.func,
  onRemove: PropTypes.func,
  onRefresh: PropTypes.func,
  onAdd: PropTypes.func,
  onDestroy: PropTypes.func,
  onSlideHidden: PropTypes.func,
  index: PropTypes.number,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  dotsClassName: PropTypes.string,
  nextArrowClassName: PropTypes.string,
  prevArrowClassName: PropTypes.string,
  showDots: PropTypes.bool,
  showArrows: PropTypes.bool
}

export default Slider
