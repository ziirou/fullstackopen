import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { FormContainer, CommonButton, BadButton } from '../styles'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible ? 'none' : '',
    marginTop: '10px',
  }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <CommonButton onClick={toggleVisibility}>
          {props.buttonLabel}
        </CommonButton>
      </div>
      <FormContainer style={showWhenVisible}>
        {props.children}
        <BadButton onClick={toggleVisibility}>Cancel</BadButton>
      </FormContainer>
    </>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
