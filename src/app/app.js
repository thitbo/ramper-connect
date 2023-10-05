import React, { useMemo, useState, memo, useEffect } from 'react'
import ModalShowCode from '../components/Modal'
import ToastNoti from '../components/Toast'
import ContentEvm from '../components/ContentEvm'
import ContentSolana from '../components/ContentSolana'
import DropdownTab from '../components/DropdownTab'
import ContentNear from '../components/ContentNear'
import ContentCosmos from '../components/ContentCosmos'
import { useConnect } from '../controller/context/ContextProvider'
import bgHeader from '../assets/bg_header.png'
import bgHeaderMobile from '../assets/bg-header-mobile.png'
import Coin98TextLogo from '../assets/images/logos/Coin98TextLogo.svg'
import DropdownSelectChain from '../components/DropdownSelectChain'
import { REACT_SELECT_THEME } from '../controller/commons/constant'
import { useStoreGlobal } from '../store/useStoreGlobal'

const arrTabs = [
  {
    icon: 'icon-web_ethereum',
    name: 'EVM',
    value: 'evm'
  },
  {
    icon: 'icon-web_solana',
    name: 'Solana Protocol',
    value: 'solana'
  },
  // {
  //   icon: 'icon-web_near',
  //   name: 'Near Protocol',
  //   value: 'near',
  // },
  {
    icon: 'icon-web_cosmos',
    name: 'Cosmos Protocol',
    value: 'cosmos'
  }
]

const WALLETS_SUPPORT = [
  { value: 'coin98',  label: 'Coin98' },
  { value: 'tomo',  label: 'Tomo' },
  { value: 'fin',  label: 'Fin' },
  { value: 'ramper2', label: 'Ramper' },
 
]

export function App() {
  const { isConnected, isExtension } = useConnect()


  const [tabChoose, setTabChoose] = useState(arrTabs[0])
  const appProvider = useStoreGlobal((state) => state.appProvider);
  const providerInit = WALLETS_SUPPORT.find(item => item.value === appProvider)

  const [walletChoose, setWalletChoose] = useState(providerInit || WALLETS_SUPPORT[0])

  const setAppProvider = useStoreGlobal((state) => state.setAppProvider);


  useEffect(() => {
    console.log('appProvider', appProvider);
  }, [appProvider])



  const [state, setState] = useState({})

  const onUpdateState = (field, value) => {
    setState((oldState) => ({ ...oldState, [field]: value }))
  }

  const handleChooseTab = (tab) => () => {
    setTabChoose(tab)
  }

  const handleChooseWallet = (wallet) => {
    setWalletChoose(wallet)
    setAppProvider(wallet.value)
  }

  const renderTab = () => {
    return arrTabs.map((item, i) => {
      return (
        <div
          className="hidden text-white cursor-pointer duration-300 items-center mr-10 pb-8 relative whitespace-nowrap last:mr-0 md:flex"
          key={i}
          onClick={handleChooseTab(item)}
        >
          <div
            className={` ${
              tabChoose.value === item.value ? 'w-full' : 'w-0'
            } bg-gradient-to-r from-[#f1d961] to-[#d9b432] h-[2px] absolute bottom-0 transition-all`}
          ></div>
          <span className={`${item.icon} text-[#d9b432] mr-1 text-2xl`}></span>
          {item.name}
        </div>
      )
    })
  }

  const renderContent = useMemo(() => {
    switch (tabChoose.value) {
      case 'evm':
        return <ContentEvm />
      case 'near':
        return <ContentNear />
      case 'solana':
        return <ContentSolana />
      case 'cosmos':
        return <ContentCosmos />
    }
  }, [tabChoose])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tabChoose])

  // Computed Constant

  const { chainId, netVersion, walletAddress } = state

  return (
    <>
      <ModalShowCode />
      <ToastNoti />

      <div className="h-screen bg-[#0f0f0f] relative z-0 overflow-auto scrollbar-hide ">
        <img
          src={bgHeader}
          alt=""
          className="hidden md:block h-1/3 absolute -z-[1] w-full object-cover"
        />

        <img
          src={bgHeaderMobile}
          alt=""
          className="md:hidden absolute -z-[1] w-full"
        />

        <div className="max-w-screen-xl m-auto h-60 md:h-1/3 px-5 flex flex-col justify-end items-center md:justify-center md:items-start">
          <img src={Coin98TextLogo} className="w-36" alt="" />
          <div className="text-[2.8rem] text-white">
            <span className="text-[#e5b842] capitalize">{providerInit?.label} Wallet</span> Connect
          </div>

          <div className="text-white flex items-center" >
            <p>E2E Test Dapps: </p>
            <DropdownSelectChain
              className='!w-[150px] ml-3'
              styles={REACT_SELECT_THEME}
              options={WALLETS_SUPPORT}
              selectedOption={walletChoose}
              setSelectedOption={handleChooseWallet}
            />
           
          </div>

          <p className='text-white text-xs'>Is Active : {isExtension ? 'true' : 'false'}</p>
        </div>

        <div className="max-w-screen-xl m-auto flex items-center mt-8 px-5 md:overflow-x-auto scrollbar-hide">
          {renderTab()}
          <DropdownTab
            onChoose={handleChooseTab}
            itemChoose={tabChoose} // Đặt tên cái gì vậy ?????
            arrData={arrTabs}
          />
        </div>

        <div className="w-full h-px bg-[#414141]"></div>

        <div className="mt-16 m-auto max-w-screen-xl pb-[100px] px-5 md:pb-5">
          <div>
            <div className="uppercase text-white text-3xl mb-4">
              {tabChoose.name}
            </div>

            {renderContent}
          </div>
        </div>
      </div>
    </>
  )
}
export default memo(App)
