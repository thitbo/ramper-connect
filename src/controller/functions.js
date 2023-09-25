export const getProviderName = () => {
  try{
    const url = window.location.pathname 
    const providerName = url.split('/').pop() || 'coin98'
    return providerName
  }catch(e){
    return 'coin98'
  }
 
}