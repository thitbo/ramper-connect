export const getProviderName = () => {
  try{
    const url = window.location.pathname 
    const providerName = url.split('/').pop() || 'coin98'
    return providerName
  }catch(e){
    return 'coin98'
  }
 
}
export const getProvider = (name) => {
  try{
    let provider = window.coin98?.provider
    switch(name) {
      case 'tomo':
        // code block
        provider = window?.tomo
        break;
      case 'ramper2':
        provider = window?.ramper2?.provider
        break;
      case 'fin':
        provider = window.fin
      default:
        provider = window.ramper2?.provider
    }

    return provider
  }catch(e){
    console.log('err', e);
    return null
  }
 
}