import { Chip, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useHierarchicalCategory } from '../hooks/useHierarchicalCategory';
import { STCContainer } from './STCContainer';
import { grey, purple } from '@mui/material/colors';
import { useHistory, useLocation } from 'react-router';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { STCSearchBar } from '../components/STCSearchBar';

export const STCFilteringBar: React.FC = props => {
	const { response: hierarchicalizedCategories, pending, error } = useHierarchicalCategory();

	const location = useLocation();
	const history = useHistory();

	const searchParams = new URLSearchParams(location.search);

	const focusedCategoryName = searchParams.get('category_name') || undefined;
	const focusedCategoryLevel1 = searchParams.get('category_level1') || undefined;
	const focusedCategoryLevel2 = searchParams.get('category_level2') || undefined;
	const searchText = searchParams.get('search') || undefined;

	const [collapsed, setCollapsed] = useState(false);

	const onApplyFilter = ({
		categoryName,
		categoryLevel1,
		categoryLevel2,
		search,
	}: {
		categoryName?: string;
		categoryLevel1?: string;
		categoryLevel2?: string;
		search?: string;
	}) => {
		const params = new URLSearchParams();

		if (categoryName !== undefined) params.set('category_name', categoryName);
		if (categoryLevel1 !== undefined) params.set('category_level1', categoryLevel1);
		if (categoryLevel2 !== undefined) params.set('category_level2', categoryLevel2);
		if (search !== undefined) params.set('search', search);

		// open collapsed filter
		if (categoryName !== undefined) setCollapsed(false);

		const url = `/products?${params.toString()}`;

		if (location.pathname === '/products') {
			history.replace(url);
		} else {
			history.push(url);
		}
	};

	return hierarchicalizedCategories === undefined ? (
		<></>
	) : (
		<Box sx={{ position: 'sticky', top: 0 }}>
			{/* category_name */}
			<Box sx={{ paddingY: 1, background: purple[600] }}>
				<STCContainer>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Box sx={{ '& > *:not(:first-child)': { marginLeft: 2 } }}>
							{Object.keys(hierarchicalizedCategories).map(categoryName => (
								<Chip
									key={categoryName}
									label={categoryName}
									sx={{
										color: 'primary.contrastText',
										fontSize: 14,
										bgcolor: 'secondary.main',
										background: focusedCategoryName === categoryName ? undefined : 'transparent',
									}}
									onClick={() =>
										onApplyFilter({
											categoryName,
											categoryLevel1: undefined,
											categoryLevel2: undefined,
											search: undefined,
										})
									}
								/>
							))}
						</Box>

						<STCSearchBar
							defaultValue={searchText}
							onSearch={text =>
								onApplyFilter({
									categoryName: focusedCategoryName,
									categoryLevel1: focusedCategoryLevel1,
									categoryLevel2: focusedCategoryLevel2,
									search: text,
								})
							}
						/>
					</Box>
				</STCContainer>
			</Box>
			{focusedCategoryName !== undefined && (
				<>
					{collapsed !== true && (
						<Box sx={{ paddingY: 1.5, background: grey[300], overflowX: 'auto' }}>
							<STCContainer>
								<Box sx={{ display: 'flex', '& > *:not(:first-child)': { marginLeft: 8 } }}>
									{Object.keys(hierarchicalizedCategories[focusedCategoryName]).map(categoryLevel1 => {
										const level1Focused = focusedCategoryLevel1 === categoryLevel1;

										return (
											<Box key={categoryLevel1}>
												<Link
													variant="h6"
													sx={{ fontWeight: 'bold', '&:hover': { cursor: 'pointer' } }}
													color={level1Focused ? 'primary' : 'textSecondary'}
													underline={level1Focused ? 'always' : 'hover'}
													onClick={() =>
														onApplyFilter({
															categoryName: focusedCategoryName,
															categoryLevel1,
															categoryLevel2: undefined,
															search: undefined,
														})
													}>
													{categoryLevel1}
												</Link>
												<Box sx={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: 'repeat(8, auto)' }}>
													{hierarchicalizedCategories[focusedCategoryName][categoryLevel1].map(categoryLevel2 => {
														const level2Focused = level1Focused && focusedCategoryLevel2 === categoryLevel2;

														return (
															<Link
																key={categoryLevel2}
																sx={{
																	marginRight: 4,
																	whiteSpace: 'nowrap',
																	'&:hover': { cursor: 'pointer' },
																}}
																variant="subtitle2"
																underline={level2Focused ? 'always' : 'hover'}
																color={level2Focused ? 'primary' : 'textSecondary'}
																onClick={() =>
																	onApplyFilter({
																		categoryName: focusedCategoryName,
																		categoryLevel1,
																		categoryLevel2,
																		search: undefined,
																	})
																}>
																{categoryLevel2}
															</Link>
														);
													})}
												</Box>
											</Box>
										);
									})}
								</Box>
							</STCContainer>
						</Box>
					)}
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							backgroundColor: '#d3d3d3',
							paddingY: 0.25,
							'&:hover': { backgroundColor: '#bfbfbf', cursor: 'pointer' },
						}}
						onClick={() => setCollapsed(!collapsed)}>
						<Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
							{collapsed === true ? (
								<>
									<KeyboardArrowDown fontSize="small" /> 펼치기
								</>
							) : (
								<>
									<KeyboardArrowUp fontSize="small" /> 접기
								</>
							)}
						</Typography>
					</Box>
				</>
			)}
		</Box>
	);
};
