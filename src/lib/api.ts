import fs from 'fs/promises'
import { Word } from '../types/word'

const cacheDir = 'api-cache'

const readJson = async <T>(modelUid: string) => {
	if (typeof window === 'undefined') {
		const content = await fs.readFile(`${cacheDir}/${modelUid}.json`, {
			encoding: 'utf-8',
		})
		return JSON.parse(content) as T[]
	} else {
		const response = await fetch(`/${cacheDir}/${modelUid}.json`)
		const content = await response.json()
		return content as T[]
	}
}

const strcmp = (a: string, b: string) => {
	if (a === b) {
		return 0
	} else if (a < b) {
		return -1
	} else {
		return 1
	}
}

export const fetchWords = async () => {
	const words = (await readJson<Word>('words'))
		.filter((word) => word.Status === 'public')
	words.sort((a, b) => strcmp(a.Kana, b.Kana))
	return {
		words,
		total: words.length,
	}
}
