const chai = require( 'chai' );
const assert = chai.assert;
chai.use( require( 'chai-http' ) );

const app = require( '../app' );

describe( 'archangel api', () => {
	
	const request = chai.request( app );
	
	describe( 'can POST and GET an archangel', () => {
		var id = -1;
		var angel = { name: 'Michael' }
		
		function isJSONResponse( res ) {
			assert.equal( res.statusCode, 200 );
			assert.equal( res.type, 'application/json' );
			assert.ok( res.body );
		}
		
		it( 'POST', done => {
			request
				.post( '/archangels' )
				.send( angel )
				.then( res => {
					isJSONResponse( res );
					
					assert.equal( res.body.name, angel.name );
					id = res.body.id;
					assert.property( res.body, 'id' );
					done();
				})
				.catch( done );
		});
		
		it( 'GET', done => {
			request.get( `/archangels/${id}` )
				.then( res => {
					isJSONResponse( res );
					assert.equal( res.body.name, angel.name );
					done();
				})
				.catch( done );
		});
	});
	
	
});