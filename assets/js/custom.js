// Function to load the Ringba script and update the phone number
function loadRingbaScript() {
  console.log("Attempting to load Ringba script...");
  const script = document.createElement("script");
  script.src = "//b-js.ringba.com/CAf48475b102d441f384fa42a37d53e56a";
  script.async = true;

  script.onload = function () {
    console.log("Ringba script loaded successfully");
  };

  script.onerror = function () {
    console.error("Failed to load Ringba script");
  };

  document.body.appendChild(script);
}

// Call the function to load Ringba
loadRingbaScript();

// Global object to store all selected values
window.formData = {
  citizenship: "",
  zipcode: "",
  age: "",
  is_insured: "", // Changed from insuranceStatus
  insurance_company: "",
};

// Function to update the URL with all selected values
function updateUrlWithAllValues() {
  const url = new URL(window.location);

  // Clear existing parameters
  url.search = "";

  // Add all non-empty values to URL
  Object.entries(window.formData).forEach(([key, value]) => {
    // Replace "No" with "unknown" for insuranceStatus
    const urlValue =
      key === "insuranceStatus" && value === "No" ? "UNKNOWN" : value;
    if (urlValue) {
      url.searchParams.set(key, urlValue);
    }
  });

  // Update URL
  window.history.replaceState({}, "", url);

  // Log for debugging
  console.log("Updated URL with form data:", window.formData);
}

// Function to update a specific form value
function updateFormValue(key, value) {
  window.formData[key] = value;
}

// Function to simulate typing effect for the message
function typeMessage(elementId, message, delay) {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.textContent = "";
  let index = 0;

  const typingInterval = setInterval(() => {
    if (index < message.length) {
      element.textContent += message.charAt(index);
      index++;
    } else {
      clearInterval(typingInterval);
    }
  }, delay);
}

// Event listeners for each response option
document.addEventListener("DOMContentLoaded", () => {
  // Citizenship buttons
  document
    .querySelectorAll("#citizenshipButtons .chat-button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const response = button.getAttribute("data-form-value");
        // Convert response to lowercase for citizenship
        const lowerCaseResponse = response.toLowerCase();
        updateFormValue("citizenship", lowerCaseResponse);
      });
    });

  // ZIP Code input
  document.getElementById("zipcodeSubmit")?.addEventListener("click", () => {
    const zipcode = document.getElementById("zipcodeInput")?.value;
    if (zipcode) {
      updateFormValue("zipcode", zipcode);
    }
  });

  // Age input
  document.getElementById("ageSubmit")?.addEventListener("click", () => {
    const age = document.getElementById("ageInput")?.value;
    if (age) {
      updateFormValue("age", age);
    }
  });

  // Insurance status buttons (including "No" button)
  document.querySelectorAll(".finishquiz").forEach((button) => {
    button.addEventListener("click", () => {
      const response = button.getAttribute("data-form-value");

      // Determine the parameter value based on the button clicked
      let paramValue;
      if (response === "Yes") {
        paramValue = "OTHER";
      } else if (response === "No") {
        paramValue = "UNKNOWN";
      } else {
        paramValue = response;
      }

      updateFormValue("is_insured", paramValue);

      // Update button states
      document.querySelectorAll(".finishquiz").forEach((btn) => {
        btn.setAttribute("data-selected", "false");
      });
      button.setAttribute("data-selected", "true");

      // If "No" is clicked, update URL and show values
      if (response === "No") {
        updateUrlWithAllValues();
        showCongratulationsMessage();
      }
    });
  });

  // Insurance company selection
  document.getElementById("countrySelect")?.addEventListener("change", () => {
    const insurance_company = document.getElementById("countrySelect").value;
    if (insurance_company) {
      updateFormValue("insurance_company", insurance_company);

      // Now update the URL with all collected data
      updateUrlWithAllValues();

      // Display the selected insurance company
      const msgUserCountry = document.getElementById("msgUserCountry");
      if (msgUserCountry) {
        msgUserCountry.textContent = `You Selected: ${insurance_company}`;
        msgUserCountry.classList.remove("hidden");
      }
      document.getElementById("userBlockCountry")?.classList.remove("hidden");

      showCongratulationsMessage();
      scrollToBottom();
    } else {
      alert("Please select an insurance company.");
    }
  });
});

