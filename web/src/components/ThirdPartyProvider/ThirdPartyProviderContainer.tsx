import ThirdPartyProviderButton from './ThirdPartyProviderButton'

export default ({ providers, onProviderClick, loading, ...rest }) => {
  if (loading) {
    return <div className="flex items-center justify-center">Loading..</div>
  }
  return (
    <>
      <div className="divider">atau</div>
      <div {...rest} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {providers.map((provider) => (
          <ThirdPartyProviderButton
            key={provider.value}
            provider={provider}
            onClick={onProviderClick}
          />
        ))}
      </div>
    </>
  )
}
