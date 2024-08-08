import { useEffect } from 'react'
import { GetRoomMessagesResponseProps } from '../http/get-room-messages'
import { useQueryClient } from '@tanstack/react-query'

interface UseMessagesWebSocketsParams {
  roomId: string
}

type WebhookMessage =
  | { kind: 'message_answered'; value: { id: string } }
  | { kind: 'message_created'; value: { id: string; message: string } }
  | { kind: 'message_reaction_increased'; value: { id: string; count: number } }
  | { kind: 'message_reaction_decreased'; value: { id: string; count: number } }

export function UseMessagesWebSockets({ roomId }: UseMessagesWebSocketsParams) {
  const queryClient = useQueryClient()
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`)

    ws.onopen = () => {
      console.log('ws connected')
    }
    ws.onclose = () => {
      console.log('ws connection closed')
    }
    ws.onmessage = (event) => {
      const data: WebhookMessage = JSON.parse(event.data)

      switch (data.kind) {
        case 'message_created':
          queryClient.setQueryData<GetRoomMessagesResponseProps>(
            ['messages', roomId],
            (state) => {
              return {
                messages: [
                  ...(state?.messages ?? []),
                  {
                    id: data.value.id,
                    message: data.value.message,
                    amountOfReactions: 0,
                    answered: false,
                  },
                ],
              }
            },
          )
          break
        case 'message_answered':
          queryClient.setQueryData<GetRoomMessagesResponseProps>(
            ['messages', roomId],
            (state) => {
              if (!state) {
                return undefined
              }
              return {
                messages: state.messages.map((item) => {
                  if (item.id === data.value.id) {
                    return { ...item, answered: true }
                  }
                  return item
                }),
              }
            },
          )
          break
        case 'message_reaction_decreased':
        case 'message_reaction_increased':
          queryClient.setQueryData<GetRoomMessagesResponseProps>(
            ['messages', roomId],
            (state) => {
              if (!state) {
                return undefined
              }
              return {
                messages: state.messages.map((item) => {
                  if (item.id === data.value.id) {
                    return { ...item, amountOfReactions: data.value.count }
                  }
                  return item
                }),
              }
            },
          )
          break
      }
    }
    return () => {
      ws.close()
    }
  }, [roomId, queryClient])
}
