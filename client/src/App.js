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
import { useStyles } from './theme'

const App = () => {
	const [info, setInfo] = useState(null)
	const [loading, setLoading] = useState(false)

	const classes = useStyles()

	const submitHandler = async event => {
		event.preventDefault()
		setLoading(true)

		const animeName = document.getElementById('animeNameInput').value

		if (animeName === '') {
			setInfo({ name: 'No name entered', links: [] })
			setLoading(false)
			return
		}

		try {
			const res = await axios.post(
				'/generate',
				{ name: animeName },
				{ headers: { 'Content-Type': 'application/json' } }
			)
			setInfo(res.data)
			setLoading(false)
		} catch (err) {
			console.log(err)
			setInfo({ name: 'Generation Failed', links: [] })
			setLoading(false)
		}
	}

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
							id='animeNameInput'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										animeyoutube.com/
									</InputAdornment>
								),
							}}
							placeholder='name-of-anime'
						/>
						<div className={classes.wrapper}>
							<Button disabled={loading} type='submit'>
								Generate Links
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
							<div className={classes.linkList}>
								{info.links.map((linkGroup, key) => (
									<div key={key}>
										<Typography component='p' variant='h6'>
											Episode {key + 1}
										</Typography>
										{linkGroup.map((link, key) => (
											<a
												href={link}
												key={key}
												target='_blank'
												rel='noopener noreferrer'
											>
												<Button>Link {key + 1}</Button>
											</a>
										))}
									</div>
								))}
							</div>
						</>
					) : (
						<></>
					)}
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
