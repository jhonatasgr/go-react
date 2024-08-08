import { ArrowRight } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { Button } from './ui/button'
import { createMessage } from '../http/create-message'
import { toast } from 'sonner'

export function CreateMessageForm() {
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Messages component must be used within room page')
  }

  async function handleCreateRoom(data: FormData) {
    const message = data.get('message')?.toString()
    // eslint-disable-next-line no-useless-return
    if (!message || !roomId) return

    try {
      await createMessage({ message, roomId })
    } catch (err) {
      toast('Falha ao criar pergunta, tente novamente!')
    }
  }

  return (
    <form
      action={handleCreateRoom}
      className="flex items-center p-2 gap-2 border border-zinc-800 
                  rounded-xl bg-zinc-900 ring-offset-2 ring-offset-zinc-950 
                  focus-within:ring-1 transition-colors ring-orange-400"
    >
      <input
        required
        type="text"
        name="message"
        placeholder="Qual a sua pergunta ?"
        autoComplete="off"
        className="flex-1 text-sm bg-transparent mx-2 outline-none 
                    placeholder:text-zinc-500 text-zinc-100"
      />
      <Button type="submit">
        Criar pergunta <ArrowRight className="size-4" />
      </Button>
    </form>
  )
}
