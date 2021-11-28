export function toCurrencyString(amount: string | number): string {
	return String(amount).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '원';
}
