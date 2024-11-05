var startTime = 3.0; //set countdown in Minutes

var doneClass = "done"; //optional styling when timer is done
function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  var intervalLoop = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    for (var i = 0; i < display.length; i++) {
      display[i].textContent = minutes + ":" + seconds;
    }
    if (--timer < 0) {
      for (var i = 0; i < display.length; i++) {
        display[i].classList.add(doneClass);
        display[i].textContent = "DONE";
      }
      clearInterval(intervalLoop);
    }
  }, 1000);
}

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

  $("button.chat-button, #zipCodeSubmit, #countrySelectSubmit, #ageSubmit").on(
    "click",
    function () {
      currentStep = $(this).attr("data-form-step");
      buttonValue = $(this).attr("data-form-value");

      // Step for US citizenship question
      if (currentStep == "citizenship") {
        $("#agentBlockZipCode .agent-chat").prepend(typingEffect());
        $("#citizenshipButtons").addClass("hidden");
        $("#userBlockCitizenship").removeClass("hidden");

        if (buttonValue == "Yes") {
          $("#msgUserCitizenshipYes").removeClass("hidden");
        } else {
          $("#msgUserCitizenshipNo").removeClass("hidden");
        }

        scrollToBottom();
        setTimeout(function () {
          $("#agentBlockZipCode").removeClass("hidden");
          scrollToBottom();
          setTimeout(function () {
            $(".temp-typing").remove();
            $("#msgZipCode").removeClass("hidden").after(typingEffect());
            scrollToBottom();
            setTimeout(function () {
              $(".temp-typing").remove();
              $("#zipCodeInputContainer").removeClass("hidden");
              scrollToBottom();
            }, 750);
          }, 2250);
        }, 50);
      }

      // Step for zip code input
      if (currentStep == "zipCode") {
        var zipCode = $("#zipCodeInput").val();
        if (/^\d{5}$/.test(zipCode)) {
          $("#zipCodeInputContainer").addClass("hidden");
          $("#userBlockZipCode").removeClass("hidden");
          $("#msgUserZipCode").text(zipCode).removeClass("hidden");

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

      // Step for age range question
      if (currentStep == 2) {
        $("#agentBlock2").removeClass("hidden");
        if (!$("#msg7").is(":visible")) {
          // Check if the typing effect has already been shown
          $("#agentBlock2 .agent-chat").prepend(typingEffect());
          scrollToBottom();

          setTimeout(function () {
            $(".temp-typing").remove();
            $("#msg7").removeClass("hidden").after(typingEffect());
            scrollToBottom();

            setTimeout(function () {
              $(".temp-typing").remove();
              $("#msg8").removeClass("hidden");
              scrollToBottom();
            }, 750);
          }, 1500);
        }
      }

      // User response for age range
      if (currentStep == 2) {
        $("#userBlock2").removeClass("hidden");
        $("#msg9" + buttonValue.toLowerCase())
          .removeClass("hidden")
          .text(buttonValue);
        scrollToBottom();

        // Proceed to next step (insurance question)
        setTimeout(function () {
          currentStep = 3;
          $("#agentBlock3").removeClass("hidden");
          $("#agentBlock3 .agent-chat").prepend(typingEffect());
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
          }, 1500);
        }, 1500);
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
          $("#msg13").removeClass("hidden").after(typingEffect());
          scrollToBottom();
          setTimeout(function () {
            $(".temp-typing").remove();
            $("#msg14").removeClass("hidden").after(typingEffect());
            scrollToBottom();
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