function showCongratulationsMessage() {
  // Show congratulations message
  setTimeout(() => {
    document.getElementById("msg13")?.classList.remove("hidden");
    typeMessage("congratulationsMsg", "Congratulations, You Qualify!! ", 100);

    // Load Ringba script when congratulations message is shown
    loadRingbaScript();
  }, 2000);

  document.getElementById("agentBlock4")?.classList.remove("hidden");
  document.getElementById("countrySelectContainer")?.classList.add("hidden");
}

// Set countdown duration in minutes
var startTime = 3.0; // 3 minutes

// Optional class for styling when timer is done
var doneClass = "done";

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  var intervalLoop = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Update all display elements
    for (var i = 0; i < display.length; i++) {
      display[i].textContent = minutes + ":" + seconds;
    }

    // Check if timer has finished
    if (--timer < 0) {
      for (var i = 0; i < display.length; i++) {
        display[i].classList.add(doneClass);
        display[i].textContent = "DONE";
      }
      clearInterval(intervalLoop);
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  var display = [document.getElementById("timer")]; // Select timer display
  var duration = startTime * 60; // Convert minutes to seconds
  startTimer(duration, display);
});

$(document).ready(function () {
  var tempCssClass;

  setTimeout(function () {
    $("#initTyping").remove();
    $("#msg1").removeClass("hidden").after(typingEffect());
    setTimeout(function () {
      $(".temp-typing").remove();
      $("#msg2").removeClass("hidden").after(typingEffect());
      scrollToBottom();
      setTimeout(function () {
        $(".temp-typing").remove();
        $("#msg3").removeClass("hidden").after(typingEffect());
        scrollToBottom();
        setTimeout(function () {
          $(".temp-typing").remove();
          $("#msg4").removeClass("hidden");
        }, 0);
      }, 1750);
    }, 1250);
  }, 750);

  var buttonValue;
  var currentStep;

  $("button.chat-button, #zipcodeSubmit, #countrySelectSubmit, #ageSubmit").on(
    "click",
    function () {
      currentStep = $(this).attr("data-form-step");
      buttonValue = $(this).attr("data-form-value");

      // Step for US citizenship question
      if (currentStep == "citizenship") {
        $("#agentBlockzipcode .agent-chat").prepend(typingEffect());
        $("#citizenshipButtons").addClass("hidden");
        $("#userBlockCitizenship").removeClass("hidden");

        if (buttonValue == "Yes") {
          $("#msgUserCitizenshipYes").removeClass("hidden");
        } else {
          $("#msgUserCitizenshipNo").removeClass("hidden");
        }

        scrollToBottom();
        setTimeout(function () {
          $("#agentBlockzipcode").removeClass("hidden");
          scrollToBottom();
          setTimeout(function () {
            $(".temp-typing").remove();
            $("#msgzipcode").removeClass("hidden").after(typingEffect());
            scrollToBottom();
            setTimeout(function () {
              $(".temp-typing").remove();
              $("#zipcodeInputContainer").removeClass("hidden");
              scrollToBottom();
            }, 750);
          }, 2250);
        }, 50);
      }

      // Step for zip code input
      if (currentStep == "zipcode") {
        var zipcode = $("#zipcodeInput").val();
        if (/^\d{5}$/.test(zipcode)) {
          $("#zipcodeInputContainer").addClass("hidden");
          $("#userBlockzipcode").removeClass("hidden");
          $("#msgUserzipcode").text(zipcode).removeClass("hidden");

          scrollToBottom();
          setTimeout(function () {
            $("#agentBlockage").removeClass("hidden");
            scrollToBottom();
            setTimeout(function () {
              $(".temp-typing").remove();
              $("#msgage").removeClass("hidden").after(typingEffect());
              scrollToBottom();
              setTimeout(function () {
                $(".temp-typing").remove();
                $("#ageInputContainer").removeClass("hidden");
                scrollToBottom();
              }, 750);
            }, 1750);
          }, 750);
        } else {
          alert("Please enter a valid 5-digit zip code.");
        }
      }

      // Step for age input
      if (currentStep == "age") {
        var age = $("#ageInput").val();
        if (/^\d{2}$/.test(age)) {
          $("#ageInputContainer").addClass("hidden");
          $("#userBlockage").removeClass("hidden");
          $("#msgUserage").text(age).removeClass("hidden");

          scrollToBottom();
          setTimeout(function () {
            $("#agentBlock3").removeClass("hidden");
            scrollToBottom();
            setTimeout(function () {
              $(".temp-typing").remove();
              $("#msg10").removeClass("hidden").after(typingEffect());
              scrollToBottom();
              setTimeout(function () {
                $(".temp-typing").remove();
                $("#msg11").removeClass("hidden");
                scrollToBottom();
              }, 750);
            }, 1750);
          }, 750);
        } else {
          alert("Please enter a valid 2-digit Age.");
        }
      }

      // Step for citizenship question
      if (currentStep == 1) {
        $("#agentBlockCitizenship").removeClass("hidden");

        setTimeout(function () {
          $(".temp-typing").remove();
          $("#msg6").removeClass("hidden").after(typingEffect());
        }, 750);

        scrollToBottom();
        setTimeout(function () {
          $(".temp-typing").remove();
          $("#msgCitizenship").removeClass("hidden").after(typingEffect());
          scrollToBottom();
          setTimeout(function () {
            $(".temp-typing").remove();
            $("#citizenshipButtons").removeClass("hidden");
            scrollToBottom();
          }, 1250);
        }, 1250);
      }

      // Step for insurance question
      if (currentStep == 3) {
        $("#agentBlock4 .agent-chat").prepend(typingEffect());
        $("#msg11").addClass("hidden");
        $("#userBlock3").removeClass("hidden");

        if (buttonValue == "No") {
          $("#msg12no").removeClass("hidden");
          scrollToBottom();

          // Skip country selection and proceed to congratulations
          setTimeout(function () {
            displayCongratulationsMessages();
          }, 750);
        } else if (buttonValue == "Yes") {
          $("#msg12yes").removeClass("hidden");
          scrollToBottom();

          // Show country selection if "Yes" with typing effect
          setTimeout(function () {
            $("#agentBlockCountry").removeClass("hidden");
            $("#agentBlockCountry .agent-chat").prepend(typingEffect());
            scrollToBottom();

            setTimeout(function () {
              $(".temp-typing").remove();
              $("#msgCountry").removeClass("hidden").after(typingEffect());
              scrollToBottom();

              setTimeout(function () {
                $(".temp-typing").remove();
                $("#countrySelectContainer").removeClass("hidden");
                scrollToBottom();
              }, 750);
            }, 1500);
          }, 2250);
        }
      }

      // Step for country selection
      if (currentStep == "country") {
        // $("#agentBlockCountry .agent-chat").prepend(typingEffect());
        $("#countrySelectContainer").addClass("hidden");
        $("#userBlockCountry").removeClass("hidden");

        // Display selected country
        var selectedCountry = $("#countrySelect option:selected").text();
        $("#msgUserCountry").text(selectedCountry).removeClass("hidden");

        scrollToBottom();

        // Proceed to congratulations messages after country selection
        setTimeout(function () {
          displayCongratulationsMessages();
        }, 750);
      }

      // Function to display congratulations messages
      function displayCongratulationsMessages() {
        $("#agentBlock4").removeClass("hidden");
        scrollToBottom();
        setTimeout(function () {
          $(".temp-typing").remove();
          // $("#msg13").removeClass("hidden").after(typingEffect());
          // scrollToBottom();
          setTimeout(function () {
            // $(".temp-typing").remove();
            // $("#msg14").removeClass("hidden").after(typingEffect());
            // scrollToBottom();
            setTimeout(function () {
              $(".temp-typing").remove();
              $("#msg16").removeClass("hidden").after(typingEffect());
              scrollToBottom();
              setTimeout(function () {
                $(".temp-typing").remove();
                $("#msg17").removeClass("hidden");
                $("#msg17a").removeClass("hidden");
                scrollToBottom();
              }, 0);
            }, 2250);
          }, 1750);
        }, 1250);
      }
    }
  );

  function scrollToBottom(elementId) {
    var object = $("main");
    $("html, body").animate(
      {
        scrollTop:
          object.offset().top + object.outerHeight() - $(window).height(),
      },
      "fast"
    );
  }
});

