import { makeStyles } from '@material-ui/core'
import { green } from '@material-ui/core/colors'

export const useStyles = makeStyles(theme => ({
	buttonProgress: {
		color: green[500],
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12
	},
	form: {
		alignItems: 'start',
		display: 'flex',
		flexDirection: 'column',
		marginTop: theme.spacing(4),
		'& > *': {
			marginTop: theme.spacing(2)
		}
	},
	img: {
		maxWidth: 240,
		width: '84%'
	},
	linkList: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: theme.spacing(3)
	},
	main: {
		margin: theme.spacing(3) + 'px 0px'
	},
	root: {
		borderRadius: '0px',
		flex: 1,
		padding: theme.spacing(2)
	},
	rootBig: {
		padding: theme.spacing(6)
	},
	title: {
		fontWeight: 'lighter',
		textAlign: 'left'
	},
	wrapper: {
		position: 'relative'
	}
}))
