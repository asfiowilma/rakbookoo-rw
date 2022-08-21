import { useEffect, useState } from 'react'

export function useDelayUnmount(
  isMounted: boolean,
  delayTime: number
): boolean {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    let timeoutId: unknown
    if (isMounted && !shouldRender) {
      // element renders as usual, without delay
      setShouldRender(true)
    } else if (!isMounted && shouldRender) {
      // if element is about to unmount, delay the rerender with timeout
      timeoutId = setTimeout(() => setShouldRender(false), delayTime)
    }
    return () => clearTimeout(timeoutId as number)
  }, [isMounted, delayTime, shouldRender])

  // tells us whether the element is ready to mount
  return shouldRender
}
