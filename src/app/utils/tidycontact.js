export class TidyContact {
  // endpoint = "https://mid.4sitestudios.com/address-standardize/"; // Address Standardization API
  endpoint = "https://phone.tidycontact.io"; // Address Standardization API
  // endpoint = "https://httpstat.us/500?sleep=50000"; // Address Standardization API
  wasCalled = false; // True if the API endpoint was called
  httpStatus = null;
  timeout = 5; // Seconds to API Timeout
  isDirty = false; // True if the address was changed by the user
  cid = null; // Client ID
  as_record = ""; // Address Standardization Record
  as_date = ""; // Date of Address Standardization
  as_status = ""; // Status of Address Standardization
  countries = []; // Country that is allowed to use the API, if empty, all countries are allowed. You can use more than one country by separating them with a comma.
  country_fallback = ""; // Fallback country if the country field is not found.
  us_zip_divider = "+"; // The divider for US Zip Codes
  fields = {
    address1: "supporter.address1", // Address Field 1
    address2: "supporter.address2", // Address Field 2
    address3: "supporter.address3", // Address Field 3 - This is only used for field creation
    city: "supporter.city", // City field
    region: "supporter.region", // State field
    postalCode: "supporter.postcode", // Zipcode field
    country: "supporter.country", // Country field
    phone: "supporter.phoneNumber2", // Phone field
  }; // Address Standardization Fields
  phone_enable = false; // Enable Phone Standardization
  ps_record = ""; // Phone Standardization Record
  ps_date = ""; // Date of the Phone Standardization
  ps_status = ""; // Status of Phone Standardization
  phone_flags = true; // Add Country Flags to the Phone Field
  phone_country_from_ip = true; // Should we get the country from the IP address?
  phone_preferred_countries = []; // Prioritize some countries on the list
  countries_list = [
    ["Afghanistan", "af", "93", "070 123 4567"],
    ["Albania", "al", "355", "067 212 3456"],
    ["Algeria", "dz", "213", "0551 23 45 67"],
    ["American Samoa", "as", "1", "(684) 733-1234"],
    ["Andorra", "ad", "376", "312 345"],
    ["Angola", "ao", "244", "923 123 456"],
    ["Anguilla", "ai", "1", "(264) 235-1234"],
    ["Antigua and Barbuda", "ag", "1", "(268) 464-1234"],
    ["Argentina", "ar", "54", "011 15-2345-6789"],
    ["Armenia", "am", "374", "077 123456"],
    ["Aruba", "aw", "297", "560 1234"],
    ["Australia", "au", "61", "0412 345 678"],
    ["Austria", "at", "43", "0664 123456"],
    ["Azerbaijan", "az", "994", "040 123 45 67"],
    ["Bahamas", "bs", "1", "(242) 359-1234"],
    ["Bahrain", "bh", "973", "3600 1234"],
    ["Bangladesh", "bd", "880", "01812-345678"],
    ["Barbados", "bb", "1", "(246) 250-1234"],
    ["Belarus", "by", "375", "8 029 491-19-11"],
    ["Belgium", "be", "32", "0470 12 34 56"],
    ["Belize", "bz", "501", "622-1234"],
    ["Benin", "bj", "229", "90 01 12 34"],
    ["Bermuda", "bm", "1", "(441) 370-1234"],
    ["Bhutan", "bt", "975", "17 12 34 56"],
    ["Bolivia", "bo", "591", "71234567"],
    ["Bosnia and Herzegovina", "ba", "387", "061 123 456"],
    ["Botswana", "bw", "267", "71 123 456"],
    ["Brazil", "br", "55", "(11) 96123-4567"],
    ["British Indian Ocean Territory", "io", "246", "380 1234"],
    ["British Virgin Islands", "vg", "1", "(284) 300-1234"],
    ["Brunei", "bn", "673", "712 3456"],
    ["Bulgaria", "bg", "359", "048 123 456"],
    ["Burkina Faso", "bf", "226", "70 12 34 56"],
    ["Burundi", "bi", "257", "79 56 12 34"],
    ["Cambodia", "kh", "855", "091 234 567"],
    ["Cameroon", "cm", "237", "6 71 23 45 67"],
    ["Canada", "ca", "1", "(506) 234-5678"],
    ["Cape Verde", "cv", "238", "991 12 34"],
    ["Caribbean Netherlands", "bq", "599", "318 1234"],
    ["Cayman Islands", "ky", "1", "(345) 323-1234"],
    ["Central African Republic", "cf", "236", "70 01 23 45"],
    ["Chad", "td", "235", "63 01 23 45"],
    ["Chile", "cl", "56", "(2) 2123 4567"],
    ["China", "cn", "86", "131 2345 6789"],
    ["Christmas Island", "cx", "61", "0412 345 678"],
    ["Cocos Islands", "cc", "61", "0412 345 678"],
    ["Colombia", "co", "57", "321 1234567"],
    ["Comoros", "km", "269", "321 23 45"],
    ["Congo", "cd", "243", "0991 234 567"],
    ["Congo", "cg", "242", "06 123 4567"],
    ["Cook Islands", "ck", "682", "71 234"],
    ["Costa Rica", "cr", "506", "8312 3456"],
    ["Côte d’Ivoire", "ci", "225", "01 23 45 6789"],
    ["Croatia", "hr", "385", "092 123 4567"],
    ["Cuba", "cu", "53", "05 1234567"],
    ["Curaçao", "cw", "599", "9 518 1234"],
    ["Cyprus", "cy", "357", "96 123456"],
    ["Czech Republic", "cz", "420", "601 123 456"],
    ["Denmark", "dk", "45", "32 12 34 56"],
    ["Djibouti", "dj", "253", "77 83 10 01"],
    ["Dominica", "dm", "1", "(767) 225-1234"],
    ["Dominican Republic", "do", "1", "(809) 234-5678"],
    ["Ecuador", "ec", "593", "099 123 4567"],
    ["Egypt", "eg", "20", "0100 123 4567"],
    ["El Salvador", "sv", "503", "7012 3456"],
    ["Equatorial Guinea", "gq", "240", "222 123 456"],
    ["Eritrea", "er", "291", "07 123 456"],
    ["Estonia", "ee", "372", "5123 4567"],
    ["Eswatini", "sz", "268", "7612 3456"],
    ["Ethiopia", "et", "251", "091 123 4567"],
    ["Falkland Islands", "fk", "500", "51234"],
    ["Faroe Islands", "fo", "298", "211234"],
    ["Fiji", "fj", "679", "701 2345"],
    ["Finland", "fi", "358", "041 2345678"],
    ["France", "fr", "33", "06 12 34 56 78"],
    ["French Guiana", "gf", "594", "0694 20 12 34"],
    ["French Polynesia", "pf", "689", "87 12 34 56"],
    ["Gabon", "ga", "241", "06 03 12 34"],
    ["Gambia", "gm", "220", "301 2345"],
    ["Georgia", "ge", "995", "555 12 34 56"],
    ["Germany", "de", "49", "01512 3456789"],
    ["Ghana", "gh", "233", "023 123 4567"],
    ["Gibraltar", "gi", "350", "57123456"],
    ["Greece", "gr", "30", "691 234 5678"],
    ["Greenland", "gl", "299", "22 12 34"],
    ["Grenada", "gd", "1", "(473) 403-1234"],
    ["Guadeloupe", "gp", "590", "0690 00 12 34"],
    ["Guam", "gu", "1", "(671) 300-1234"],
    ["Guatemala", "gt", "502", "5123 4567"],
    ["Guernsey", "gg", "44", "07781 123456"],
    ["Guinea", "gn", "224", "601 12 34 56"],
    ["Guinea-Bissau", "gw", "245", "955 012 345"],
    ["Guyana", "gy", "592", "609 1234"],
    ["Haiti", "ht", "509", "34 10 1234"],
    ["Honduras", "hn", "504", "9123-4567"],
    ["Hong Kong", "hk", "852", "5123 4567"],
    ["Hungary", "hu", "36", "06 20 123 4567"],
    ["Iceland", "is", "354", "611 1234"],
    ["India", "in", "91", "081234 56789"],
    ["Indonesia", "id", "62", "0812-345-678"],
    ["Iran", "ir", "98", "0912 345 6789"],
    ["Iraq", "iq", "964", "0791 234 5678"],
    ["Ireland", "ie", "353", "085 012 3456"],
    ["Isle of Man", "im", "44", "07924 123456"],
    ["Israel", "il", "972", "050-234-5678"],
    ["Italy", "it", "39", "312 345 6789"],
    ["Jamaica", "jm", "1", "(876) 210-1234"],
    ["Japan", "jp", "81", "090-1234-5678"],
    ["Jersey", "je", "44", "07797 712345"],
    ["Jordan", "jo", "962", "07 9012 3456"],
    ["Kazakhstan", "kz", "7", "8 (771) 000 9998"],
    ["Kenya", "ke", "254", "0712 123456"],
    ["Kiribati", "ki", "686", "72001234"],
    ["Kosovo", "xk", "383", "043 201 234"],
    ["Kuwait", "kw", "965", "500 12345"],
    ["Kyrgyzstan", "kg", "996", "0700 123 456"],
    ["Laos", "la", "856", "020 23 123 456"],
    ["Latvia", "lv", "371", "21 234 567"],
    ["Lebanon", "lb", "961", "71 123 456"],
    ["Lesotho", "ls", "266", "5012 3456"],
    ["Liberia", "lr", "231", "077 012 3456"],
    ["Libya", "ly", "218", "091-2345678"],
    ["Liechtenstein", "li", "423", "660 234 567"],
    ["Lithuania", "lt", "370", "(8-612) 34567"],
    ["Luxembourg", "lu", "352", "628 123 456"],
    ["Macau", "mo", "853", "6612 3456"],
    ["North Macedonia", "mk", "389", "072 345 678"],
    ["Madagascar", "mg", "261", "032 12 345 67"],
    ["Malawi", "mw", "265", "0991 23 45 67"],
    ["Malaysia", "my", "60", "012-345 6789"],
    ["Maldives", "mv", "960", "771-2345"],
    ["Mali", "ml", "223", "65 01 23 45"],
    ["Malta", "mt", "356", "9696 1234"],
    ["Marshall Islands", "mh", "692", "235-1234"],
    ["Martinique", "mq", "596", "0696 20 12 34"],
    ["Mauritania", "mr", "222", "22 12 34 56"],
    ["Mauritius", "mu", "230", "5251 2345"],
    ["Mayotte", "yt", "262", "0639 01 23 45"],
    ["Mexico", "mx", "52", "222 123 4567"],
    ["Micronesia", "fm", "691", "350 1234"],
    ["Moldova", "md", "373", "0621 12 345"],
    ["Monaco", "mc", "377", "06 12 34 56 78"],
    ["Mongolia", "mn", "976", "8812 3456"],
    ["Montenegro", "me", "382", "067 622 901"],
    ["Montserrat", "ms", "1", "(664) 492-3456"],
    ["Morocco", "ma", "212", "0650-123456"],
    ["Mozambique", "mz", "258", "82 123 4567"],
    ["Myanmar", "mm", "95", "09 212 3456"],
    ["Namibia", "na", "264", "081 123 4567"],
    ["Nauru", "nr", "674", "555 1234"],
    ["Nepal", "np", "977", "984-1234567"],
    ["Netherlands", "nl", "31", "06 12345678"],
    ["New Caledonia", "nc", "687", "75.12.34"],
    ["New Zealand", "nz", "64", "021 123 4567"],
    ["Nicaragua", "ni", "505", "8123 4567"],
    ["Niger", "ne", "227", "93 12 34 56"],
    ["Nigeria", "ng", "234", "0802 123 4567"],
    ["Niue", "nu", "683", "888 4012"],
    ["Norfolk Island", "nf", "672", "3 81234"],
    ["North Korea", "kp", "850", "0192 123 4567"],
    ["Northern Mariana Islands", "mp", "1", "(670) 234-5678"],
    ["Norway", "no", "47", "406 12 345"],
    ["Oman", "om", "968", "9212 3456"],
    ["Pakistan", "pk", "92", "0301 2345678"],
    ["Palau", "pw", "680", "620 1234"],
    ["Palestine", "ps", "970", "0599 123 456"],
    ["Panama", "pa", "507", "6123-4567"],
    ["Papua New Guinea", "pg", "675", "7012 3456"],
    ["Paraguay", "py", "595", "0961 456789"],
    ["Peru", "pe", "51", "912 345 678"],
    ["Philippines", "ph", "63", "0905 123 4567"],
    ["Poland", "pl", "48", "512 345 678"],
    ["Portugal", "pt", "351", "912 345 678"],
    ["Puerto Rico", "pr", "1", "(787) 234-5678"],
    ["Qatar", "qa", "974", "3312 3456"],
    ["Réunion", "re", "262", "0692 12 34 56"],
    ["Romania", "ro", "40", "0712 034 567"],
    ["Russia", "ru", "7", "8 (912) 345-67-89"],
    ["Rwanda", "rw", "250", "0720 123 456"],
    ["Saint Barthélemy", "bl", "590", "0690 00 12 34"],
    ["Saint Helena", "sh", "290", "51234"],
    ["Saint Kitts and Nevis", "kn", "1", "(869) 765-2917"],
    ["Saint Lucia", "lc", "1", "(758) 284-5678"],
    ["Saint Martin", "mf", "590", "0690 00 12 34"],
    ["Saint Pierre and Miquelon", "pm", "508", "055 12 34"],
    ["Saint Vincent and the Grenadines", "vc", "1", "(784) 430-1234"],
    ["Samoa", "ws", "685", "72 12345"],
    ["San Marino", "sm", "378", "66 66 12 12"],
    ["São Tomé and Príncipe", "st", "239", "981 2345"],
    ["Saudi Arabia", "sa", "966", "051 234 5678"],
    ["Senegal", "sn", "221", "70 123 45 67"],
    ["Serbia", "rs", "381", "060 1234567"],
    ["Seychelles", "sc", "248", "2 510 123"],
    ["Sierra Leone", "sl", "232", "(025) 123456"],
    ["Singapore", "sg", "65", "8123 4567"],
    ["Sint Maarten", "sx", "1", "(721) 520-5678"],
    ["Slovakia", "sk", "421", "0912 123 456"],
    ["Slovenia", "si", "386", "031 234 567"],
    ["Solomon Islands", "sb", "677", "74 21234"],
    ["Somalia", "so", "252", "7 1123456"],
    ["South Africa", "za", "27", "071 123 4567"],
    ["South Korea", "kr", "82", "010-2000-0000"],
    ["South Sudan", "ss", "211", "0977 123 456"],
    ["Spain", "es", "34", "612 34 56 78"],
    ["Sri Lanka", "lk", "94", "071 234 5678"],
    ["Sudan", "sd", "249", "091 123 1234"],
    ["Suriname", "sr", "597", "741-2345"],
    ["Svalbard and Jan Mayen", "sj", "47", "412 34 567"],
    ["Sweden", "se", "46", "070-123 45 67"],
    ["Switzerland", "ch", "41", "078 123 45 67"],
    ["Syria", "sy", "963", "0944 567 890"],
    ["Taiwan", "tw", "886", "0912 345 678"],
    ["Tajikistan", "tj", "992", "917 12 3456"],
    ["Tanzania", "tz", "255", "0621 234 567"],
    ["Thailand", "th", "66", "081 234 5678"],
    ["Timor-Leste", "tl", "670", "7721 2345"],
    ["Togo", "tg", "228", "90 11 23 45"],
    ["Tokelau", "tk", "690", "7290"],
    ["Tonga", "to", "676", "771 5123"],
    ["Trinidad and Tobago", "tt", "1", "(868) 291-1234"],
    ["Tunisia", "tn", "216", "20 123 456"],
    ["Turkey", "tr", "90", "0501 234 56 78"],
    ["Turkmenistan", "tm", "993", "8 66 123456"],
    ["Turks and Caicos Islands", "tc", "1", "(649) 231-1234"],
    ["Tuvalu", "tv", "688", "90 1234"],
    ["U.S. Virgin Islands", "vi", "1", "(340) 642-1234"],
    ["Uganda", "ug", "256", "0712 345678"],
    ["Ukraine", "ua", "380", "050 123 4567"],
    ["United Arab Emirates", "ae", "971", "050 123 4567"],
    ["United Kingdom", "gb", "44", "07400 123456"],
    ["United States", "us", "1", "(201) 555-0123"],
    ["Uruguay", "uy", "598", "094 231 234"],
    ["Uzbekistan", "uz", "998", "8 91 234 56 78"],
    ["Vanuatu", "vu", "678", "591 2345"],
    ["Vatican City", "va", "39", "312 345 6789"],
    ["Venezuela", "ve", "58", "0412-1234567"],
    ["Vietnam", "vn", "84", "091 234 56 78"],
    ["Wallis and Futuna", "wf", "681", "82 12 34"],
    ["Western Sahara", "eh", "212", "0650-123456"],
    ["Yemen", "ye", "967", "0712 345 678"],
    ["Zambia", "zm", "260", "095 5123456"],
    ["Zimbabwe", "zw", "263", "071 234 5678"],
    ["Åland Islands", "ax", "358", "041 2345678"],
  ];
  countries_dropdown = null;
  country_ip = null;

  constructor() {
    this.loadOptions();
    if (this.shouldRun()) {
      if (document.readyState !== "loading") {
        this.init();
      } else {
        document.addEventListener("DOMContentLoaded", () => {
          this.init();
        });
      }
      return;
    }
  }
  init() {
    while (
      !this.checkNested(
        EngagingNetworks,
        "require",
        "_defined",
        "enjs",
        "checkSubmissionFailed"
      )
    ) {
      if (this.isDebug())
        console.log("TidyContact waiting for EngagingNetworks");
      window.setTimeout(() => {
        this.init();
      }, 10);
      return;
    }
    this.createFields();
    this.addEventListeners();
    if (
      !EngagingNetworks.require._defined.enjs.checkSubmissionFailed() &&
      this.getFieldValue(this.fields.address1) != ""
    ) {
      if (this.isDebug()) console.log("TidyContact Address Field is not empty");
      this.isDirty = true;
    }

    if (this.phoneEnabled()) {
      this.createPhoneFields();
      this.createPhoneMarginVariable();
      if (this.isDebug())
        console.log("TidyContact Phone Standardization is enabled");
      if (this.countryDropDownEnabled()) {
        this.renderFlagsDropDown();
      }
      const phoneField = this.getField(this.fields.phone);
      if (phoneField) {
        phoneField.addEventListener("keyup", (e) => {
          this.handlePhoneInputKeydown(e);
        });
        this.setDefaultPhoneCountry();
      }
    }
  }
  shouldRun() {
    // Check the CID
    if (this.cid === null) {
      console.error("TidyContact script is present but CID is not set");
      return false;
    }
    // Only run if there's a engaging networks form
    const donationForm = document.querySelector("form.en__component");
    if (
      donationForm &&
      window.hasOwnProperty("pageJson") &&
      this.hasAddressFields()
    ) {
      return true;
    }
    if (this.isDebug()) console.log("TidyContact - No EN Address Fields Found");
    return false;
  }
  loadOptions() {
    // Load options from script tag
    this.fields.address1 = this.getScriptData("address1", this.fields.address1);
    this.fields.address2 = this.getScriptData("address2", this.fields.address2);
    this.fields.city = this.getScriptData("city", this.fields.city);
    this.fields.region = this.getScriptData("region", this.fields.region);
    this.fields.postalCode = this.getScriptData(
      "postalCode",
      this.fields.postalCode
    );
    this.fields.country = this.getScriptData("country", this.fields.country);
    this.as_record = this.getScriptData("as_record", this.as_record);
    this.as_date = this.getScriptData("as_date", this.as_date);
    this.as_status = this.getScriptData("as_status", this.as_status);
    this.us_zip_divider = this.getScriptData(
      "us_zip_divider",
      this.us_zip_divider
    );
    this.cid = this.getScriptData("cid", this.cid);
    this.country_fallback = this.getScriptData(
      "country_fallback",
      this.country_fallback
    );
    const country_allow = this.getScriptData("country-allow", "");
    if (country_allow) {
      this.countries = country_allow
        .split(",")
        .map((c) => c.trim().toLowerCase());
    }

    if (this.isDebug()) console.log("Countries Allowed", this.countries);
    // Phone Standardization
    this.fields.phone = this.getScriptData("phone", this.fields.phone);
    this.ps_record = this.getScriptData("ps_record", this.ps_record);
    this.ps_date = this.getScriptData("ps_date", this.ps_date);
    this.ps_status = this.getScriptData("ps_status", this.ps_status);
    this.phone_enable = this.getScriptData("phone_enable", this.phone_enable);
    this.phone_flags = this.getScriptData("phone_flags", this.phone_flags);
    this.phone_country_from_ip = this.getScriptData(
      "phone_country_from_ip",
      this.phone_country_from_ip
    );

    const phone_preferred_countries = this.getScriptData(
      "phone_preferred_countries",
      ""
    );
    if (phone_preferred_countries) {
      this.phone_preferred_countries = phone_preferred_countries
        .split(",")
        .map((c) => c.trim().toLowerCase());
    }
  }
  getField(name) {
    // Get the field by name
    return document.querySelector(`[name="${name}"]`);
  }
  getFieldValue(name) {
    return new FormData(document.querySelector("form.en__component"))
      .getAll(name)
      .join(",");
  }
  addEventListeners() {
    // Add event listeners to fields
    for (const key in this.fields) {
      const field = this.getField(this.fields[key]);
      if (field) {
        field.addEventListener("change", () => {
          if (this.isDebug())
            console.log("TidyContact changed " + field.name, true);
          this.isDirty = true;
        });
      }
    }
    // Add event listener to submit
    window.enOnSubmit = () => {
      if (this.isDirty && !this.wasCalled) {
        if (this.isDebug()) console.log("TidyContact Calling Adress API");
        return this.callAPI();
      }
      return true;
    };
  }
  hasAddressFields() {
    const address1 = this.getField(this.fields.address1);
    const address2 = this.getField(this.fields.address2);
    const city = this.getField(this.fields.city);
    const region = this.getField(this.fields.region);
    const postalCode = this.getField(this.fields.postalCode);
    const country = this.getField(this.fields.country);
    return !!(address1 || address2 || city || region || postalCode || country);
  }
  canUseAPI() {
    const country = !!this.getCountry();
    const address1 = !!this.getFieldValue(this.fields.address1);
    const city = !!this.getFieldValue(this.fields.city);
    const region = !!this.getFieldValue(this.fields.region);
    const postalCode = !!this.getFieldValue(this.fields.postalCode);
    if (country && address1) {
      return (city && region) || postalCode;
    }
  }
  canUsePhoneAPI() {
    if (this.phoneEnabled()) {
      const phone = this.getFieldValue(this.fields.phone);
      const countryPhone = this.getFieldValue("tc.phone.country");
      return phone && countryPhone;
    }
    return false;
  }
  getCountry() {
    const countryFallback = this.country_fallback ?? "";
    const country = this.getFieldValue(this.fields.country);
    return country || countryFallback.toUpperCase();
  }

  callAPI() {
    // Call the API
    const address1 = this.getFieldValue(this.fields.address1);
    const address2 = this.getFieldValue(this.fields.address2);
    const city = this.getFieldValue(this.fields.city);
    const region = this.getFieldValue(this.fields.region);
    const postalCode = this.getFieldValue(this.fields.postalCode);
    const country = this.getCountry();

    const latitudeField = this.getField("supporter.geo.latitude");
    const longitudeField = this.getField("supporter.geo.longitude");
    const recordField = this.getField(this.as_record);
    const dateField = this.getField(this.as_date);
    const statusField = this.getField(this.as_status);

    if (!this.canUseAPI() && !this.canUsePhoneAPI()) {
      if (this.isDebug()) console.log("Not Enough Data to Call API");
      if (dateField) {
        dateField.value = this.todaysDate();
      }
      if (statusField) {
        statusField.value = "PARTIALADDRESS";
      }
      return true;
    }

    if (!this.countryAllowed(country)) {
      if (recordField) {
        let record = {};
        record = Object.assign(
          { date: this.todaysDate(), status: "DISALLOWED" },
          record
        );
        recordField.value = JSON.stringify(record);
      }
      if (dateField) {
        dateField.value = this.todaysDate();
      }
      if (statusField) {
        statusField.value = "DISALLOWED";
      }
      return true;
    }
    const formData = {
      address1,
      address2,
      city,
      region,
      postalCode,
      country,
      url: window.location.href,
      cid: this.cid,
    };
    if (this.canUsePhoneAPI()) {
      formData.phone = this.getFieldValue(this.fields.phone);
      formData.phoneCountry = this.getFieldValue("tc.phone.country");
    }
    this.wasCalled = true;
    if (this.isDebug())
      console.log("TidyContact formData", JSON.parse(JSON.stringify(formData)));
    const ret = this.fetchTimeout(this.endpoint, this.timeout, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        this.httpStatus = response.status;
        return response.json();
      })
      .then(async (data) => {
        if (this.isDebug())
          console.log(
            "TidyContact callAPI response",
            JSON.parse(JSON.stringify(data))
          );

        if (data.valid === true) {
          let record = new Object();
          if ("changed" in data) {
            record = this.setFields(data.changed);
          }
          record["formData"] = formData;
          await this.checkSum(JSON.stringify(record)).then((checksum) => {
            if (this.isDebug()) console.log("TidyContact checksum", checksum);
            record["requestId"] = data.requestId; // We don't want to add the requestId to the checksum
            record["checksum"] = checksum;
          });
          if ("latitude" in data) {
            latitudeField.value = data.latitude;
            record["latitude"] = data.latitude;
          }
          if ("longitude" in data) {
            longitudeField.value = data.longitude;
            record["longitude"] = data.longitude;
          }
          if (recordField) {
            record = Object.assign(
              { date: this.todaysDate(), status: "SUCCESS" },
              record
            );
            recordField.value = JSON.stringify(record);
          }
          if (dateField) {
            dateField.value = this.todaysDate();
          }
          if (statusField) {
            statusField.value = "SUCCESS";
          }
        } else {
          let record = new Object();
          record["formData"] = formData;
          await this.checkSum(JSON.stringify(record)).then((checksum) => {
            if (this.isDebug()) console.log("TidyContact checksum", checksum);
            record["requestId"] = data.requestId; // We don't want to add the requestId to the checksum
            record["checksum"] = checksum;
          });
          if (recordField) {
            record = Object.assign(
              { date: this.todaysDate(), status: "ERROR" },
              record
            );
            recordField.value = JSON.stringify(record);
          }
          if (dateField) {
            dateField.value = this.todaysDate();
          }
          if (statusField) {
            statusField.value =
              "error" in data ? `ERROR: ` + data.error : "INVALIDADDRESS";
          }
        }
        if (this.phoneEnabled() && "phone" in data) {
          await this.setPhoneDataFromAPI(data.phone, data.requestId);
        }
      })
      .catch((error) => {
        if (error.toString().includes("AbortError")) {
          // fetch aborted due to timeout
          if (this.isDebug()) console.log("TidyContact fetch aborted");
          this.httpStatus = 408;
        }
        // network error or json parsing error
        this.writeError(error);
      });
    return ret;
  }
  setFields(data) {
    let response = {};
    const country = this.getCountry();
    const postalCodeValue = this.getFieldValue(this.fields.postalCode);
    // Check if there's no address2 field
    const address2Field = this.getField(this.fields.address2);
    if ("address2" in data && !address2Field) {
      const address = this.getFieldValue(this.fields.address1);
      if (address == data.address1 + " " + data.address2) {
        delete data.address1;
        delete data.address2;
      } else {
        data.address1 = data.address1 + " " + data.address2;
        delete data.address2;
      }
    }
    if (
      "postalCode" in data &&
      postalCodeValue.replace("+", this.us_zip_divider) ===
        data.postalCode.replace("+", this.us_zip_divider)
    ) {
      // Postal code is the same
      delete data.postalCode;
    }
    // Set the fields
    for (const key in data) {
      const field = this.getField(this.fields[key]);
      if (field) {
        let value = data[key];
        if (
          key === "postalCode" &&
          ["US", "USA", "United States"].includes(country)
        ) {
          value = value.replace("+", this.us_zip_divider); // Convert + to the option divider
        }
        response[key] = { from: field.value, to: value };
        field.value = value;
      }
    }
    return response;
  }
  async checkSum(str) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder("utf-8").encode(str);

    // hash the message
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray
      .map((b) => ("00" + b.toString(16)).slice(-2))
      .join("");
    return hashHex;
  }
  isDebug() {
    var regex = new RegExp("[\\?&]debug=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  // Create a hidden input field
  createHiddenInput(name, value = "") {
    const form = document.querySelector("form.en__component");
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.classList.add("en__field__input");
    input.classList.add("en__field__input--text");
    input.classList.add("tidycontact-added-input");
    input.setAttribute("autocomplete", "off");
    input.value = value;
    form.appendChild(input);
    return input;
  }
  hasAddressFields() {
    const address1 = this.getField(this.fields.address1);
    const address2 = this.getField(this.fields.address2);
    const city = this.getField(this.fields.city);
    const region = this.getField(this.fields.region);
    const postalCode = this.getField(this.fields.postalCode);
    const country = this.getField(this.fields.country);
    return !!(address1 || address2 || city || region || postalCode || country);
  }
  createFields() {
    if (!this.hasAddressFields()) return;
    // Creating Latitude and Longitude fields
    const latitudeField = this.getField("supporter.geo.latitude");
    const longitudeField = this.getField("supporter.geo.longitude");
    if (!latitudeField) {
      this.createHiddenInput("supporter.geo.latitude", "");
      if (this.isDebug())
        console.log("Creating Hidden Field: supporter.geo.latitude");
    }
    if (!longitudeField) {
      this.createHiddenInput("supporter.geo.longitude", "");
      if (this.isDebug())
        console.log("Creating Hidden Field: supporter.geo.longitude");
    }
    if (this.as_record) {
      const recordField = this.getField(this.as_record);
      if (!recordField) {
        this.createHiddenInput(this.as_record, "");
        if (this.isDebug())
          console.log("TidyContact creating hidden field: " + this.as_record);
      }
    }
    if (this.as_date) {
      const dateField = this.getField(this.as_date);
      if (!dateField) {
        this.createHiddenInput(this.as_date, "");
        if (this.isDebug())
          console.log("TidyContact creating hidden field: " + this.as_date);
      }
    }
    if (this.as_status) {
      const statusField = this.getField(this.as_status);
      if (!statusField) {
        this.createHiddenInput(this.as_status, "");
        if (this.isDebug())
          console.log("TidyContact creating hidden field: " + this.as_status);
      }
    }
    // If there's no Address 2 or Address 3 field, create them
    if (!this.getField(this.fields.address2)) {
      this.createHiddenInput(this.fields.address2, "");
      if (this.isDebug())
        console.log(
          "TidyContact creating hidden field: " + this.fields.address2
        );
    }
    if (!this.getField(this.fields.address3)) {
      this.createHiddenInput(this.fields.address3, "");
      if (this.isDebug())
        console.log(
          "TidyContact creating hidden field: " + this.fields.address3
        );
    }
  }
  createPhoneFields() {
    this.createHiddenInput("tc.phone.country", "");
    if (this.isDebug())
      console.log("TidyContact creating hidden field: tc.phone.country");
    if (this.ps_record) {
      const recordField = this.getField(this.ps_record);
      if (!recordField) {
        this.createHiddenInput(this.ps_record, "");
        if (this.isDebug())
          console.log("TidyContact creating hidden field: " + this.ps_record);
      }
    }
    if (this.ps_date) {
      const dateField = this.getField(this.ps_date);
      if (!dateField) {
        this.createHiddenInput(this.ps_date, "");
        if (this.isDebug())
          console.log("TidyContact creating hidden field: " + this.ps_date);
      }
    }
    if (this.ps_status) {
      const statusField = this.getField(this.ps_status);
      if (!statusField) {
        this.createHiddenInput(this.ps_status, "");
        if (this.isDebug())
          console.log("TidyContact creating hidden field: " + this.ps_status);
      }
    }
  }
  createPhoneMarginVariable() {
    const phone = this.getField(this.fields.phone);
    if (phone) {
      const phoneStyle = phone.currentStyle || window.getComputedStyle(phone);
      const marginTop = phoneStyle.marginTop;
      const marginBottom = phoneStyle.marginBottom;
      document.documentElement.style.setProperty(
        "--tc-phone-margin-top",
        marginTop
      );
      document.documentElement.style.setProperty(
        "--tc-phone-margin-bottom",
        marginBottom
      );
    }
  }
  todaysDate() {
    return new Date()
      .toLocaleString("en-ZA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\/+/g, ""); // Format date as YYYYMMDD
  }
  checkNested(obj, level, ...rest) {
    if (obj === undefined) return false;
    if (rest.length == 0 && obj.hasOwnProperty(level)) return true;
    return this.checkNested(obj[level], ...rest);
  }
  countryAllowed(country) {
    return this.countries.length > 0
      ? this.countries.includes(country.toLowerCase())
      : true;
  }
  getScriptData(attribute, defaultValue = "") {
    const scriptTag = document.querySelector(
      "script[src*='cdn.tidycontact.io/engagingnetworks.js'], script[src*='tidycontact.js']"
    );
    if (scriptTag) {
      const data = scriptTag.getAttribute("data-" + attribute);
      return data ?? defaultValue;
    }
    if (this.isDebug()) console.error("TidyContact Script Not Found");
    return defaultValue;
  }
  fetchTimeout(url, ms, { signal, ...options } = {}) {
    const controller = new AbortController();
    const promise = fetch(url, { signal: controller.signal, ...options });
    if (signal) signal.addEventListener("abort", () => controller.abort());
    const timeout = setTimeout(() => controller.abort(), ms * 1000);
    return promise.finally(() => clearTimeout(timeout));
  }
  writeError(error) {
    const recordField = this.getField(this.as_record);
    const dateField = this.getField(this.as_date);
    const statusField = this.getField(this.as_status);
    if (recordField) {
      let errorType = "";
      switch (this.httpStatus) {
        case 400:
          errorType = "Bad Request";
          break;
        case 401:
          errorType = "Unauthorized";
          break;
        case 403:
          errorType = "Forbidden";
          break;
        case 404:
          errorType = "Not Found";
          break;
        case 408:
          errorType = "API Request Timeout";
          break;
        case 500:
          errorType = "Internal Server Error";
          break;
        case 503:
          errorType = "Service Unavailable";
          break;
        default:
          errorType = "Unknown Error";
          break;
      }
      const errorData = {
        status: this.httpStatus,
        error: typeof error === "string" ? error : errorType.toUpperCase(),
      };
      recordField.value = JSON.stringify(errorData);
    }
    if (dateField) {
      dateField.value = this.todaysDate();
    }
    if (statusField) {
      statusField.value = "ERROR-API";
    }
  }
  getCountryByCode(code) {
    const countryItem =
      this.countries_list.find((country) => country.includes(code)) ?? "";
    if (countryItem) {
      return {
        name: countryItem[0],
        code: countryItem[1],
        dialCode: countryItem[2],
        placeholder: countryItem[3],
      };
    }
    return null;
  }
  phoneEnabled() {
    return !!this.phone_enable;
  }
  countryDropDownEnabled() {
    return this.phone_flags !== "false";
  }
  async getCountryFromIP() {
    return fetch(`https://${window.location.hostname}/cdn-cgi/trace`)
      .then((res) => res.text())
      .then((t) => {
        let data = t.replace(/[\r\n]+/g, '","').replace(/\=+/g, '":"');
        data = '{"' + data.slice(0, data.lastIndexOf('","')) + '"}';
        const jsondata = JSON.parse(data);
        this.country_ip = jsondata.loc;
        return this.country_ip;
      });
  }
  renderFlagsDropDown() {
    const phoneInput = this.getField(this.fields.phone);
    if (!phoneInput) return;
    this.countries_dropdown = document.createElement("div");
    this.countries_dropdown.classList.add("tc-flags-container");
    const selectedFlag = document.createElement("div");
    selectedFlag.classList.add("tc-selected-flag");
    selectedFlag.setAttribute("role", "combobox");
    selectedFlag.setAttribute("aria-haspopup", "listbox");
    selectedFlag.setAttribute("aria-expanded", "false");
    selectedFlag.setAttribute("aria-owns", "tc-flags-list");
    selectedFlag.setAttribute("aria-label", "Select Country");
    selectedFlag.setAttribute("tabindex", "0");
    const seletedFlagInner = document.createElement("div");
    seletedFlagInner.classList.add("tc-flag");
    // seletedFlagInner.innerHTML = this.getFlagImage("us", "United States");
    const flagArrow = document.createElement("div");
    flagArrow.classList.add("tc-flag-arrow");
    // flagArrow.innerHTML = "&#x25BC;";
    selectedFlag.appendChild(seletedFlagInner);
    selectedFlag.appendChild(flagArrow);
    selectedFlag.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (selectedFlag.classList.contains("tc-open")) {
        this.closeCountryDropDown();
      } else {
        this.openCountryDropDown();
      }
    });
    const countryList = document.createElement("ul");
    countryList.classList.add("tc-country-list");
    countryList.classList.add("tc-hide");
    countryList.setAttribute("id", "tc-country-list");
    countryList.setAttribute("role", "listbox");
    countryList.setAttribute("aria-label", "List of Countries");
    countryList.setAttribute("aria-hidden", "true");
    if (this.phone_preferred_countries.length > 0) {
      const preferredCountries = [];
      this.phone_preferred_countries.forEach((country) => {
        const countryItem = this.getCountryByCode(country);
        if (countryItem) {
          preferredCountries.push(countryItem);
        }
      });
      this.appendCountryItems(
        countryList,
        preferredCountries,
        "tc-country-list-item",
        true
      );
      const divider = document.createElement("li");
      divider.classList.add("tc-divider");
      divider.setAttribute("role", "separator");
      divider.setAttribute("aria-disabled", "true");
      countryList.appendChild(divider);
      if (this.isDebug())
        console.log(
          "TidyContact rendering preferred countries",
          JSON.stringify(preferredCountries)
        );
    }
    const countryListItems = [];
    this.countries_list.forEach((country) => {
      countryListItems.push({
        name: country[0],
        code: country[1],
        dialCode: country[2],
        placeholder: country[3],
      });
    });
    this.appendCountryItems(
      countryList,
      countryListItems,
      "tc-country-list-item"
    );
    countryList.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const target = e.target.closest("li");
      if (target.classList.contains("tc-country-list-item")) {
        const countryItem = this.getCountryByCode(
          target.getAttribute("data-country-code")
        );
        if (countryItem) {
          this.setPhoneCountry(countryItem);
        }
      }
    });
    countryList.addEventListener("mouseover", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const target = e.target.closest("li.tc-country-list-item");
      if (target) {
        this.highlightCountry(target.getAttribute("data-country-code"));
      }
    });
    this.countries_dropdown.appendChild(selectedFlag);
    this.countries_dropdown.appendChild(countryList);
    phoneInput.parentNode.insertBefore(this.countries_dropdown, phoneInput);
    phoneInput.parentNode.classList.add("tc-has-country-flags");
    this.countries_dropdown.addEventListener("keydown", (e) => {
      const isDropdownHidden = this.countries_dropdown
        .querySelector(".tc-country-list")
        .classList.contains("tc-hide");

      if (
        isDropdownHidden &&
        ["ArrowUp", "Up", "ArrowDown", "Down", " ", "Enter"].indexOf(e.key) !==
          -1
      ) {
        // prevent form from being submitted if "ENTER" was pressed
        e.preventDefault();
        // prevent event from being handled again by document
        e.stopPropagation();
        this.openCountryDropDown();
      }

      // allow navigation from dropdown to input on TAB
      if (e.key === "Tab") this.closeCountryDropDown();
    });
    document.addEventListener("keydown", (e) => {
      const isDropdownHidden = this.countries_dropdown
        .querySelector(".tc-country-list")
        .classList.contains("tc-hide");
      if (!isDropdownHidden) {
        // prevent down key from scrolling the whole page,
        // and enter key from submitting a form etc
        e.preventDefault();

        // up and down to navigate
        if (
          e.key === "ArrowUp" ||
          e.key === "Up" ||
          e.key === "ArrowDown" ||
          e.key === "Down"
        )
          this.handleUpDownKey(e.key);
        // enter to select
        else if (e.key === "Enter") this.handleEnterKey();
        // esc to close
        else if (e.key === "Escape") this.closeCountryDropDown();
      }
    });
    document.addEventListener("click", (e) => {
      const isDropdownHidden = this.countries_dropdown
        .querySelector(".tc-country-list")
        .classList.contains("tc-hide");
      if (!isDropdownHidden && !e.target.closest(".tc-country-list")) {
        this.closeCountryDropDown();
      }
    });
  }
  handleUpDownKey(key) {
    const highlightedCountry =
      this.countries_dropdown.querySelector(".tc-highlight");
    if (highlightedCountry) {
      let next =
        key === "ArrowUp" || key === "Up"
          ? highlightedCountry.previousElementSibling
          : highlightedCountry.nextElementSibling;
      if (next) {
        if (next.classList.contains("tc-divider")) {
          next =
            key === "ArrowUp" || key === "Up"
              ? next.previousElementSibling
              : next.nextElementSibling;
        }
        this.highlightCountry(next.getAttribute("data-country-code"));
      }
    }
  }
  handleEnterKey() {
    const highlightedCountry =
      this.countries_dropdown.querySelector(".tc-highlight");
    if (highlightedCountry) {
      const countryItem = this.getCountryByCode(
        highlightedCountry.getAttribute("data-country-code")
      );
      this.setPhoneCountry(countryItem);
    }
  }
  handlePhoneInputKeydown(e) {
    const phoneInput = e.target;
    const phoneNumber = phoneInput.value;
    if (phoneNumber.charAt(0) === "+") {
      if (phoneNumber.length > 2) {
        const countryItem = this.getCountryByCode(phoneNumber.substring(1, 3));
        if (countryItem) {
          this.setPhoneCountry(countryItem);
        } else {
          this.setDefaultPhoneCountry();
        }
      }
    }
  }
  openCountryDropDown() {
    if (!this.countries_dropdown) return;
    const countryList =
      this.countries_dropdown.querySelector(".tc-country-list");
    const selectedFlag =
      this.countries_dropdown.querySelector(".tc-selected-flag");

    if (countryList && selectedFlag) {
      countryList.classList.remove("tc-hide");
      selectedFlag.setAttribute("aria-expanded", "true");
      selectedFlag.classList.add("tc-open");
    }
  }
  closeCountryDropDown() {
    if (!this.countries_dropdown) return;
    const countryList =
      this.countries_dropdown.querySelector(".tc-country-list");
    const selectedFlag =
      this.countries_dropdown.querySelector(".tc-selected-flag");

    if (countryList && selectedFlag) {
      countryList.classList.add("tc-hide");
      selectedFlag.setAttribute("aria-expanded", "false");
      selectedFlag.classList.remove("tc-open");
    }
    const phoneInput = this.getField(this.fields.phone);
    phoneInput.focus();
  }
  getFlagImage(code, name) {
    return `<picture>
      <source
        loading="lazy"
        type="image/webp"
        srcset="https://flagcdn.com/h20/${code}.webp,
          https://flagcdn.com/h40/${code}.webp 2x,
          https://flagcdn.com/h60/${code}.webp 3x">
      <source
        loading="lazy"
        type="image/png"
        srcset="https://flagcdn.com/h20/${code}.png,
          https://flagcdn.com/h40/${code}.png 2x,
          https://flagcdn.com/h60/${code}.png 3x">
      <img
        loading="lazy"
        src="https://flagcdn.com/h20/${code}.png"
        height="20"
        alt="${name}">
    </picture>`;
  }
  appendCountryItems(countryContainer, countries, className, preferred) {
    let html = "";
    // for each country
    for (let i = 0; i < countries.length; i++) {
      const c = countries[i];
      const idSuffix = !!preferred ? "-preferred" : "" ?? "";
      // open the list item
      html += `<li class='tc-country ${className}' tabIndex='-1' id='tc-item-${c.code}${idSuffix}' role='option' data-dial-code='${c.dialCode}' data-country-code='${c.code}' aria-selected='false'>`;
      // add the flag
      html += `<div class='tc-flag-box'><div class='tc-flag tc-${
        c.code
      }'>${this.getFlagImage(c.code, c.name)}</div></div>`;
      // and the country name and dial code
      html += `<span class='tc-country-name'>${c.name}</span>`;
      html += `<span class='tc-dial-code'>+${c.dialCode}</span>`;
      // close the list item
      html += "</li>";
    }
    countryContainer.insertAdjacentHTML("beforeend", html);
  }
  setDefaultPhoneCountry() {
    // First, try to get the country from IP
    if (this.phone_country_from_ip !== "false") {
      this.getCountryFromIP()
        .then((country) => {
          if (this.isDebug()) console.log("Country from IP:", country);
          this.setPhoneCountry(this.getCountryByCode(country.toLowerCase()));
        })
        .catch((error) => {
          this.setPhoneCountry("us");
        });
      return;
    }
    // Then, get the default country Text
    const countryField = this.getField(this.fields.country);
    if (countryField) {
      const countryText = countryField.options[countryField.selectedIndex].text;
      // Then, get the country code from the Text
      const countryData = this.getCountryByCode(countryText);
      if (countryData) {
        this.setPhoneCountry(countryData);
        return;
      } else if (this.phone_preferred_countries.length > 0) {
        // If no country code is found, use the first priority country
        this.setPhoneCountry(
          this.getCountryByCode(this.phone_preferred_countries[0])
        );
        return;
      }
    }
    // If nothing works, GO USA!
    this.setPhoneCountry(this.getCountryByCode("us"));
  }
  setPhoneCountry(country) {
    const countryInput = this.getField("tc.phone.country");
    if (countryInput.value === country.code) return;
    const phoneInput = this.getField(this.fields.phone);
    if (this.countryDropDownEnabled()) {
      const selectedFlag =
        this.countries_dropdown.querySelector(".tc-selected-flag");
      const flagElement = this.countries_dropdown.querySelector(".tc-flag");
      if (selectedFlag && flagElement) {
        flagElement.innerHTML = this.getFlagImage(country.code, country.name);
        selectedFlag.setAttribute("data-country", country.code);
      }
      const currentSelectedCountry = this.countries_dropdown.querySelector(
        ".tc-country-list-item[aria-selected='true']"
      );
      if (currentSelectedCountry) {
        currentSelectedCountry.classList.remove("tc-selected");
        currentSelectedCountry.setAttribute("aria-selected", "false");
      }
      const currentHighlightedCountry =
        this.countries_dropdown.querySelector(".tc-highlight");
      if (currentHighlightedCountry) {
        currentHighlightedCountry.classList.remove("tc-highlight");
      }
      const countryListItem = this.countries_dropdown.querySelector(
        `.tc-country-list-item[data-country-code='${country.code}']`
      );
      if (countryListItem) {
        countryListItem.classList.add("tc-selected");
        countryListItem.setAttribute("aria-selected", "true");
        countryListItem.classList.add("tc-highlight");
      }
      if (selectedFlag.classList.contains("tc-open"))
        this.closeCountryDropDown();
    }
    phoneInput.setAttribute("placeholder", country.placeholder);
    countryInput.value = country.code;
    if (this.isDebug()) {
      console.log(
        `TidyContact - Setting phone country to ${country.code} -  ${country.name}`
      );
    }
  }
  highlightCountry(countryCode) {
    const currentHighlightedCountry =
      this.countries_dropdown.querySelector(".tc-highlight");
    if (currentHighlightedCountry) {
      currentHighlightedCountry.classList.remove("tc-highlight");
    }
    const countryList =
      this.countries_dropdown.querySelector(".tc-country-list");
    if (countryList) {
      const country = countryList.querySelector(
        `.tc-country[data-country-code='${countryCode}']`
      );
      if (country) {
        country.classList.add("tc-highlight");
        country.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }
  }
  async setPhoneDataFromAPI(data, id) {
    const phoneField = this.getField(this.fields.phone);
    const recordField = this.getField(this.ps_record);
    const dateField = this.getField(this.ps_date);
    const statusField = this.getField(this.ps_status);
    let record = new Object();
    record["formData"] = `{"${this.fields.phone}": ${phoneField.value}}`;
    record["formatted"] = data.formatted;
    record["number_type"] = data.number_type;
    if (data.valid === true) {
      if (phoneField.value !== data.formatted.e164) {
        record["phone"] = {
          from: phoneField.value,
          to: data.formatted.e164,
        };
        phoneField.value = data.formatted.e164;
      }

      await this.checkSum(JSON.stringify(record)).then((checksum) => {
        if (this.isDebug()) console.log("TidyContact checksum", checksum);
        record["requestId"] = id; // We don't want to add the requestId to the checksum
        record["checksum"] = checksum;
      });
      if (recordField) {
        record = Object.assign(
          { date: this.todaysDate(), status: "SUCCESS" },
          record
        );
        recordField.value = JSON.stringify(record);
      }
      if (dateField) {
        dateField.value = this.todaysDate();
      }
      if (statusField) {
        statusField.value = "SUCCESS";
      }
    } else {
      await this.checkSum(JSON.stringify(record)).then((checksum) => {
        if (this.isDebug()) console.log("TidyContact checksum", checksum);
        record["requestId"] = id; // We don't want to add the requestId to the checksum
        record["checksum"] = checksum;
      });
      if (recordField) {
        record = Object.assign(
          { date: this.todaysDate(), status: "ERROR" },
          record
        );
        recordField.value = JSON.stringify(record);
      }

      if (dateField) {
        dateField.value = this.todaysDate();
      }
      if (statusField) {
        statusField.value =
          "error" in data ? `ERROR: ` + data.error : "INVALIDPHONE";
      }
    }
  }
}
