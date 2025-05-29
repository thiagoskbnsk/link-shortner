export class EntryAlreadyExists extends Error {
	constructor() {
		super("Entry already exists.");
	}
}
