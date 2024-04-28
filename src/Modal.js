import React from 'react'
import Button from '@/apps/components/Button'
import BodyBold from '@/apps/components/Typography/BodyBold'

function Modal({ isOpen, closeModal }) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full mx-4 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-primary">Register Your Email Address</h3>
          <button onClick={closeModal} className="text-xl">✖</button>
        </div>
        <p className="text-sm text-gray-700 mb-8">
        Enter customer’s email address then verify using the activation code sent to them. You need this validation in order to complete the account registration 
        </p>
        <div className="mb-6">
          <BodyBold className="leading-8">Email Address</BodyBold>
          <input
            type="email"
            id="email"
            className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center h-5">
            <input
              id="captcha"
              aria-describedby="fake-captcha"
              name="captcha"
              type="checkbox"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="captcha" className="font-medium text-gray-700">
              I'm not a robot
            </label>
          </div>
          <div className="ml-auto">
            <label htmlFor="captcha" className="font-medium text-gray-700">
              img
            </label>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button
            onClick={() => setIsModalOpen(true)}
            label=" Register"
            className="w-full my-4 font-h4"
          />
        </div>
        <div className="w-full mt-2 mb-6 cursor-pointer">
          <button onClick={closeModal} className="text-center w-full">
            <BodyBold className="underline" textColor="text-primary">
            Go Back
            </BodyBold>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal