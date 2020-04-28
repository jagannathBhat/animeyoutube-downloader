import axios from 'axios'
import React, { useState } from 'react'
import { Button, CircularProgress, Typography } from '@material-ui/core'

import { useStyles } from './theme'

const Episode = ({ name, no }) => {
	const Classes = useStyles()

	const getLink = async () => {
		setLoading(true)
		try {
			const res = await axios.post(
				'/link',
				{ name, no },
				{ headers: { 'Content-Type': 'application/json' } }
			)
			setLinks(res.data.links)
			setLoading(false)
		} catch (err) {
			console.error(err)
		}
	}

	const [Links, setLinks] = useState(null)

	const [Loading, setLoading] = useState(false)

	return (
		<div>
			<Typography component='p' variant='h6'>
				Episode {no}
			</Typography>
			{Links ? (
				Links.map((link, key) => {
					return (
						<a href={link} key={key} target='_blank' rel='noopener noreferrer'>
							<Button>Link {key + 1}</Button>
						</a>
					)
				})
			) : (
				<div className={Classes.wrapper}>
					<Button disabled={Loading} onClick={getLink}>
						Get Links
					</Button>
					{Loading && (
						<CircularProgress size={24} className={Classes.buttonProgress} />
					)}
				</div>
			)}
		</div>
	)
}

export default Episode
