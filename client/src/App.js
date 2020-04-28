import 'typeface-roboto'
import axios from 'axios'
import React, { useState } from 'react'
import {
	Button,
	CircularProgress,
	createMuiTheme,
	InputAdornment,
	Paper,
	TextField,
	ThemeProvider,
	Typography,
	useMediaQuery,
} from '@material-ui/core'

import './App.css'
import Episode from './Episode'
import { useStyles } from './theme'

const App = () => {
	const classes = useStyles()

	const inputHandler = ({ target: { value } }) => setAnimeName(value)

	const submitHandler = async event => {
		event.preventDefault()
		setLoading(true)

		if (animeName === '') {
			setInfo({ name: 'No name entered', links: [] })
			setLoading(false)
			return
		}

		try {
			const res = await axios.post(
				'/info',
				{ name: animeName },
				{ headers: { 'Content-Type': 'application/json' } }
			)
			setInfo(res.data)
			let newEpisodes = []
			for (let index = res.data.start; index <= res.data.end; index++)
				newEpisodes.push(index)
			setEpisodes(newEpisodes)
		} catch (err) {
			console.error(err)
			setInfo({ name: 'Generation Failed', episodes: [] })
		}
		setLoading(false)
	}

	const [animeName, setAnimeName] = useState('')

	const [episodes, setEpisodes] = useState([])

	const [info, setInfo] = useState(null)

	const [loading, setLoading] = useState(false)

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
								startAdornment: (
									<InputAdornment position='start'>
										animeyoutube.com/
									</InputAdornment>
								),
							}}
							onChange={inputHandler}
							placeholder='name-of-anime'
							value={animeName}
						/>
						<div className={classes.wrapper}>
							<Button disabled={loading} type='submit'>
								Start
							</Button>
							{loading && (
								<CircularProgress
									size={24}
									className={classes.buttonProgress}
								/>
							)}
						</div>
					</form>
				</header>
				<main className={classes.main}>
					{info !== null ? (
						<>
							{info.img ? (
								<img
									alt={info.name + ' poster'}
									className={classes.img}
									src={info.img}
								/>
							) : (
								<></>
							)}
							<Typography component='h2' variant='h4'>
								{info.name}
							</Typography>
						</>
					) : (
						<></>
					)}
					<div className={classes.linkList}>
						{episodes.map(no => (
							<Episode name={animeName} key={no} no={no} />
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
