'use client'

import Button from '../_components/button'
import { useRouter } from 'next/navigation'

const ListActions: React.FC = () => {
  const router = useRouter()

  const handlerClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    router.push('/write')
  }

  return (
    <div>
      <Button classes="ml-auto mb-5" text="글작성" onClick={handlerClick} />
    </div>
  )
}

export default ListActions
