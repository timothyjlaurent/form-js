[![Build Status](https://travis-ci.org/mkay581/form-js.svg?branch=master)](https://travis-ci.org/mkay581/form-js)
[![npm version](https://badge.fury.io/js/form-js.svg)](https://badge.fury.io/js/form-js)

# FormJS

This library provides a simple API to manipulate a form or its related elements with JavaScript.
Supports IE10+, all modern browsers, and mobile.

It's important for you to use native form elements (i.e. `<select>`, `<input>`, etc) because they come with critical built-in
logic needed for the interactions that users expect. Like tabbing to fields, pressing enter or spacebar to commit a 
dropdown item, mobile keyboard input triggering, etc.

## Benefits

 * Automatic form data binding (JSON data and JS object literals)
 * Use CSS to easily customize hard-to-style native elements (i.e. dropdowns)
 * Listen to user events on forms 
 * Easily change and update form elements and their values with JavaScript
 * Trigger events programmatically

## Support

 * Checkboxes
 * Radio Buttons
 * Input Fields
 * Dropdowns (Select Elements)
 * Text Areas
 * Entire forms

## Usage

You can quickly start using the Form class as a standalone package, by using one of the [pre-built javascript files](/dist). Alternatively, you can also use the [source files](/src) directly if you are running
your own build processes.

### Styling form elements

Let's say you wanted to style a dropdown menu with the following html:

```html
<select>
    <option value="MD">Maryland</option>
    <option value="VA" selected>Virginia</option>
    <option value="DC">Washington, DC</option>
</select>
```

With this library, you can do this:

```javascript
var Dropdown = require('form-js').Dropdown;
var dropdown = new Dropdown({
    el: document.getElementsByTagName('select')[0]
});
```

Which will change your HTML into this:

```html
<div class="dropdown-wrapper">
    <div class="dropdown-container">
        <div class="dropdown-value-container">Virginia</div>
        <div class="dropdown-option-container">
            <div class="dropdown-option" data-value="MD">Maryland</div>
            <div class="dropdown-option dropdown-option-selected" data-value="VA">Virginia</div>
            <div class="dropdown-option" data-value="DC">Washington, DC</div>
        </div>
    </div>
    <select>
        <option value="MD">Maryland</option>
        <option value="VA" selected>Virginia</option>
        <option value="DC">Washington, DC</option>
    </select>
</div>
```

Then you can style the dropdown using CSS (and just hide the `<select>` element).


### Programmatically change the element's value

Each class comes with a set of utility methods so you can change the elements via JS. Using the example above, you
could do the following:

```javascript
// set the selected value programmatically
dropdown.setValue('DC');

// get the new data value
dropdown.getValue(); // => "DC"

// get the display value
dropdown.getDisplayValue(); // => "Washington, DC"
```

### Listening to change events

You can also listen to events on form elements. Given the following input element...


```html
<input type="text" value="" placeholder="Enter text here" />
```

You can do the following:

```javascript
var InputField = require('form-js').InputField;
var inputField = new InputField({
    el: document.getElementsByTagName('input')[0],
    onChange: function (el) {
        // user has finished typing into the field!
    },
    onKeyDownChange: function (el) {
        // the user has typed a key into the field!
    }
});
// set the value
inputField.setValue('My text'); // set new value
// get the new value
inputField.getValue(); // => "My text"
```

### Detect when user changes any value in a form

Suppose you have this HTML:

```html
<form class="debt-info-form">
    <input type="text" name="first_name" value="" />
    <select name="loan_type">
        <option value="CC">Credit Card</option>
        <option value="Mortgage">Mortgage</option>
        <option value="HELO">HELO</option>
        <option value="Student Loan">Student Loan</option>
    </select>
</form>
```

You can detect when a user changes any of the form's elements like so:

```javascript
var Form = require('form-js').Form;
var form = new Form({
    el: document.body.getElementsByClassName('debt-info-form')[0],
    onValueChange: function (val, el) {
        // a value has been changed!
       console.log('new value: ' + val);
    }
});
form.setup();
```

## Examples
 
Examples can be found in the [examples](https://github.com/mkay581/formjs/blob/master/examples) page.

## API Documentation

### Form

The form class allows you to instantiate an entire form (along with its nested elements: `<input>`, `<textarea>`, `<select>`).

#### Form.constructor

To create an instance of a form, you need to pass the form element (and a set of options if you'd like).

```javascript
let formElement = document.getElementByTagName('form')[0];
var form = new Form({
   el: formElement
});
```

#### Form.setup()

Setup just does a few standard setup tasks, like bind event listeners and such. This method is necessary after
instantiation in order to begin working with your form instance.


#### Form.getCurrentValues()

A utility method to grab a serialized object of all of the form elements and their current values. See below.

```html
<form id="my-form">
    <input type="text" name="location" value="Arlington, VA" required />
</form>
```

```javascript
let formElement = document.getElementById('my-form');
var form = new Form({
   el: formElement
});
form.setup();
console.log(form.getCurrentValues());

/*
[{
    disabled: false,
    name: "location",
    required: false,
    value: "Arlington, VA"
}]
*/
```

#### Form.clear()

Clears all fields inside of the form. It also unchecks any checkboxes and resets any dropdown selections.

```html
<form id="my-form">
    <input type="text" id="location-input" name="location" value="Arlington, VA" required />
    <input type="text" id="name-input" name="name" value="John Smith" required />
    <input type="number" name="age" value="Arlington, VA" required />
</form>
```

```javascript
let formElement = document.getElementById('my-form');
let locationInput = document.getElementById('location-input');
let nameInput = document.getElementById('name-input');
var form = new Form({
   el: formElement
});
form.setup();
locationInput.value // => "Arlington, VA"
nameInput.value // => "John Smith"
form.clear();
locationInput.value // => ""
nameInput.value // => ""

```

#### Form.disable()

Disables all form elements.

#### Form.enable()

Re-enables all form elements.
