
export function is(el: any, selector: any) {
	if ([].includes.call(
		document.querySelectorAll(selector),
		el as never
	)) return true
	return false
}