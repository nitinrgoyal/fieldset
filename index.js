/**
 * Created with IntelliJ IDEA.
 * User: Richa
 * Date: 1/7/14
 * Time: 11:47 AM
 * To change this template use File | Settings | File Templates.
 */


var mongoose = require('mongoose')
	, fieldsSetPlugin = require('mongoose-fieldset');
	, Schema = mongoose.Schema;

/*Describe a Schema*/
var PersonSchema = new Schema( {
	'time' : { type: Date, index: true, fieldset: ['private'] },
	'name' : { type : String, fieldset: ['public', 'private'] },
	'surname' : { type : String, fieldset: ['private'] },
	'profile' : {
		'address' : { type: String, fieldset: ['public'] },
			'phone-number': { type: String, fieldset: ['private'] }
	},
	'emails': { type : [ 
		 { 'email' : { type : String } },
		 { 'verified' : { type : Boolean } } ], 
		 fieldset: ['private'] }
});


/*Add field alias plugin*/
PersonSchema.plugin(fieldsSetPlugin);

mongoose.connect('mongodb://localhost/fieldset');
var Person =  mongoose.model('Person', PersonSchema);

var person = new Person({
		'timestamp' : new Date(),
		'name'      : 'Jhon',
		'surname'   : 'Doe',
		'profile.address': 'Rue de Morgane',
		'profile.phone-number': '051-123456  78',
		'emails' : [ 
				{ verified: true, email: 'jhon@gmail.com' }, 
				{ verified: false, email: 'jhon_doe@gmail.com'} ]
});

 // person.save();

console.log( "---------------get Fieldsets---------------------");
console.log(Person.fieldsets);

console.log( "---------------get Private Fields-------------------- ");
console.log(person.toObject({fieldset:'private', transform:true}));

console.log('---------------Person Public FieldSet-------------');
Person.findOne({name:'Jhon'},Person.getFieldNamesForSet('public')).exec(function(err,result){
		console.log(result);
		console.log( "-------------------------------------------------- ");
});

