import { AppBar, Typography } from '@mui/material';
import React from 'react';
import { STCContainer } from './STCContainer';
import Icon from '../resources/icon.svg';
import { Box } from '@mui/system';
import { useHistory } from 'react-router';

export const STCAppBar: React.FC = props => {
	const history = useHistory();

	return (
		<AppBar position="static" elevation={0} sx={{ paddingTop: 8, paddingBottom: 1.5 }}>
			<STCContainer>
				<Box sx={{ display: 'inline-flex', alignItems: 'flex-end', cursor: 'pointer' }} onClick={() => history.push('/')}>
					<img src={Icon} width={64} height={64} style={{ border: '2px solid white', borderRadius: 10 }} />
					<Box marginLeft={1.5} />
					<Box>
						<Typography variant="h4">내려 가즈아</Typography>
						<Typography variant="subtitle2" sx={{ marginLeft: 0.5 }}>
							컴퓨터 부품 가격 추이 차트 사이트
						</Typography>
					</Box>
				</Box>
			</STCContainer>
		</AppBar>
	);
};
