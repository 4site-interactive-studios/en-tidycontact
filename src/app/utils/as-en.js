export class asEN {
  endpoint = "https://mid.4sitestudios.com/address-standardize/"; // Address Standardization API
  wasCalled = false; // True if the API endpoint was called
  isDirty = false; // True if the address was changed by the user
  cid = 0; // Client ID
  as_record = ""; // Address Standardization Record
  as_date = ""; // Date of Address Standardization
  as_status = ""; // Status of Address Standardization
  fields = {
    address1: "supporter.address1", // Address Field 1
    address2: "supporter.address2", // Address Field 2
    city: "supporter.city", // City field
    region: "supporter.region", // State field
    postalCode: "supporter.postcode", // Zipcode field
    country: "supporter.country", // Country field
  }; // Address Standardization Fields

  constructor() {
    console.log("asEN constructor", this.shouldRun());
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
    this.loadOptions();
    this.addEventListeners();
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
    const scriptTag = document.querySelector("script[src*='as-en.js']");
    this.fields.address1 =
      scriptTag.getAttribute("data-address1") || this.fields.address1;
    this.fields.address2 =
      scriptTag.getAttribute("data-address2") || this.fields.address2;
    this.fields.city = scriptTag.getAttribute("data-city") || this.fields.city;
    this.fields.region =
      scriptTag.getAttribute("data-region") || this.fields.region;
    this.fields.postalCode =
      scriptTag.getAttribute("data-postalCode") || this.fields.postalCode;
    this.fields.country =
      scriptTag.getAttribute("data-country") || this.fields.country;
    this.as_record = scriptTag.getAttribute("data-as_record") || this.as_record;
    this.as_date = scriptTag.getAttribute("data-as_date") || this.as_date;
    this.as_status = scriptTag.getAttribute("data-as_status") || this.as_status;
    this.cid = scriptTag.getAttribute("data-cid") || this.cid;
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
          this.isDirty = true;
        });
      }
    }
    // Add event listener to submit
    window.enOnSubmit = () => {
      if (this.isDirty && !this.wasCalled) {
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
    const data = {
      address1,
      address2,
      city,
      region,
      postalCode,
      country,
      cid: this.cid,
    };
    this.wasCalled = true;
    const ret = fetch(this.endpoint, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(new Date(), "callAPI response", data);
        const recordField = this.getField(this.as_record);
        const dateField = this.getField(this.as_date);
        const statusField = this.getField(this.as_status);
        if ("changed" in data && data.valid === true) {
          let record = this.setFields(data.changed);
          record["requestId"] = data.requestId;
          if (recordField) {
            recordField.value = JSON.stringify(record);
          }
          if (dateField) {
            dateField.value = new Date().toLocaleString("en-US", {
              hour12: false,
            });
          }
          if (statusField) {
            statusField.value = "Success";
          }
        } else if ("error" in data) {
          if (recordField) {
            recordField.value = JSON.stringify({ requestId: data.requestId });
          }
          if (dateField) {
            dateField.value = new Date().toLocaleString("en-US", {
              hour12: false,
            });
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
    // Set the fields
    for (const key in data) {
      const field = this.getField(this.fields[key]);
      if (field) {
        response[key] = { from: field.value, to: data[key] };
        field.value = data[key];
      }
    }
    return response;
  }
}
