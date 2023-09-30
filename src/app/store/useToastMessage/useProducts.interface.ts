export type TMessage = {
  title: string
  description?: string
  type: 'success' | 'info' | 'warning' | 'error'
}

export type TState = {
  message: TMessage
}

export type TActions = {
  setMessage: (message: TMessage) => void
}
