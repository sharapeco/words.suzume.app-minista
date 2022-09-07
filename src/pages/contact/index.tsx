import { Head } from 'minista'

export default function Contact() {
	return (
		<>
			<Head>
				<title>Contact</title>
			</Head>
			<form
				name="contact"
				action="/contact/success"
				method="POST"
				data-netlify="true"
			>
				<input
					type="hidden"
					name="subject"
					value="『ない言葉』へのお問い合わせ"
				/>
				<p>
					<label>
						Your Name: <input type="text" name="name" />
					</label>
				</p>
				<p>
					<label>
						Your Email: <input type="email" name="email" />
					</label>
				</p>
				<p>
					<label>
						Your Role:{' '}
						<select name="role[]" multiple>
							<option value="leader">Leader</option>
							<option value="follower">Follower</option>
						</select>
					</label>
				</p>
				<p>
					<label>
						Message: <textarea name="message"></textarea>
					</label>
				</p>
				<p>
					<button type="submit">Send</button>
				</p>
			</form>
		</>
	)
}
