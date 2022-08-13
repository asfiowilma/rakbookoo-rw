import { FcGoogle } from 'react-icons/fc'
import { SiDiscord } from 'react-icons/si'

import { useAuth } from '@redwoodjs/auth'

import ThirdPartyProviderContainer from './ThirdPartyProviderContainer'

const thirdPartyProviders = [
  { value: 'google', logo: <FcGoogle /> },
  { value: 'discord', logo: <SiDiscord className="text-indigo-500" /> },
]

const ThirdPartyProvider = ({ loading }) => {
  const { logIn } = useAuth()
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
