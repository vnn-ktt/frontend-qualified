export interface IChatMessage {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
    status?: 'sending' | 'sent' | 'error'
}

export interface IQuickAction {
    label: string
    icon: string
    command: string
    color?: string
}

export interface ITelegramResponse {
    success: boolean
    reply?: string
    error?: string
    data?: any
}