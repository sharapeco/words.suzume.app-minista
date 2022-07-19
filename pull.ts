import dotenv from 'dotenv'
import { mkdir, writeFile } from 'fs/promises'
import airtable, { FieldSet, Records } from 'airtable'
import { WordAT } from './src/types/word'
import { ImportMetaEnv } from './src/env'

type ProcessEnv = {
	[key: string]: string | undefined
}

dotenv.config()

const env = process.env as ProcessEnv & ImportMetaEnv

const cacheDir = 'api-cache'

airtable.configure({
	endpointUrl: 'https://api.airtable.com',
	apiKey: env.VITE_AIRTABLE_API_KEY,
})

const fetchAllRecords = <T extends FieldSet>(
	query
): Promise<(T & { id: string })[]> => {
	return new Promise((resolve, reject) => {
		const items: (T & { id: string })[] = []

		query.eachPage(
			function page(records: Records<T>, fetchNextPage) {
				records.forEach((record) => {
					console.log(record)
					items.push({
						...record.fields,
						id: record.id,
					})
				})
				fetchNextPage()
			},
			function done(err) {
				if (err) {
					console.error(err)
					reject()
					return
				}
				resolve(items)
			}
		)
	})
}

try {
	await mkdir(`${cacheDir}`)
} catch (_) {}

const base = airtable.base(env.VITE_BASE_ID)
const words = await fetchAllRecords<WordAT>(
	base('words').select({
		view: 'Grid view',
	})
)
await writeFile(`${cacheDir}/words.json`, JSON.stringify(words, null, 2))
