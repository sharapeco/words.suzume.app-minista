import { Head } from 'minista'
import { fetchWords } from '../lib/api'
import { seion } from '../lib/kana'
import { LocationProps } from '../lib/location'
import { getWordLink } from '../lib/word-utils'
import { Word } from '../types/word'
import './index.css'

type Props = {
	words?: Word[]
}

export const getStaticData = async () => {
	const { words } = await fetchWords()
	return {
		props: {
			words,
		},
	}
}

const PageHome = ({ words }: Props & LocationProps) => {
	const wordChunks = chunkAbc(words || [])

	return (
		<>
			<Head>
				<title>ない言葉</title>
			</Head>
			<h1 className="site-title">ない言葉</h1>

			<div className="toc-wrap">
				{wordChunks.map((chunk) => (
					<section key={chunk.initial} className="toc-section">
						<h2 className="toc-header">{chunk.initial}</h2>
						<ul className="toc-list">
							{chunk.items.map((word) => (
								<li key={word.id}>
									<a href={getWordLink(word)}>{word.Name}</a>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</>
	)
}

type AbcChunk<T> = {
	initial: string
	items: T[]
}

function chunkAbc(words: Word[]): AbcChunk<Word>[] {
	const chunks: AbcChunk<Word>[] = []
	let prevInitial: string | undefined = undefined
	words.forEach((word) => {
		const initial = seion(word.Kana.charAt(0))
		if (initial !== prevInitial) {
			chunks.push({
				initial,
				items: [],
			})
			prevInitial = initial
		}
		chunks[chunks.length - 1].items.push(word)
	})
	return chunks
}

export default PageHome
