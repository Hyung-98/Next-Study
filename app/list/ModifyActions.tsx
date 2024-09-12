'use client'

import Button from '../_components/button'
import { useRouter } from 'next/navigation'

interface ModifyActionsProps {
  id: string
}

const ModifyActions: React.FC<ModifyActionsProps> = ({ id }) => {
  const router = useRouter()

  const handlerClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    router.push(`/list/modify/${id}`)
  }

  return (
    <div>
      <Button classes="ml-auto" text="수정" onClick={handlerClick} />
    </div>
  )
}

export default ModifyActions
