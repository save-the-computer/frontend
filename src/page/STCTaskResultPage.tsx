import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box, BoxProps } from '@mui/system';
import React from 'react';
import { STCPageLoadingBar } from '../components/STCPageLoadingBar';
import { useFetch } from '../hooks/useFetch';
import { STCContainer } from '../layout/STCContainer';
import { PaginatedListResponse } from '../types/response';
import { TaskResult } from '../types/task-result';

export type STCTaskResultPageProps = BoxProps;

export const STCTaskResultPage: React.FC<STCTaskResultPageProps> = props => {
	const { ...BoxProps } = props;

	const { response: taskResults, pending, error } = useFetch<PaginatedListResponse<TaskResult>>('/task_results/');

	return (
		<Box {...BoxProps}>
			{pending === true && <STCPageLoadingBar />}

			<Box marginTop={8} />

			<STCContainer>
				{taskResults === undefined ? (
					<>잠시만 기다려주세요...</>
				) : (
					<Box>
						<TableContainer component={Paper}>
							<Table size="small" sx={{ whiteSpace: 'nowrap' }}>
								<TableHead>
									<TableRow>
										<TableCell>ID</TableCell>
										<TableCell>Task Name</TableCell>
										<TableCell>Status</TableCell>
										<TableCell>Created</TableCell>
										<TableCell>Done</TableCell>
										<TableCell>Task args</TableCell>
										<TableCell>Task kwargs</TableCell>
										<TableCell>Task ID</TableCell>
										<TableCell>Worker</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{taskResults.results.map(taskResult => (
										<TableRow key={taskResult.id}>
											<TableCell>{taskResult.id}</TableCell>
											<TableCell>{taskResult.task_name}</TableCell>
											<TableCell>{taskResult.status}</TableCell>
											<TableCell>{new Date(taskResult.date_created).toLocaleString()}</TableCell>
											<TableCell>{new Date(taskResult.date_done).toLocaleString()}</TableCell>
											<TableCell>{taskResult.task_args}</TableCell>
											<TableCell>{taskResult.task_kwargs}</TableCell>
											<TableCell>{taskResult.task_id}</TableCell>
											<TableCell>{taskResult.worker}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				)}
			</STCContainer>
		</Box>
	);
};
