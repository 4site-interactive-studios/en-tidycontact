export class asEN {
  constructor() {
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
    console.log("asEN init");
  }
  shouldRun() {
    // Only run if there's a engaging networks form
    const donationForm = document.querySelector("form.en__component");
    if (donationForm && window.hasOwnProperty("pageJson")) {
      return true;
    }
    return false;
  }
}
