module.exports = class Store {
	constructor() {
		this._store = Object.create( null );
		this.currentId = 0;
	}
	
	add( item ) {
		const id = item.id = this.currentId++;
		this._store[ id ] = item;
	}
	
	get( id ) {
		return this._store[ id ];
	}
}