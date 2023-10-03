import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { getProviderName } from '../functions'
// import { Client, Chain } from 'coin98-connect-sdk'

export const ConnectContext = createContext({
  isConnected: false,
  isExtension: false,
  connect: null,
  client: null
})

export const ContextProvider = ({ children }) => {
  // this state will be shared with all components
  const [isConnected, setIsConnected] = useState(false)
  const [state, onUpdateState] = useState({})
  const providerName = getProviderName()

  console.log('isExtension', {
    check: window[providerName]
  });

  const isExtension = useMemo(() => {
    return !!window[providerName]
  }, [window[providerName]]) 

  
  const client = React.useRef({})


  useEffect(() => {
    console.log('Ramper wallet installed: ', isExtension)
  }, [])

  const connect = async () => {
    // Connect From Extension
    if (isExtension) {
      try {
        const result = await window[providerName].provider.connect()
        setIsConnected(true)
        setState({ accounts: result });
        return result
      } catch (e) {
        console.log('err', e);
      }
    }
  }

  const setState = (valueMap) => {
    // Map State
    onUpdateState((state) => {
      Object.keys(valueMap).forEach((it) => {
        state[it] = valueMap[it]
      })
      return { ...state }
    })
  }

  const value = {
    isConnected,
    isExtension,
    connect,
    client: client.current,
    state,
    setState
  }

  return (
    <ConnectContext.Provider value={value}>{children}</ConnectContext.Provider>
  )
}

export const useConnect = () => {
  return useContext(ConnectContext)
}
