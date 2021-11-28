export interface TaskResult {
	id: number;
	task_id: string;
	task_name: string;
	task_args: string;
	task_kwargs: string;
	status: string;
	worker: string;
	content_type: string;
	result: string;
	date_created: string;
	date_done: string;
	meta: string;
}
