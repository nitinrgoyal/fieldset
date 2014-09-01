## See Exmaple code at

(https://github.com/nitinrgoyal/fieldset)

## Documentation

When querying database some fields are not required everytime. So instead of filtering data everytime this is solution. We define fieldset property while defining schema of the the mongoose with every field. Then while fetching object using toObject we just need to pass the fieldset as parameter we require in query. FieldSet can also be used in second way as it can give all fields which belong to particular fieldset. 

## More Easy and new features in new version: 

1. Mongoose-fieldset works on 2 level hierarchy like profile.phone-number and profile.address. 
2. Mongoose-fieldset also work on array structure. eg. emails defined in the schema as an array of objects.
3. Now user will add fieldset in array format (in more standardized manner) rather than comma seperated strings.
4. Person.fieldsets will now return the map will contains all fieldsets defined in schema and the fields array which are defined in the fielset. Also it will return the hidden fields from the fieldset. 

eg.
Person.fieldsets will return - 

{ private: 
   { fields: [ 'time', 'name', 'surname', 'profile.phone-number', 'emails' ],
     hides: [ 'profile.address', '_id' ],
     stringFields: 'time name surname profile.phone-number emails' },
  public: 
   { hides: [ 'time', 'surname', 'profile.phone-number', 'emails', '_id' ],
     fields: [ 'name', 'profile.address' ],
     stringFields: 'name profile.address' } 
 }



## Sample `test.js`

This file is just a quick sample to give you a taste of what fieldset does.

```javascript

//For example:

//require

var fieldset = require('mongoose-fieldset');

//We have Person object. We define schema as:

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



//Here two fieldsets are defined - private and public.

//First Use: (using parameter fieldSet:'private' in toObject method and fetch all fields values which belong to private fieldset)

console.log(person.toObject({fieldSet:'private', transform:true}));

//Second Use: (fetch fields belong to public fieldset and in result we get only public fields)

Person.findOne({name:'John'},Person.getFieldNamesForSet('public')).exec(function(err,result){
    // do something on result
});


```
