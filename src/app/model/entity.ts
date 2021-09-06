import { Sentiment } from "./sentiment";

export interface Entity{
    name: string
    type: string
    metadata: string
    salience: number
    mentions: Object
    sentiment: Sentiment
}