import { useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { Button } from './ui/button'
import { toast } from 'sonner'
import { createMessageReaction } from '../http/create-message-reaction'
import { removeMessageReaction } from '../http/remove-message-reaction'

interface MessageProps {
  message: string
  amountOfReactions: number
  answered?: boolean
  id: string
}

export function Message({
  message,
  id: messageId,
  amountOfReactions,
  answered = false,
}: MessageProps) {
  const [messageWasLiked, setMessageWasLiked] = useState(false)
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Messages component must be used within room page')
  }

  async function handleMessageReactions() {
    if (!roomId) return
    try {
      messageWasLiked && (await removeMessageReaction({ messageId, roomId }))
      !messageWasLiked && (await createMessageReaction({ messageId, roomId }))
    } catch (error) {
      !messageWasLiked && toast('Erro ao curtir mensagem')
      messageWasLiked && toast('Erro ao remover curtir mensagem')
    }
    setMessageWasLiked(!messageWasLiked)
  }
  return (
    <div>
      <li
        data-answered={answered}
        className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 
                  data-[answered=true]:pointer-events-none"
      >
        {message}
        <Button
          type="button"
          variant="text"
          liked={messageWasLiked}
          onClick={handleMessageReactions}
        >
          <ArrowUp className="size-4" /> Curtir mensagem ({amountOfReactions})
        </Button>
      </li>
    </div>
  )
}
