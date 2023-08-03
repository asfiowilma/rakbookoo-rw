import { useState } from 'react'
const useCollapse = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleCollapse = () => setIsCollapsed(!isCollapsed)

  return { isCollapsed, toggleCollapse }
}

export default useCollapse
