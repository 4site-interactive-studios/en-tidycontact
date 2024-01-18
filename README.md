# TidyContact Address Integration for Engaging Networks

This project integrates your Engaging Networks forms with the TidyContact Address Standardization service.

**IMPORTANT:** This project only works on Engaging Networks Forms and uses the `window.enOnSubmit` event listener is used to change the fields.

# Installation Instructions

## Optional Step: Create Custom Supporter Fields

If you would like TidyContact Address to record the results of the API call, including the original user entered address, the date the call was made, and the returned statuss, then you need to create three custom supporter fields on your Engaging Networks Account to store this information. The field type should be "hidden" and you will need to add the fields to a form in order to get their actual sourc ecode `names``. When creating the three custom fields, we suggest the following field names:

- TidyContact Address Record
- TidyContact Address Date
- TidyContact Address Status

After you've created them, add them to a testing form and then inspect the source code of the page to get their values. For example this example markup of hidden field has a code level name of `supporter.NOT_TAGGED_3`.

```html
<input
  type="hidden"
  class="en__field__input en__field__input--hidden"
  name="supporter.NOT_TAGGED_3"
  value=""
/>
```

Make note of each as you will need to add these three field names to the script tag as data attributes. You do not need to include the fields on the page itself, our code will automatically add them.

## Upload the TidyContact Address Javascript File to your Engaging Networks account

In the /dist folder on this code repo you will see a single JavaScript file, [tidycontact.js](https://github.com/4site-interactive-studios/en-tidycontact/tree/main/dist). Download it and then upload it to your Engaging Networks account.

## Add the TidyContact Address Script to your Engaging Networks Page Template

Now you need to add following script tag to your page template(s), or a code block if you're just testing it out on a single page.

**IMPORTANT** - You must replace the `src` attribute with the URL to the tidycontact.js file you uploaded to your Engaging Networks account.

**IMPORTANT** - You must replace the `data-cid` attribute with your TidyContact Address Client ID.

### Example

```html
<script
  defer="defer"
  src="https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/0000/tidycontact.js"
  data-cid="00000000-0000-0000-0000-000000000000"
></script>
```

### Example with Custom Fields for Recording the TidyContact Address API Response

```html
<script
  defer="defer"
  src="https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/0000/tidycontact.js"
  data-cid="00000000-0000-0000-0000-000000000000"
  data-record_field="supporter.NOT_TAGGED_1"
  data-date_field="supporter.NOT_TAGGED_2"
  data-status_field="supporter.NOT_TAGGED_3"
></script>
```

## Configuration Options

Every option can be set as a data attribute on the `script` tag.

- **cid** - Address Standardization Client ID (**required**).
- **record_field** - Address Standardization Record. Set the field name to store the Address Standardization Record Data. Usually a hidden field.
- **date_field** - Address Standardization Date. Set a field name to store the date. Every time the Address Standardization service is called, this field will be updated.
- **status_field** - Address Standardization Status. Set a field name to store the status of the last Address Standardization attempt.
- **address1** - Address 1 Field Name.
- **address2** - Address 2 Field Name.
- **city** - City Field Name.
- **region** - State Field Name.
- **postalCode** - Postal Code (ZIP Code) Field Name.
- **country** - Country Field Name.

## Development

If you would like to modify this code repository, please fork it and follow the instructions below to begin your development.

## Install Dependencies

1. `npm install`

## Deploy

1. `npm run build` - Builds the project
2. `npm run watch` - Watch for changes and rebuilds the project

It will create a `dist` folder, where you can get the `tidycontact.js` file and publish it.
