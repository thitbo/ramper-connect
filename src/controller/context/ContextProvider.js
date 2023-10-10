import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { useStoreGlobal } from '../../store/useStoreGlobal'
// import { Client, Chain } from 'coin98-connect-sdk'
import {getEngine} from '../../controller/functions'

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

  const appProvider = useStoreGlobal((state) => state.appProvider);


  // console.log('isExtension', {
  //   check: window[appProvider]
  // });

  const isExtension = useMemo(() => {
    return !!window[appProvider]
  }, [window[appProvider], appProvider]) 

  
  const client = React.useRef({})


  

  const connect = async () => {
    // Connect From Extension
    // for eVM 

    if (isExtension) {
      let engine = getEngine(appProvider)
      if(appProvider === 'coin98' || appProvider === 'ramper2'){
        engine = engine.provider
      }
      
      try {
        const result = await engine.connect()
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
