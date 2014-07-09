<<<<<<< HEAD
## Like what we do?

(https://www.github.com/nitinrgoel/)

## Documentation

For a Getting started guide, API docs, recipes, making a plugin, etc. see the [documentation page](/docs/README.md)!

## Usage

// When querying database some fields are not required everytime. So instead of filtering data everytime this is solution. We define fieldset property while defining schema of the the mongoose with every field. Then while fetching object using toObject we just need to pass the fieldset as parameter we require in query. FieldSet can also be used in second way as it can give all fields which belong to particular fieldset. 

## Sample `index.js`

This file is just a quick sample to give you a taste of what gulp does.

```javascript

//For example:

//require

var fieldset = require('mongoose-fieldset');

//We have Person object. We define schema as:

var person = new Person({
    'timestamp' : new Date(),
    'name'    : 'Jhon',
    'surname' : 'Doe',
    'profile.address': 'Rue de Morgane',
    'profile.phone-number': '051-123456 78'
});

//Here two fieldsets are defined - private and public.

//First Use: (this will fetch all fields value which belong to private fieldset)

console.log(person.toObject({fieldSet:'private', transform:true}));



//Second Use: (fetch fields belong to public fieldset and in result we get only public fields)

Person.findOne({name:'Jhon'},Person.getFieldNamesForSet('public')).exec(function(err,result){
    // do something on result
});


```
=======
fieldset
========

Mongoose-fieldset-plugin
>>>>>>> 9a68e75e6ccc8b56aaead4abdbae5f1eda413d89
