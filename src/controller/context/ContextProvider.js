import React, { createContext, useContext, useState, useEffect } from 'react'
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

  const isExtension = !!window.ramper2
  const client = React.useRef({})

  useEffect(() => {
    console.log('Ramper wallet installed: ', isExtension)
  }, [])

  const connect = async () => {
    // Connect From Extension
    if (isExtension) {
      try {
        const result = await window.ramper2.provider.connect()
        setIsConnected(true)

        return result
      } catch (e) {}
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
