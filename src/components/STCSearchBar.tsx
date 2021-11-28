import { Clear, Search } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import React, { FormEvent, useState } from 'react';

export type STCSearchBarProps = {
	onSearch?: (text: string | undefined) => void;
} & TextFieldProps;

export const STCSearchBar: React.FC<STCSearchBarProps> = props => {
	const { onSearch, ...TextFieldProps } = props;

	const [text, setText] = useState<string>('');

	const submit = (event?: FormEvent) => {
		event?.preventDefault();
		onSearch?.(text || undefined);
	};

	return (
		<form onSubmit={submit}>
			<TextField
				variant="outlined"
				size="small"
				fullWidth
				value={text}
				onChange={event => setText(event.target.value)}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Search />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={() => setText('')} edge="end">
								<Clear />
							</IconButton>
						</InputAdornment>
					),
				}}
				sx={{
					'& .MuiOutlinedInput-root': {
						background: 'white',
					},
				}}
				{...TextFieldProps}
			/>
		</form>
	);
};
