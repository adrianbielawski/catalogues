export const CHANGE_REPLY_TO = 'CHANGE_REPLY_TO'
export const CLEAR_REPLY_TO = 'CLEAR_REPLY_TO'

interface ChangeReplyTo {
  type: typeof CHANGE_REPLY_TO
  replyTo: ReplyToType
}

interface clearReplyTo {
  type: typeof CLEAR_REPLY_TO
}

export type Action = ChangeReplyTo | clearReplyTo

type Id = number | null

interface ReplyTo {
  id: Id
  username: string
}

export type ReplyToType = ReplyTo | null

export interface ItemCommentsInitialState {
  replyTo: ReplyToType
}

export interface ItemCommentsContextInterface extends ItemCommentsInitialState {
  changeReplyTo: (replyTo: ReplyToType) => void
  clearReplyTo: () => void
}