function typingEffect(cssClass) {
  string =
    '<div class="temp-typing bg-gray-200 p-3 rounded-lg shadow-xs mt-2 inline-block">';
  string += '<div class="typing-animation">';
  string += '<div class="typing-dot"></div>';
  string += '<div class="typing-dot"></div>';
  string += '<div class="typing-dot"></div>';
  string += "</div>";
  string += "</div>";

  return string;
}

var daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var currentDate = new Date();
var currentDayOfWeek = daysOfWeek[currentDate.getDay()];
var currentMonth = months[currentDate.getMonth()];
var currentDay = currentDate.getDate();
var currentYear = currentDate.getFullYear();
var formattedDate =
  currentDayOfWeek +
  ", " +
  ("0" + (currentDate.getMonth() + 1)).slice(-2) +
  "/" +
  ("0" + currentDay).slice(-2) +
  "/" +
  currentYear;
document.getElementById("currentDate").textContent = formattedDate;

var triggerOfferwall = function () {
  setTimeout(function () {
    window.open("https://dwizr.com/?a=7669&c=3792&p=r&s1", "_blank");
  }, 10000);
};

// Values show in URL and insurance selected field funcationalty

// Insurance status buttons (including "No" button)
document.querySelectorAll(".finishquiz").forEach((button) => {
  button.addEventListener("click", () => {
    const response = button.getAttribute("data-form-value");
    updateFormValue("insuranceStatus", response);

    // Update button states
    document.querySelectorAll(".finishquiz").forEach((btn) => {
      btn.setAttribute("data-selected", "false");
    });
    button.setAttribute("data-selected", "true");

    // If "No" is clicked, update URL and show values
    if (response === "No") {
      updateUrlWithAllValues();
      showCongratulationsMessage();
    }
  });
});

