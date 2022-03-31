export class asEN {
  endpoint = "https://mid.4sitestudios.com/address-standardize/"; // Address Standardization API
  wasCalled = false; // True if the API endpoint was called
  isDirty = false; // True if the address was changed by the user
  cid = 0; // Client ID
  as_record = ""; // Address Standardization Record
  as_date = ""; // Date of Address Standardization
  as_status = ""; // Status of Address Standardization
  countries = []; // Country that is allowed to use the API, if empty, all countries are allowed. You can use more than one country by separating them with a comma.
  fields = {
    address1: "supporter.address1", // Address Field 1
    address2: "supporter.address2", // Address Field 2
    city: "supporter.city", // City field
    region: "supporter.region", // State field
    postalCode: "supporter.postcode", // Zipcode field
    country: "supporter.country", // Country field
  }; // Address Standardization Fields

  constructor() {
    if (this.isDebug()) console.log("asEN constructor", this.shouldRun());
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
      if (this.isDebug()) console.log("asEN waiting for EngagingNetworks");
      window.setTimeout(() => {
        this.init();
      }, 10);
      return;
    }
    this.loadOptions();
    this.createFields();
    this.addEventListeners();
    if (
      !EngagingNetworks.require._defined.enjs.checkSubmissionFailed() &&
      this.getFieldValue(this.fields.address1) != ""
    ) {
      if (this.isDebug()) console.log("asEN Address Field is not empty");
      this.isDirty = true;
    }
  }
  shouldRun() {
    // Only run if there's a engaging networks form
    const donationForm = document.querySelector("form.en__component");
    if (donationForm && window.hasOwnProperty("pageJson")) {
      return true;
    }
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
    this.cid = this.getScriptData("cid", this.cid);
    const country_allow = this.getScriptData(
      "country-allow",
      this.country_allow
    );
    if (country_allow) {
      this.countries = country_allow
        .split(",")
        .map((c) => c.trim().toLowerCase());
    }

    if (this.isDebug()) console.log("Countries Allowed", this.countries);
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
          if (this.isDebug()) console.log("asEN changed " + field.name, true);
          this.isDirty = true;
        });
      }
    }
    // Add event listener to submit
    window.enOnSubmit = () => {
      if (this.isDirty && !this.wasCalled) {
        if (this.isDebug()) console.log("asEN Calling Adress API");
        return this.callAPI();
      }
      return true;
    };
  }
  callAPI() {
    // Call the API
    const address1 = this.getFieldValue(this.fields.address1);
    const address2 = this.getFieldValue(this.fields.address2);
    const city = this.getFieldValue(this.fields.city);
    const region = this.getFieldValue(this.fields.region);
    const postalCode = this.getFieldValue(this.fields.postalCode);
    const country = this.getFieldValue(this.fields.country);
    if (!this.countryAllowed(country)) {
      const recordField = this.getField(this.as_record);
      const dateField = this.getField(this.as_date);
      const statusField = this.getField(this.as_status);
      if (recordField) {
        recordField.value = "DISALLOWED";
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
      cid: this.cid,
    };
    this.wasCalled = true;
    if (this.isDebug()) console.log("asEN formData", formData);
    const ret = fetch(this.endpoint, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (this.isDebug()) console.log("asEN callAPI response", data);
        const recordField = this.getField(this.as_record);
        const dateField = this.getField(this.as_date);
        const statusField = this.getField(this.as_status);
        if ("changed" in data && data.valid === true) {
          let record = this.setFields(data.changed);
          record["formData"] = formData;
          await this.checkSum(JSON.stringify(record)).then((checksum) => {
            if (this.isDebug()) console.log("asEN checksum", checksum);
            record["requestId"] = data.requestId; // We don't want to add the requestId to the checksum
            record["checksum"] = checksum;
          });
          if (recordField) {
            recordField.value = JSON.stringify(record);
          }
          if (dateField) {
            dateField.value = this.todaysDate();
          }
          if (statusField) {
            statusField.value = "Success";
          }
        } else if ("error" in data) {
          let record = new Object();
          record["formData"] = formData;
          await this.checkSum(JSON.stringify(record)).then((checksum) => {
            if (this.isDebug()) console.log("asEN checksum", checksum);
            record["requestId"] = data.requestId; // We don't want to add the requestId to the checksum
            record["checksum"] = checksum;
          });
          if (recordField) {
            recordField.value = JSON.stringify(record);
          }
          if (dateField) {
            dateField.value = this.todaysDate();
          }
          if (statusField) {
            statusField.value = data.error;
          }
        }
      })
      .catch((error) => {
        console.error("Address Standardization Error", error);
      });
    return ret;
  }
  setFields(data) {
    let response = {};
    const countryValue = this.getFieldValue(this.fields.country);
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
      postalCodeValue.match(/\d+/g).join("") ===
        data.postalCode.match(/\d+/g).join("")
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
          ["US", "USA", "United States"].includes(countryValue)
        ) {
          value = value.match(/\d+/g).join(""); // Remove all non-numeric characters
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
    input.classList.add("engrid-added-input");
    input.setAttribute("autocomplete", "off");
    input.value = value;
    form.appendChild(input);
    return input;
  }
  createFields() {
    if (this.as_record) {
      const recordField = this.getField(this.as_record);
      if (!recordField) {
        this.createHiddenInput(this.as_record, "");
        if (this.isDebug())
          console.log("asEN creating hidden field: " + this.as_record);
      }
    }
    if (this.as_date) {
      const dateField = this.getField(this.as_date);
      if (!dateField) {
        this.createHiddenInput(this.as_date, "");
        if (this.isDebug())
          console.log("asEN creating hidden field: " + this.as_date);
      }
    }
    if (this.as_status) {
      const statusField = this.getField(this.as_status);
      if (!statusField) {
        this.createHiddenInput(this.as_status, "");
        if (this.isDebug())
          console.log("asEN creating hidden field: " + this.as_status);
      }
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
    const scriptTag = document.querySelector("script[src*='as-en.js']");
    if (scriptTag) {
      const data = scriptTag.getAttribute("data-" + attribute);
      return data ?? defaultValue;
    }
    return defaultValue;
  }
}
