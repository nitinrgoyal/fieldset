/**
 * Created with IntelliJ IDEA.
 * User: Nitin
 * Date: 1/7/14
 * Time: 11:47 AM
 * To change this template use File | Settings | File Templates.
 */


var mongoose = require('mongoose');
var fieldsSetPlugin = require('mongoose-fieldset');
var Schema = mongoose.Schema;

/*Describe a Schema*/
var PersonSchema = new Schema({
    'time' : {'type': Date, 'index': true, 'alias': 'timestamp', 'fieldset':'private'},
    'name' : {'type' : String, 'alias': 'name1','fieldset':'public'},
    'surname' : {'type' : String, 'alias': 'surname1','fieldset':'private'},
    'profile' : {
        'address' : {'type' : String, 'alias': 'profile.address1','fieldset':'public'},
        'phone-number': {'type' : String, 'alias': 'profile.phone-number1', 'fieldset':'private'}
    }
});



/*Add field alias plugin*/
PersonSchema.plugin(fieldsSetPlugin);
console.log("sdkfhskdfjd");
mongoose.connect('mongodb://localhost/fieldset');
var Person =  mongoose.model('Person', PersonSchema);

var person = new Person({
    'timestamp'	: new Date(),
    'name'		: 'Jhon',
    'surname'	: 'Doe',
    'profile.address': 'Rue de Morgane',
    'profile.phone-number': '051-123456 78'
});

// person.save();

console.log( "---------------get Public Fields---------------------");
console.log(person.toObject({fieldSet:'public', transform:true}));

console.log( "---------------get Private Fields-------------------- ");
console.log(person.toObject({fieldSet:'private', transform:true}));

console.log('---------------Person Public FieldSet-------------');
Person.findOne({name:'Jhon'},Person.getFieldNamesForSet('public')).exec(function(err,result){
    console.log(result);
    console.log( "-------------------------------------------------- ");
});

