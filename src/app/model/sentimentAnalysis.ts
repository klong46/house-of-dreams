import { Sentiment } from "./sentiment";

export interface SentimentAnalysis{
    documentSentiment: Sentiment
    language: string
    sentences: Object
}