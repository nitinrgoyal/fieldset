## See Exmaple code at

(https://github.com/nitinrgoyal/fieldset)

## Documentation

// When querying database some fields are not required everytime. So instead of filtering data everytime this is solution. We define fieldset property while defining schema of the the mongoose with every field. Then while fetching object using toObject we just need to pass the fieldset as parameter we require in query. FieldSet can also be used in second way as it can give all fields which belong to particular fieldset. 

## Sample `test.js`

This file is just a quick sample to give you a taste of what fieldset does.

```javascript

//For example:

//require

var fieldset = require('mongoose-fieldset');

//We have Person object. We define schema as:

var PersonSchema = new Schema({
    'time' : {'type': Date, 'index': true, 'alias': 'timestamp', 'fieldset':'private'},
    'name' : {'type' : String, 'alias': 'name1','fieldset':'public'},
    'surname' : {'type' : String, 'alias': 'surname1','fieldset':'private'},
    'profile' : {
        'address' : {'type' : String, 'alias': 'profile.address1','fieldset':'public'},
        'phone-number': {'type' : String, 'alias': 'profile.phone-number1', 'fieldset':'private'}
    }
});


//Here two fieldsets are defined - private and public.

//First Use: (using parameter fieldSet:'private' in toObject method and fetch all fields values which belong to private fieldset)

console.log(person.toObject({fieldSet:'private', transform:true}));

//Second Use: (fetch fields belong to public fieldset and in result we get only public fields)

Person.findOne({name:'John'},Person.getFieldNamesForSet('public')).exec(function(err,result){
    // do something on result
});


```
