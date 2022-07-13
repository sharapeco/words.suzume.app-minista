import dotenv from 'dotenv'
import { mkdir, writeFile } from 'fs/promises'
import airtable from 'airtable'

dotenv.config()

const env = process.env

const cacheDir = 'api-cache'

airtable.configure({
	endpointUrl: 'https://api.airtable.com',
	apiKey: env.VITE_AIRTABLE_API_KEY,
})

const fetchAllRecords = (query) => {
	return new Promise((resolve, reject) => {
		const items = []

		query.eachPage(
			function page(records, fetchNextPage) {
				records.forEach((record) => {
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
const words = await fetchAllRecords(
	base('words').select({
		view: 'Grid view',
	})
)
await writeFile(`${cacheDir}/words.json`, JSON.stringify(words, null, 2))
