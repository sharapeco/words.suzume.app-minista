import { MinistaLocation } from "minista"
import './root.css'

export type FrontmatterProps = {
	lang?: string
	title?: string
	layout?: string
	noindex?: boolean
	draft?: boolean
}

type RootProps = {
	location: MinistaLocation
	frontmatter?: FrontmatterProps
	children: React.ReactNode
}

const Root = ({ children }: RootProps) => {
	return (
		<>
			{children}
			<script defer src={"https://webfont.fontplus.jp/accessor/script/fontplus.js?MRlT4X70yn0%3D&box=L29zNGvvtqo%3D&aa=1&ab=2"}></script>
		</>
	)
}

export default Root
