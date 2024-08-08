import { useParams } from 'react-router-dom'
import { Share2 } from 'lucide-react'
import { toast } from 'sonner'

import amaLogo from './../assets/ama-logo.svg'
import { Button } from '../components/ui/button'
import { Messages } from '../components/messages'
import { Suspense } from 'react'
import { CreateMessageForm } from '../components/create-message-form'

export function Room() {
  const { roomId } = useParams()

  async function handleShareRoom() {
    const url = window.location.href.toString()
    try {
      if (navigator.share === undefined && !navigator.canShare()) {
        navigator.clipboard.writeText(url)
        toast.info('The room URL was copied to your clipboard!')
        return
      }
      await navigator.share({ title: 'Room', url })
    } catch (err) {
      console.error('Share failed:', err)
    }
  }
  return (
    <div className="mx-auto max-w-[40rem] flex flex-col  gap-6 py-10 px-4">
      <div className="flex items-center justify-between  gap-3  px-3">
        <div className="flex items-center gap-3">
          <img src={amaLogo} alt="AMA logo" className="h-5" />
          <span className="text-sm text-zinc-500 truncate">
            Código da sala: <span className="text-zinc-300">{roomId}</span>
          </span>
        </div>
        <Button type="button" onClick={handleShareRoom} variant="secondary">
          Compartilhar <Share2 className="size-4" />
        </Button>
      </div>
      <div className="h-px w-full bg-zinc-900" />
      <CreateMessageForm />
      <Suspense fallback={<p>Carregando...</p>}>
        <Messages />
      </Suspense>
    </div>
  )
}
