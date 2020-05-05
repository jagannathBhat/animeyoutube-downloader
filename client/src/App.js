import 'typeface-roboto'
import axios from 'axios'
import React, { useState } from 'react'
import {
	Button,
	CircularProgress,
	createMuiTheme,
	Paper,
	TextField,
	ThemeProvider,
	Typography,
	useMediaQuery,
} from '@material-ui/core'
import { Search } from '@material-ui/icons'

import './App.css'
import Episode from './Episode'
import { useStyles } from './theme'

const App = () => {
	const classes = useStyles()

	const getItem = async ({ name, img, url }) => {
		setUrl(url)
		setLoadingItem(true)

		try {
			let newEpisodes = []
			setEpisodes(newEpisodes)
			setInfo({ img, name })
			setResults(null)
			const res = await axios.post(
				'/info',
				{ url },
				{ headers: { 'Content-Type': 'application/json' } }
			)
			for (let index = res.data.start; index <= res.data.end; index++)
				newEpisodes.push(index)
			setEpisodes(newEpisodes)
		} catch (err) {
			console.error(err)
			setInfo({ name: 'Generation Failed', episodes: [] })
		}

		setLoadingItem(false)
	}

	const inputHandler = ({ target: { value } }) => setTerm(value)

	const kissAnime = () => {
		setLoadingKiss(true)
		searchItem(1)
	}

	const searchItem = async website => {
		if (term === '') {
			setInfo({ name: 'No Term entered', links: [] })
			setLoading(false)
			setLoadingKiss(false)
			return
		}

		try {
			setEpisodes([])
			setInfo(null)
			setResults(null)
			const res = await axios.post(
				'/search',
				{ term, website },
				{ headers: { 'Content-Type': 'application/json' } }
			)
			if (res.data.results.length === 0)
				setInfo({ name: 'No results found', episodes: [] })
			else setResults(res.data.results)
		} catch (err) {
			console.error(err)
			setInfo({ name: 'Generation Failed', episodes: [] })
		}
		setLoading(false)
		setLoadingKiss(false)
	}

	const submitHandler = event => {
		setLoading(true)
		event.preventDefault()
		searchItem(0)
	}

	const [url, setUrl] = useState('')

	const [episodes, setEpisodes] = useState([])

	const [info, setInfo] = useState(null)

	const [loading, setLoading] = useState(false)

	const [loadingKiss, setLoadingKiss] = useState(false)

	const [loadingItem, setLoadingItem] = useState(false)

	const [results, setResults] = useState(null)

	const [term, setTerm] = useState('')

	return (
		<ThemeProvider theme={theme}>
			<Paper
				elevation={0}
				className={
					useMediaQuery('(min-width:720px)')
						? classes.root + ' ' + classes.rootBig
						: classes.root
				}
			>
				<header>
					<Typography
						variant={useMediaQuery('(min-width:720px)') ? 'h1' : 'h3'}
						className={classes.title}
					>
						AnimeYoutube
						<br />
						Downloader
					</Typography>
					<form className={classes.form} onSubmit={submitHandler}>
						<TextField
							autoFocus
							InputProps={{
								startAdornment: <Search />,
							}}
							onChange={inputHandler}
							placeholder='Search'
							value={term}
						/>
						<div className={classes.wrapper}>
							<Button disabled={loading} type='submit'>
								Search on AnimeYoutube
							</Button>
							{loading && (
								<CircularProgress
									size={24}
									className={classes.buttonProgress}
								/>
							)}
						</div>
						<div className={classes.wrapper}>
							<Button disabled={loadingKiss} onClick={kissAnime}>
								Search on Kiss Anime
							</Button>
							{loadingKiss && (
								<CircularProgress
									size={24}
									className={classes.buttonProgress}
								/>
							)}
						</div>
					</form>
				</header>
				<main className={classes.main}>
					{results && (
						<>
							{results.map(info => (
								<div className={classes.result} onClick={() => getItem(info)}>
									{info.img && (
										<img
											alt={info.name + ' poster'}
											className={classes.img}
											src={info.img}
										/>
									)}
									<Typography component='h2' variant='h6'>
										{info.name}
									</Typography>
								</div>
							))}
						</>
					)}
					{info && (
						<div
							className={
								loadingItem
									? classes.wrapper + ' ' + classes.dark
									: classes.wrapper
							}
						>
							{info.img && (
								<img
									alt={info.name + ' poster'}
									className={classes.img}
									src={info.img}
								/>
							)}
							<Typography component='h2' variant='h4'>
								{info.name}
							</Typography>
							{loadingItem && (
								<CircularProgress
									size={24}
									className={classes.buttonProgress}
								/>
							)}
						</div>
					)}
					<div className={classes.linkList}>
						{episodes.map(no => (
							<Episode key={no} no={no} url={url} />
						))}
					</div>
				</main>
			</Paper>
		</ThemeProvider>
	)
}

const theme = createMuiTheme({
	palette: {
		type: 'dark',
	},
})

export default App
