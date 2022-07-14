type WordStatus = 'public' | 'draft'

export type Word = {
	id: string
	Date: string
	Name: string
	Kana: string
	Source: string
	Notes: string
	Status: WordStatus
}
