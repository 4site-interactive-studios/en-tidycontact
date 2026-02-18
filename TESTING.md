# Testing your TidyContact Address Integration on Engaging Networks

Now that you have followed the steps marked in README.md, it is time to test that your integration is working properly.

## Debugging Flag

To begin, you can use a debug flag in your page's query parameters to enable debug logging.

`https://mywebsite.com/page/12345/donate/1?mode=DEMO&debug=true`
It doesn't matter what you set the debug value to, just that it's set in the first place.

**NOTE** In multi-step pages, the debug flag may be cleared when advancing to the next page! You must edit the URL and re-apply the parameters to enable debug mode again.

## Testing & Reading Logs

**TIP** Enabling "Persist Logs" in your browser's debugger can aid in reading logs between page redirects, such as when the form is submitted. You may have to do this for both the console and network tabs.

1. Countries allowed should match what was specified as a data attribute, if no attribute was specified an array containing "us" is used.


    eg. `Countries Allowed: Array ['us']`
2. If the tested page contains address fields, supporter.geo.latitude and supporter.geo.longitude hidden fields should be created


    eg. `Creating Hidden Field: supporter.geo.latitude`

3. If the tested page does not contain address fields, TidyContact should not run beyond this print statement. If you see this log on a page that *should* be running TidyContact, you may need to specify address field names manually in the configuration options.


    `TidyContact - No EN Address Fields Found`

**NOTE** Continuing from this step implies TidyContact is running on your page.


4. For each custom supporter field you created and set as a data attribute, a log should print out for creating that hidden field


    eg. `TidyContact creating hidden field: supporter.NOT_TAGGED_3`

5. When changing the value of any address field, when the field is blurred (clicked away from, tabbed out of, etc.), a log should print that the field was changed respective to which field was modified.


    eg. `TidyContact changed supporter.address1 true`

**NOTE** Continuing from this step implies a field has been changed.


6. When submitting the form, TidyContact should call the Address API. 


    `TidyContact Calling Address API`

7. When submitting an address1, country, (city AND region [typically this is a state or province], OR post code) TidyContact Address API should return the results for the address and update supporter data. You can search for "tidycontact.io" in the Network tab of your debugger to view the request.


    There will be a printout of the response data and checksum following this request. **If no printout occurs, check the Network tab.**

8. When submitting and not fulfilling the conditions of required fields, TidyContact will not call the API and instead print the following


    `Not Enough Data to Call API`

## Checking supporter data

In Engaging Networks proper, you can check the supporter data (Data & Reports -> Lookup Supporter) by searching for matching data you used on your test submission (i.e. Searching by email, by name) and opening the matching supporter record.


**NOTE** You'll need to enable visibility of your custom fields (TidyContact Status, Date, Record) to see them in the supporter record, clicking the settings cog and scrolling to the custom fields and checking them so they are green will enable that visibility.


**NOTE** If you chose to not use the status, date, or record custom fields, you'll need to closely look at the supporter's address to see if it has been corrected by TidyContact. Not all addresses need correction, so multiple tests may need to be performed.


On a page submission, the TidyContact address record, date, and status fields should be occupied.


### Status reference

`SUCCESS` - TidyContact found the address and updated the supporter's record to the matched data.

`PARTIALADDRESS` - Some required address fields were not filled and TidyContact did not run (Step 8 of "Reading Logs")

`DISALLOWED` - The address' country did not fall under the allowlist specified in your script's configuration.

`ERROR` - The submitted address contains errors or could otherwise not be found.