// Insurance company selection
document.getElementById("countrySelect")?.addEventListener("change", () => {
  const insurance_company = document.getElementById("countrySelect").value;
  if (insurance_company) {
    updateFormValue("insurance_company", insurance_company);

    // Update the URL with all collected data
    updateUrlWithAllValues();

    // Display the selected insurance company
    const msgUserCountry = document.getElementById("msgUserCountry");
    if (msgUserCountry) {
      msgUserCountry.textContent = `You Selected: ${insurance_company}`;
      msgUserCountry.classList.remove("hidden");
    }
    document.getElementById("userBlockCountry")?.classList.remove("hidden");

    showCongratulationsMessage();
  } else {
    alert("Please select an insurance company.");
  }
});

function showCongratulationsMessage() {
  // Show congratulations message
  setTimeout(() => {
    document.getElementById("msg13")?.classList.remove("hidden");
    typeMessage("congratulationsMsg", "Congratulations, You Qualify!! ", 100);

    document.getElementById("msg14")?.classList.remove("hidden");
    typeMessage("congratulationsMsg", "Congratulations, You Qualify!! ", 100);

    // Load Ringba script when congratulations message is shown
    loadRingbaScript();

    // Scroll to bottom after showing the message
    scrollToBottom();
  }, 2000);

  document.getElementById("agentBlock4")?.classList.remove("hidden");
  document.getElementById("countrySelectContainer")?.classList.add("hidden");
}

// Scroll to bottom function
function scrollToBottom() {
  document.getElementById("msg13")?.scrollIntoView({ behavior: "smooth" });
}
