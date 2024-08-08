import { ArrowRight } from 'lucide-react'
import amaLogo from './../assets/ama-logo.svg'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { createRoom } from '../http/create-room'
import { toast } from 'sonner'

export function CreateRoom() {
  const navigate = useNavigate()
  async function handleCreateRoom(data: FormData) {
    const theme = data.get('theme')?.toString()

    if (!theme) {
      return
    }

    try {
      const { roomId } = await createRoom({ theme })
      navigate(`/room/${roomId}`)
    } catch (error) {
      toast('Erro ao criar a sala')
    }
  }

  return (
    <main className="h-screen flex items-center justify-center px-4">
      <div className="max-w-[28.125rem] flex flex-col gap-6">
        <img src={amaLogo} alt="AMA Logo" className="h-10" />
        <p className="leading-relaxed text-zinc-300 text-center">
          Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas
          mais importantes para a comunidade.
        </p>
        <form
          action={handleCreateRoom}
          className="flex items-center p-2 gap-2 border border-zinc-800 
                     rounded-xl bg-zinc-900 ring-offset-2 ring-offset-zinc-950 
                     focus-within:ring-1 transition-colors ring-orange-400"
        >
          <input
            required
            type="text"
            name="theme"
            placeholder="Nome da sala"
            autoComplete="off"
            className="flex-1 text-sm bg-transparent mx-2 outline-none 
                     placeholder:text-zinc-500 text-zinc-100"
          />
          <Button type="submit">
            Criar sala <ArrowRight className="size-4" />
          </Button>
        </form>
      </div>
    </main>
  )
}
