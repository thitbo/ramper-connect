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

    if(name === 'tomo'){
      return window?.tomo
    }
    if(name === 'ramper2'){
      return window?.ramper2
    }
    if(name === 'fin'){
      return window?.fin
    }
    if(name === 'ninji'){
      return window?.ninji
    }
    if(name === 'coin98'){
      return window?.coin98
    }

    return window.coin98
  }catch(e){
    console.log('err', e);
    return null
  }
 
}