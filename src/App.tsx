import { CssBaseline } from '@mui/material';
import { grey, pink, purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { STCProductPage } from './page/STCProductPage';

const theme = createTheme({
	palette: {
		primary: {
			main: purple[500],
		},
		secondary: {
			main: pink[500],
		},
		background: {
			paper: grey[50],
		},
	},
});

export const App: React.FC = () => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<STCProductPage />
			</ThemeProvider>
		</BrowserRouter>
	);
};
