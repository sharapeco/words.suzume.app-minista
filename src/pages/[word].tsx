import { Head } from 'minista'
import { DateTime } from 'luxon'
import { fetchWords } from '../lib/api'
import { LocationProps } from '../lib/location'
import { Word } from '../types/word'
import { getWordLink, sanitizeWord } from '../lib/word-utils'
import './word.css'

type Props = {
	word?: Word
	previous?: Word
	next?: Word
}

export async function getStaticData() {
	const { words } = await fetchWords()
	return words.map((word, index) => ({
		props: {
			word,
			previous: words[index - 1],
			next: words[index + 1],
		},
		paths: {
			word: sanitizeWord(word.Name),
		},
	}))
}

export default function PageWord({
	word,
	previous,
	next,
}: Props & LocationProps) {
	if (!word) {
		return null
	}
	return (
		<>
			<Head>
				<title>{word.Name}</title>
			</Head>

			<div className='container'>
				<nav className='nav'>
					<a href="/">ない言葉</a>
				</nav>

				<article className='word'>
					<header className='word-header'>
						<h1 className='word-name'>{word.Name}</h1>
						<p className='word-kana'>{word.Kana}</p>
					</header>

					<p className='word-content'>{word.Notes}</p>

					<footer className='word-footer'>
						{word.Source && (
							<p className='word-source'>
								初出: <a href={word.Source} target='_blank'>{word.Source}</a>
							</p>
						)}
						<p className='word-date'>{formatDate(word.Date)}</p>
					</footer>
				</article>

				{(previous || next) && (
					<nav className='pager'>
						{previous && (
							<div className='previous'>← <a href={getWordLink(previous)}>{previous.Name}</a></div>
						)}
						{next && (
							<div className='next'><a href={getWordLink(next)}>{next.Name}</a> →</div>
						)}
					</nav>
				)}
			</div>
		</>
	)
}

function formatDate(dateStr: string): string {
	return DateTime.fromISO(dateStr).toFormat('yyyy年M月d日 H:mm')
}
