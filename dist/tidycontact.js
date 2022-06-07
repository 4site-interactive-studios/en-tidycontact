!function(){"use strict";var t={705:function(t){t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var s="",i=void 0!==e[5];return e[4]&&(s+="@supports (".concat(e[4],") {")),e[2]&&(s+="@media ".concat(e[2]," {")),i&&(s+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),s+=t(e),i&&(s+="}"),e[2]&&(s+="}"),e[4]&&(s+="}"),s})).join("")},e.i=function(t,s,i,r,n){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(i)for(var o=0;o<this.length;o++){var d=this[o][0];null!=d&&(a[d]=!0)}for(var l=0;l<t.length;l++){var c=[].concat(t[l]);i&&a[c[0]]||(void 0!==n&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=n),s&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=s):c[2]=s),r&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=r):c[4]="".concat(r)),e.push(c))}},e}},738:function(t){t.exports=function(t){return t[1]}},745:function(t,e,s){var i=s(738),r=s.n(i),n=s(705),a=s.n(n)()(r());a.push([t.id,"",""]),e.Z=a},379:function(t){var e=[];function s(t){for(var s=-1,i=0;i<e.length;i++)if(e[i].identifier===t){s=i;break}return s}function i(t,i){for(var n={},a=[],o=0;o<t.length;o++){var d=t[o],l=i.base?d[0]+i.base:d[0],c=n[l]||0,u="".concat(l," ").concat(c);n[l]=c+1;var h=s(u),g={css:d[1],media:d[2],sourceMap:d[3],supports:d[4],layer:d[5]};if(-1!==h)e[h].references++,e[h].updater(g);else{var p=r(g,i);i.byIndex=o,e.splice(o,0,{identifier:u,updater:p,references:1})}a.push(u)}return a}function r(t,e){var s=e.domAPI(e);return s.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;s.update(t=e)}else s.remove()}}t.exports=function(t,r){var n=i(t=t||[],r=r||{});return function(t){t=t||[];for(var a=0;a<n.length;a++){var o=s(n[a]);e[o].references--}for(var d=i(t,r),l=0;l<n.length;l++){var c=s(n[l]);0===e[c].references&&(e[c].updater(),e.splice(c,1))}n=d}}},569:function(t){var e={};t.exports=function(t,s){var i=function(t){if(void 0===e[t]){var s=document.querySelector(t);if(window.HTMLIFrameElement&&s instanceof window.HTMLIFrameElement)try{s=s.contentDocument.head}catch(t){s=null}e[t]=s}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(s)}},216:function(t){t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:function(t,e,s){t.exports=function(t){var e=s.nc;e&&t.setAttribute("nonce",e)}},795:function(t){t.exports=function(t){var e=t.insertStyleElement(t);return{update:function(s){!function(t,e,s){var i="";s.supports&&(i+="@supports (".concat(s.supports,") {")),s.media&&(i+="@media ".concat(s.media," {"));var r=void 0!==s.layer;r&&(i+="@layer".concat(s.layer.length>0?" ".concat(s.layer):""," {")),i+=s.css,r&&(i+="}"),s.media&&(i+="}"),s.supports&&(i+="}");var n=s.sourceMap;n&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(n))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,s)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:function(t){t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function s(i){var r=e[i];if(void 0!==r)return r.exports;var n=e[i]={id:i,exports:{}};return t[i](n,n.exports,s),n.exports}s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,{a:e}),e},s.d=function(t,e){for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){function t(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var e=s(379),i=s.n(e),r=s(795),n=s.n(r),a=s(569),o=s.n(a),d=s(565),l=s.n(d),c=s(216),u=s.n(c),h=s(589),g=s.n(h),p=s(745),f={};f.styleTagTransform=g(),f.setAttributes=l(),f.insert=o().bind(null,"head"),f.domAPI=n(),f.insertStyleElement=u(),i()(p.Z,f),p.Z&&p.Z.locals&&p.Z.locals,new class{constructor(){t(this,"endpoint","https://api.tidycontact.io"),t(this,"wasCalled",!1),t(this,"httpStatus",null),t(this,"timeout",5),t(this,"isDirty",!1),t(this,"cid",0),t(this,"as_record",""),t(this,"as_date",""),t(this,"as_status",""),t(this,"countries",[]),t(this,"country_fallback",""),t(this,"us_zip_divider","+"),t(this,"fields",{address1:"supporter.address1",address2:"supporter.address2",address3:"supporter.address3",city:"supporter.city",region:"supporter.region",postalCode:"supporter.postcode",country:"supporter.country"}),this.loadOptions(),this.shouldRun()&&("loading"!==document.readyState?this.init():document.addEventListener("DOMContentLoaded",(()=>{this.init()})))}init(){for(;!this.checkNested(EngagingNetworks,"require","_defined","enjs","checkSubmissionFailed");)return this.isDebug()&&console.log("TidyContact waiting for EngagingNetworks"),void window.setTimeout((()=>{this.init()}),10);this.createFields(),this.addEventListeners(),EngagingNetworks.require._defined.enjs.checkSubmissionFailed()||""==this.getFieldValue(this.fields.address1)||(this.isDebug()&&console.log("TidyContact Address Field is not empty"),this.isDirty=!0)}shouldRun(){return!!(document.querySelector("form.en__component")&&window.hasOwnProperty("pageJson")&&this.hasAddressFields())||(this.isDebug()&&console.log("TidyContact - No EN Address Fields Found"),!1)}loadOptions(){this.fields.address1=this.getScriptData("address1",this.fields.address1),this.fields.address2=this.getScriptData("address2",this.fields.address2),this.fields.city=this.getScriptData("city",this.fields.city),this.fields.region=this.getScriptData("region",this.fields.region),this.fields.postalCode=this.getScriptData("postalCode",this.fields.postalCode),this.fields.country=this.getScriptData("country",this.fields.country),this.as_record=this.getScriptData("as_record",this.as_record),this.as_date=this.getScriptData("as_date",this.as_date),this.as_status=this.getScriptData("as_status",this.as_status),this.us_zip_divider=this.getScriptData("us_zip_divider",this.us_zip_divider),this.cid=this.getScriptData("cid",this.cid),this.country_fallback=this.getScriptData("country_fallback",this.country_fallback);const t=this.getScriptData("country-allow",this.country_allow);t&&(this.countries=t.split(",").map((t=>t.trim().toLowerCase()))),this.isDebug()&&console.log("Countries Allowed",this.countries)}getField(t){return document.querySelector('[name="'.concat(t,'"]'))}getFieldValue(t){return new FormData(document.querySelector("form.en__component")).getAll(t).join(",")}addEventListeners(){for(const t in this.fields){const e=this.getField(this.fields[t]);e&&e.addEventListener("change",(()=>{this.isDebug()&&console.log("TidyContact changed "+e.name,!0),this.isDirty=!0}))}window.enOnSubmit=()=>!(this.isDirty&&!this.wasCalled)||(this.isDebug()&&console.log("TidyContact Calling Adress API"),this.callAPI())}hasAddressFields(){const t=this.getField(this.fields.address1),e=this.getField(this.fields.address2),s=this.getField(this.fields.city),i=this.getField(this.fields.region),r=this.getField(this.fields.postalCode),n=this.getField(this.fields.country);return!!(t||e||s||i||r||n)}canUseAPI(){const t=!!this.getCountry(),e=!!this.getFieldValue(this.fields.address1),s=!!this.getFieldValue(this.fields.city),i=!!this.getFieldValue(this.fields.region),r=!!this.getFieldValue(this.fields.postalCode);return!(!t||!e)&&(s&&i||r)}getCountry(){var t;const e=null!==(t=this.country_fallback)&&void 0!==t?t:"";return this.getFieldValue(this.fields.country)||e.toUpperCase()}callAPI(){const t=this.getFieldValue(this.fields.address1),e=this.getFieldValue(this.fields.address2),s=this.getFieldValue(this.fields.city),i=this.getFieldValue(this.fields.region),r=this.getFieldValue(this.fields.postalCode),n=this.getCountry(),a=this.getField("supporter.geo.latitude"),o=this.getField("supporter.geo.longitude"),d=this.getField(this.as_record),l=this.getField(this.as_date),c=this.getField(this.as_status);if(!this.canUseAPI())return this.isDebug()&&console.log("Not Enough Data to Call API"),l&&(l.value=this.todaysDate()),c&&(c.value="PARTIALADDRESS"),!0;if(!this.countryAllowed(n)){if(d){let t={};t=Object.assign({date:this.todaysDate(),status:"DISALLOWED"},t),d.value=JSON.stringify(t)}return l&&(l.value=this.todaysDate()),c&&(c.value="DISALLOWED"),!0}const u={address1:t,address2:e,city:s,region:i,postalCode:r,country:n,url:window.location.href,cid:this.cid};return this.wasCalled=!0,this.isDebug()&&console.log("TidyContact formData",JSON.parse(JSON.stringify(u))),this.fetchTimeout(this.endpoint,this.timeout,{headers:{"Content-Type":"application/json; charset=utf-8"},method:"POST",body:JSON.stringify(u)}).then((t=>(this.httpStatus=t.status,t.json()))).then((async t=>{if(this.isDebug()&&console.log("TidyContact callAPI response",JSON.parse(JSON.stringify(t))),!0===t.valid){let e=new Object;"changed"in t&&(e=this.setFields(t.changed)),e.formData=u,await this.checkSum(JSON.stringify(e)).then((s=>{this.isDebug()&&console.log("TidyContact checksum",s),e.requestId=t.requestId,e.checksum=s})),"latitude"in t&&(a.value=t.latitude,e.latitude=t.latitude),"longitude"in t&&(o.value=t.longitude,e.longitude=t.longitude),d&&(e=Object.assign({date:this.todaysDate(),status:"SUCCESS"},e),d.value=JSON.stringify(e)),l&&(l.value=this.todaysDate()),c&&(c.value="SUCCESS")}else{let e=new Object;e.formData=u,await this.checkSum(JSON.stringify(e)).then((s=>{this.isDebug()&&console.log("TidyContact checksum",s),e.requestId=t.requestId,e.checksum=s})),d&&(e=Object.assign({date:this.todaysDate(),status:"ERROR"},e),d.value=JSON.stringify(e)),l&&(l.value=this.todaysDate()),c&&(c.value="error"in t?"ERROR: "+t.error:"INVALIDADDRESS")}})).catch((t=>{t.toString().includes("AbortError")&&(this.isDebug()&&console.log("TidyContact fetch aborted"),this.httpStatus=408),this.writeError(t)}))}setFields(t){let e={};const s=this.getCountry(),i=this.getFieldValue(this.fields.postalCode),r=this.getField(this.fields.address2);"address2"in t&&!r&&(this.getFieldValue(this.fields.address1)==t.address1+" "+t.address2?(delete t.address1,delete t.address2):(t.address1=t.address1+" "+t.address2,delete t.address2)),"postalCode"in t&&i.replace("+",this.us_zip_divider)===t.postalCode.replace("+",this.us_zip_divider)&&delete t.postalCode;for(const i in t){const r=this.getField(this.fields[i]);if(r){let n=t[i];"postalCode"===i&&["US","USA","United States"].includes(s)&&(n=n.replace("+",this.us_zip_divider)),e[i]={from:r.value,to:n},r.value=n}}return e}async checkSum(t){const e=new TextEncoder("utf-8").encode(t),s=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(s)).map((t=>("00"+t.toString(16)).slice(-2))).join("")}isDebug(){var t=new RegExp("[\\?&]debug=([^&#]*)").exec(location.search);return null===t?"":decodeURIComponent(t[1].replace(/\+/g," "))}createHiddenInput(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";const s=document.querySelector("form.en__component"),i=document.createElement("input");return i.type="hidden",i.name=t,i.classList.add("en__field__input"),i.classList.add("en__field__input--text"),i.classList.add("tidycontact-added-input"),i.setAttribute("autocomplete","off"),i.value=e,s.appendChild(i),i}createFields(){const t=this.getField("supporter.geo.latitude"),e=this.getField("supporter.geo.longitude");t||(this.createHiddenInput("supporter.geo.latitude",""),this.isDebug()&&console.log("Creating Hidden Field: supporter.geo.latitude")),e||(this.createHiddenInput("supporter.geo.longitude",""),this.isDebug()&&console.log("Creating Hidden Field: supporter.geo.longitude")),this.as_record&&(this.getField(this.as_record)||(this.createHiddenInput(this.as_record,""),this.isDebug()&&console.log("TidyContact creating hidden field: "+this.as_record))),this.as_date&&(this.getField(this.as_date)||(this.createHiddenInput(this.as_date,""),this.isDebug()&&console.log("TidyContact creating hidden field: "+this.as_date))),this.as_status&&(this.getField(this.as_status)||(this.createHiddenInput(this.as_status,""),this.isDebug()&&console.log("TidyContact creating hidden field: "+this.as_status))),this.getField(this.fields.address2)||(this.createHiddenInput(this.fields.address2,""),this.isDebug()&&console.log("TidyContact creating hidden field: "+this.fields.address2)),this.getField(this.fields.address3)||(this.createHiddenInput(this.fields.address3,""),this.isDebug()&&console.log("TidyContact creating hidden field: "+this.fields.address3))}todaysDate(){return(new Date).toLocaleString("en-ZA",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\/+/g,"")}checkNested(t,e){if(void 0===t)return!1;for(var s=arguments.length,i=new Array(s>2?s-2:0),r=2;r<s;r++)i[r-2]=arguments[r];return!(0!=i.length||!t.hasOwnProperty(e))||this.checkNested(t[e],...i)}countryAllowed(t){return!(this.countries.length>0)||this.countries.includes(t.toLowerCase())}getScriptData(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";const s=document.querySelector("script[src*='cdn.tidycontact.io/engagingnetworks.js'], script[src*='tidycontact.js']");if(s){const i=s.getAttribute("data-"+t);return null!=i?i:e}return this.isDebug()&&console.error("TidyContact Script Not Found"),e}fetchTimeout(t,e){let{signal:s,...i}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=new AbortController,n=fetch(t,{signal:r.signal,...i});s&&s.addEventListener("abort",(()=>r.abort()));const a=setTimeout((()=>r.abort()),1e3*e);return n.finally((()=>clearTimeout(a)))}writeError(t){const e=this.getField(this.as_record),s=this.getField(this.as_date),i=this.getField(this.as_status);if(e){let s="";switch(this.httpStatus){case 400:s="Bad Request";break;case 401:s="Unauthorized";break;case 403:s="Forbidden";break;case 404:s="Not Found";break;case 408:s="API Request Timeout";break;case 500:s="Internal Server Error";break;case 503:s="Service Unavailable";break;default:s="Unknown Error"}const i={status:this.httpStatus,error:"string"==typeof t?t:s.toUpperCase()};e.value=JSON.stringify(i)}s&&(s.value=this.todaysDate()),i&&(i.value="ERROR-API")}}}()}();