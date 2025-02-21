export enum Models {
  DEEP_SEEK_R1 = "DeepSeek-R1",
}

export enum Role {
  SYSTEM = "system",
  USER = "user",
  ASSISTANT = "assistant",
}

export interface Message {
  id: number
  role: Role
  content: string
}

export interface MessageDto {
  userId: string
  chatId: string
  content: string
}

export interface ChatRecord {
  id: string
  title: string
  Messages: Message[]
}

export interface RequestData {
  model: Models
  max_tokens: number
  temperature: number
  stream: boolean
  messages: Message[]
}

export interface ResponseData {
  id: string
  object: string
  created: number
  model: Models
  choices: Array<{
    id: number
    message: Message
    logprobs: Record<string, number>
    finish_reason: string
    stop_reason: string
  }>
  usage: {
    prompt_tokens: number
    total_tokens: number
    completion_tokens: number
  }
}
