import { Head } from 'minista'
import './word.css'

export default function Page404() {
	return (
		<>
			<Head>
				<title>見つかりません</title>
			</Head>

			<div className="container">
				<nav className="nav">
					<a href="/">ない言葉</a>
				</nav>

				<article className="word">
					<header className="word-header">
						<h1 className="word-name">見つかりません</h1>
					</header>
					<p className="word-content">
						このページは移動もしくは削除された可能性があります。
					</p>
					<p className="word-content">
						<a href="/">索引</a>から探してみてください。
					</p>
				</article>
			</div>
		</>
	)
}
