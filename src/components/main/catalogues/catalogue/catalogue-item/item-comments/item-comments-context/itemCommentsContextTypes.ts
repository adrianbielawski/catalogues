export const CHANGE_REPLY_TO = 'CHANGE_REPLY_TO'

interface ChangeReplyTo {
    type: typeof CHANGE_REPLY_TO,
    replyTo: ReplyToType
}

export type Action = ChangeReplyTo

type Id = number | null

interface ReplyTo {
    id: Id,
    username: string,
}

export type ReplyToType = ReplyTo | null

export interface ItemCommentsInitialState {
    replyTo: ReplyToType
}

export interface ItemCommentsContextInterface extends ItemCommentsInitialState {
    changeReplyTo: (replyTo: ReplyToType) => void
}