import React, { useState } from 'react'
import Button from '@/apps/components/Button'
import BodyBold from '@/apps/components/Typography/BodyBold'

const SecurityCodeModal = ({ isOpen, onClose, onResendClick, onVerify }) => {
  const [code, setCode] = useState(new Array(6).fill(''))

  const handleInputChange = (index) => (e) => {
    const newCode = [...code]
    newCode[index] = e.target.value
    setCode(newCode)
    // Automatically focus next input
    if (e.target.nextSibling) {
      e.target.nextSibling.focus()
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    onVerify(code.join(''))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
      onClick={onClose}
    >
    <div
        className="bg-white rounded-lg max-w-2xl w-full mx-4 p-8"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="bg-white rounded-lg px-8 pt-6 pb-8 mb-4">
          <p className="text-modalInfo mb-4 text-center text-base">
            We sent the security code to customer's phone number. If they have not received it{' '}
            <button
              onClick={onResendClick}
              className="text-center hover:underline focus:outline-none text-grape">
              click here to resend it.
            </button>
          </p>
          <div className="border-t pt-4">
            <h4 className="text-center mb-4 text-step">
              Please enter 6-digit security code sent to the Koodo Prepaid <span className="text-center hover:underline focus:outline-none text-grape">(email address)</span> 
            </h4>
            <form className="flex justify-center items-center mb-4" onSubmit={handleFormSubmit}>
              {code.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 m-2 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={code[index]}
                  onChange={handleInputChange(index)}
                  autoFocus={index === 0}
                />
              ))}
              <Button
                type="submit"
                className="w-full my-4 md:w-1/2 lg:w-1/2 font-h4"
                label="Verify"
              />
            </form>
          </div>

          <div>
            <p className="text-sm text-gray-600 mt-7 text-center">
              You have 3 attempts remaining to validate the same code.
            </p>

            <div className="w-full mt-2 mt-5 cursor-pointer">
              <button onClick={onClose} className="text-center w-full">
              <BodyBold className="underline" textColor="text-primary">
              Go Back
              </BodyBold>
              </button>
            </div>  
          </div>

      

        </div>

    



      </div>
    </div>
  )
}

export default SecurityCodeModal