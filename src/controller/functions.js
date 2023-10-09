export const getProviderName = () => {
  try{
    const url = window.location.pathname 
    const providerName = url.split('/').pop() || 'coin98'
    return providerName
  }catch(e){
    return 'coin98'
  }
 
}
export const getEngine = (name) => {
  try{
    let provider = window.coin98
    switch(name) {
      case 'tomo':
        // code block
        provider = window?.tomo
        break;
      case 'ramper2':
        provider = window?.ramper2
        break;
      case 'fin':
        provider = window.fin
      case 'coin98':
        provider = window.coin98
      default:
        provider = window.ramper2
    }

    return provider
  }catch(e){
    console.log('err', e);
    return null
  }
 
}