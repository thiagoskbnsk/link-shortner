export class EntryNotFound extends Error {
	constructor() {
		super("Link not found.");
	}
}
