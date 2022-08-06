import { useAuth } from '@redwoodjs/auth'
import logoDiscord from '../../lib/images/thirdparty-logos/discord.png'
import logoGoogle from '../../lib/images/thirdparty-logos/google.png'
import ThirdPartyProviderContainer from './ThirdPartyProviderContainer'

const thirdPartyProviders = [
  { value: 'google', label: 'Google', logo: logoGoogle },
  { value: 'discord', label: 'Discord', logo: logoDiscord, disabled: true },
]

const ThirdPartyProvider = ({ loading }) => {
  const {logIn} = useAuth()
  return (
    <ThirdPartyProviderContainer
            providers={thirdPartyProviders}
            loading={loading}
            onProviderClick={async (e) => {
              await logIn({
                provider: e.target.value,
                redirectTo: `${process.env.URL}/supabase/welcome`,
              })
            }}
          />
  )
}

export default ThirdPartyProvider
