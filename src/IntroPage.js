import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'
import { setPageAnalytics } from '@apps/utils/Analytics'
import ConsumerActivationPaths from '@sites/consumer/activation/ConsumerActivationPaths'
import { ContentContext } from '@apps/contexts/ContentContext'
import { APPLICATION_STATE, ApplicationContext } from '@apps/contexts/ApplicationContext'
import {
  ACCOUNT_SETUP_STATE,
  AccountSetupContext
} from '@apps/flows/activation/contexts/AccountContext'
import {
  PLANS_STATE,
  PlansContext,
  ModifyPlansContext
} from '@apps/flows/activation/contexts/PlansContext'
import ContentService from '@services/ContentService'
import { useHistory } from 'react-router-dom'
import { getBySlug } from '@apps/utils/contentful'
import useSite from '@engine/hooks/useSite'
import Sites from '@sites/index'
import PropTypes from 'prop-types'
import Link from '@/apps/components/Link'
import BodyBold from '@/apps/components/Typography/BodyBold'
import BodySmall from '@/apps/components/Typography/BodySmall'
import BodySmallBold from '@/apps/components/Typography/BodySmallBold'
import Heading1 from '@/apps/components/Typography/Heading1'
import RichText from '@/apps/components/RichText'
import Button from '@/apps/components/Button'

import Modal from './Modal'
// import Modal2 from './Modal2'
import SecurityCodeModal from './SecurityCodeModal'
import { Popup } from './Popup'

import BaseModal from './BaseModal'
import RegisterEmailModal from './RegisterEmailModal'
import VerifyCodeModal from './VerifyCodeModal'

// import Popup from '@apps/components/Popup'

