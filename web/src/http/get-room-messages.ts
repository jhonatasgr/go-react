interface GetRoomMessagesRequestProps {
  roomId: string
}

export interface GetRoomMessagesResponseProps {
  messages: {
    id: string
    message: string
    amountOfReactions: number
    answered: boolean
  }[]
}
export async function getRoomMessages({
  roomId,
}: GetRoomMessagesRequestProps): Promise<GetRoomMessagesResponseProps> {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`,
  )

  const data: Array<{
    ID: string
    RoomID: string
    Message: string
    ReactionCount: number
    Answered: boolean
  }> = await response.json()
  return {
    messages: data.map((message) => {
      return {
        id: message.ID,
        message: message.Message,
        amountOfReactions: message.ReactionCount,
        answered: message.Answered,
      }
    }),
  }
}
