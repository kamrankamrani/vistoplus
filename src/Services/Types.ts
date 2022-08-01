export interface UselessFactResponse {
    text: string,
    id: string,
    source?: string,
    source_url?: string,
    permalink?: string,
    language?: string
}

export interface TranslateResponse {
    responseData?: {
        translatedText?: string
    }
}