const IntroPage = ({ path = '', userType }) => {
  const history = useHistory()


  //////////////////////////////////////////////////////
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const [modalType, setModalType] = useState(null)


  const handleOpenModal = (type) => {
    setModalType(type)
    setIsModalOpen(truue)
  }

  const handleCloseModal = () => {
    setModalType(null)
    setIsModalOpen(false)
  }

  const handleRegister = () => {
    setIsModalOpen(false)
  }

  const renderModalContent = () => {
    switch (modalType) {
      case 'registerEmail':
        return <div>Register Your Email Address...</div>
      case 'verifyCode':
        return <div>Verify Security Code...</div>
      default:
        return null
    }
  }
  //////////////////////////////////////////////////////


  const redirect = () => {
    history.push(path)
  }

  const {
    [APPLICATION_STATE.PROVINCES]: mappedProvinceList,
    [APPLICATION_STATE.CURRENT_LANGUAGE]: language,
    [APPLICATION_STATE.CURRENT_REGION]: region
  } = useContext(ApplicationContext)
  const { [ACCOUNT_SETUP_STATE.PROVINCE]: province } = useContext(AccountSetupContext)
  const plansContext = useContext(PlansContext)
  const modifyPlansContext = useContext(ModifyPlansContext)

  const { dynamicContent } = useContext(ContentContext)

  const consumerActivationPaths = new ConsumerActivationPaths()
  if (dynamicContent && dynamicContent.accountSetupPage.featureFlags.showSplashing) {
    history.push(consumerActivationPaths.Splash)
  }

  const { landingPage: { header = {}, content = [], shortTextFields, featureFlags } = {} } =
    dynamicContent || {}

  const newESimFlow = featureFlags?.newESimFlow

  const location = useLocation()
  const [planList, setPlanList] = useState([])

  useEffect(() => {
    // Set Analytics dataLayer
    setPageAnalytics(location, 'form', region, language)
  }, [language])

  const { getKPREPlans } = ContentService
  const site = useSite()

  useEffect(() => {
    if (region && newESimFlow && userType === Sites.consumer) {
      // FUTURE WORK: FIND PLAN WHICH THE USER SELECTED ON PREVIOUS PAGE
      getKPREPlans(language, region)
        .then((result) => {
          const {
            en: { plans: enPlans },
            fr: { plans: frPlans }
          } = result
          const langPlanList = language === 'en' ? enPlans : frPlans
          let portalPlanList
          if (site === Sites.consumer) {
            portalPlanList = langPlanList.filter((eachPlan) => {
              return (
                !eachPlan.portal ||
                eachPlan.portal === 'Consumer Only' ||
                eachPlan.portal === 'Both'
              )
            })
          } else {
            portalPlanList = langPlanList.filter((eachPlan) => {
              return (
                !eachPlan.portal || eachPlan.portal === 'Dealer Only' || eachPlan.portal === 'Both'
              )
            })
          }
          setPlanList(portalPlanList)
          modifyPlansContext({
            ...plansContext,
            [PLANS_STATE.PLANS]: {
              en: enPlans,
              fr: frPlans
            },
            [PLANS_STATE.PLAN]: portalPlanList[0]
          })
        })
        .catch((e) => console.log('error on plans fetch', e))
    } else {
      setPlanList([])
    }
  }, [language, province, mappedProvinceList, region, newESimFlow, userType])

  const textContent = useMemo(() => {
    if (!shortTextFields) return {}
    return {
      activationGetStartedMessage: getBySlug(shortTextFields, 'activationGetStartedMessage')?.value,
      activationPrivacyPolicy: getBySlug(shortTextFields, 'activationPrivacyPolicy')?.value,
      activationPrivacyPolicyLink: getBySlug(shortTextFields, 'activationPrivacyPolicyLink')?.value,
      activationGetStarted: getBySlug(shortTextFields, 'activationGetStarted')?.value,
      phoneCompatibility: getBySlug(shortTextFields, 'phoneCompatibility')?.value,
      findOutMore: getBySlug(shortTextFields, 'findOutMore')?.value,
      phoneCompatibilityHelp: getBySlug(shortTextFields, 'phoneCompatibilityHelp')?.value
    }
  }, [shortTextFields])

  const handleSplashClose = () => {
    setIsSplashOpen(false)
  }

  // const handleSplashBodyClick = (e) => {
  //   if (e.target.classList.contains('esim-psimsplash-popup')) {
  //     handleSplashClose()
  //   }
  // }

  const onClosePopUp = () => {
    setIsFreeTrial(false)
  }

  const handleExclamation = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(!isOpen)
  }

  const handleBodyClick = (e) => {
    if (e.target.classList.contains('eplan-description-popup')) {
      handleClose()
    }
  }
  
  const handleVerify = (code) => {
    setIsModalOpen(false)
  }

  const handleResendClick = () => {

  }



  return (

    <>
    {/* <Popup
     overlayClassName="plan-description-popup z-10 fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto"
     className="relative flex flex-col w-full pointer-events-auto rounded-lg"
     contentwrapperClassName="relative pointer-events-none md:w-3/6 md:mx-auto md:my-14 m-4"
     useDefaultStyles={false}
     isOpen={isOpen}
     onClose={handleClose}
     onBodyClick={handleBodyClick}
     testId="offer-detail-popup"
     id="offerDetails"
    >
      Hi
    </Popup> */}

      {/* <Popup showPopup={isOpen}>
        <div className="flex flex-col items-center p-10 rounded-lg">
          <Heading1 className="mb-10">Hi</Heading1>
        </div>
      </Popup> */}

      

      <Popup useDefaultStyles="overflow-hidden" 
        showCloseIcon={true} isOpen={isOpen} 
        className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center" 
        testId="selectedPlanSimCard-loader">
          <Heading1 className="mb-10">Hi</Heading1>
          {/* <Modal /> */}
      </Popup>

    <Button
      className="no-underline font-extrabold text-lg text-link flex flex-row items-center focus:outline-none focus:ring focus:ring-apricot-100"
      colorClass="text-slate-100"
      href=""
      onClick={(e) => handleExclamation(e)}
      onCustomClick={(e) => handleExclamation(e)}
      data-popupid="offerDetails"
      data-testid="offerDetailsBtn"
    >
      {/* <img className="h-5 w-5" alt={exclamation?.altText} src={exclamation?.url} /> */}
      <span className="ml-3 text-slate-mediumLight font-extrabold">offer details</span>
    </Button>
    
    <div className="flex flex-col max-w-6xl px-4 pb-12 m-auto mt-10 space-y-8 lg:space-y-12">
      <div className="lg:space-y-4">
        {header && (
          <>
            <Heading1 className="text-primary">{header.title}</Heading1>
            <BodySmallBold>{header.subtitle}</BodySmallBold>
          </>
        )}
      </div>
      <div className="flex flex-col space-y-4 md:space-y-0 lg:space-y-0 md:flex-row lg:flex-row md:space-x-4 lg:space-x-4">
        {content &&
          content.map((item) => {
            const {
              styledContent,
              id,
              image: { url, title: imageTitle },
              title,
              footer,
              footer2
            } = item
            return (
              <div key={id} className="flex flex-col flex-1 p-4 border-2 border-black lg:space-y-4">
                <div className="hidden md:block lg:block">
                  <img className="p-4" src={url} alt={imageTitle} />
                </div>
                {/* <BodyBold className="leading-6">{title}</BodyBold> */}
                <div className="flex flex-col justify-between h-full">
                  <RichText
                    className="pb-6"
                    config={{
                      hyperlink: { className: 'break-all font-h1 text-primary text-sm font-bold' }
                    }}
                  >
                    {styledContent}
                  </RichText>
                  {footer && (
                    <RichText
                      className="pb-3"
                      config={{
                        paragraph: { className: 'text-copy text-sm font-body leading-6' },
                        hyperlink: { className: 'break-all font-h1 text-primary text-sm font-bold' }
                      }}
                    >
                      {footer}
                    </RichText>
                  )}

                  {footer2 && (
                    <RichText
                      className="pb-4"
                      config={{ paragraph: { className: 'text-copy text-xs font-body leading-5' } }}
                    >
                      {footer2}
                    </RichText>
                  )}
                </div>
              </div>
            )
          })}
      </div>
      {newESimFlow ? (
        <div className="flex flex-col items-center self-center justify-center w-full">
          <div className="w-full sm:w-3/4">
            <BodySmall className="sm:text-center sm:block">
              {textContent?.activationGetStartedMessage}{' '}
              <Link
                target="_blank"
                href={textContent?.activationPrivacyPolicyLink}
                className="font-h1"
              >
                {textContent?.activationPrivacyPolicy}
              </Link>
            </BodySmall>
          </div>
          <div className="w-full sm:w-4/12">
            <Button
              // onClick={redirect}
              onClick={() => setIsModalOpen(true)}
              label={textContent?.activationGetStarted}
              className="w-full my-4 font-h4" 
            />
          </div>

          {/* <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} /> */}
          {/* <SecondModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} /> */}
          <SecurityCodeModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onResendClick={handleResendClick}
            onVerify={handleVerify}
            />

          {/* <BaseModal isOpen={isModalOpen} closeModal={handleCloseModal}>
            <RegisterEmailModal onRegister={handleRegister} />
            <VerifyCodeModal onRegister={handleRegister} />
            
          </BaseModal> */}

          {/* <button onClick={() => handleOpenModal('registerEmail')}>Register Email</button>
          <button onClick={() => handleOpenModal('verifyCode')}>Verify Code</button> */}

          {/* <Modal2 isOpen={modalType !== null} closeModal={handleCloseModal} content={renderModalContent()} /> */}
          

          <div className="w-full sm:w-4/12 mt-2 mb-6 cursor-pointer">
            <BodyBold className="text-center underline" textColor="text-primary">
              or continue your previous Activation
            </BodyBold>
          </div>
          <div className="w-full sm-4/12 sm:text-center">
            <BodySmall>
              {textContent?.phoneCompatibility}{' '}
              <Link href={textContent?.phoneCompatibilityHelp} className="font-h1">
                {textContent?.findOutMore}
              </Link>
            </BodySmall>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center self-center justify-center w-full md:w-2/5 lg:w-2/5 md:items-end md:self-end md:justify-end lg:items-end lg:self-end lg:justify-end">
            <BodySmall>
              {textContent?.activationGetStartedMessage}{' '}
              <Link
                target="_blank"
                href={textContent?.activationPrivacyPolicyLink}
                className="font-h1"
              >
                {textContent?.activationPrivacyPolicy}
              </Link>
            </BodySmall>
            <Button
              onClick={redirect}
              label={textContent?.activationGetStarted}
              className="w-full my-4 md:w-1/2 lg:w-1/2 font-h4"
            />
          </div>
          <div className="flex items-center self-center justify-center w-full mt-8 lg:mt-4 lg:items-start lg:self-start lg:justify-start">
            <BodySmall>
              {textContent?.phoneCompatibility}{' '}
              <Link href={textContent?.phoneCompatibilityHelp} className="font-h1">
                {textContent?.findOutMore}
              </Link>
            </BodySmall>
          </div>
        </>
      )}
    </div>

    </>
  )
}

IntroPage.propTypes = {
  path: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired
}

export default IntroPage