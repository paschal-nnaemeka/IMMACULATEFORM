document.addEventListener('DOMContentLoaded', function () {

  const agree = document.getElementById("agree");
  const calendarCard = document.getElementById("calendarCard");
  const bookingForm = document.getElementById("bookingForm");

  const file = document.getElementById("fileUpload");
  const preview = document.getElementById("preview");
  const warning = document.getElementById("warning");

  const retreatProgramFile = document.getElementById("retreatProgramUpload");
  const retreatProgramPreview = document.getElementById("retreatProgramPreview");
  const retreatProgramWarning = document.getElementById("retreatProgramWarning");

  const submitBtn = document.getElementById("submitBtn");

  const datePicker = document.getElementById("datePicker");
  const hiddenDate = document.getElementById("hiddenDate");

  // Text inputs
  const fullName = document.querySelector('input[name="full_name"]');
  const parishName = document.querySelector('input[name="parish_name"]');
  const diocese = document.querySelector('input[name="diocese"]');
  const phoneNumber = document.querySelector('input[name="phone_number"]');

  // Show calendar & form after rules accepted
  agree.addEventListener("change", () => {
    if(agree.checked){
      calendarCard.style.display = "block";
      bookingForm.style.display = "block";
    } else {
      calendarCard.style.display = "none";
      bookingForm.style.display = "none";
    }
    validate();
  });

  // Date picker → hidden input
  datePicker.addEventListener("change", () => {
    hiddenDate.value = datePicker.value;
    validate();
  });

  // File preview
  file.addEventListener("change", () => {
    if(file.files.length > 0){
      preview.innerHTML = "✅ " + file.files[0].name + " selected";
      warning.style.display = "none";
    }
    validate();
  });

  // Retreat Program file preview
  retreatProgramFile.addEventListener("change", () => {
    if(retreatProgramFile.files.length > 0){
      retreatProgramPreview.innerHTML = "✅ " + retreatProgramFile.files[0].name + " selected";
      retreatProgramWarning.style.display = "none";
    }
    validate();
  });

  // Text input validation
  fullName.addEventListener("input", validate);
  parishName.addEventListener("input", validate);
  diocese.addEventListener("input", validate);
  phoneNumber.addEventListener("input", validate);

  // Validation - blocks submit if ANYTHING is missing
  function validate(){
    const isFullNameFilled = fullName.value.trim() !== "";
    const isParishNameFilled = parishName.value.trim() !== "";
    const isDioceseFilled = diocese.value.trim() !== "";
    const isPhoneNumberFilled = phoneNumber.value.trim() !== "";
    const isDateSelected = hiddenDate.value !== "";
    const isRecommendationUploaded = file.files.length > 0;
    const isRetreatProgramUploaded = retreatProgramFile.files.length > 0;
    const isRulesAccepted = agree.checked;

    if(isRulesAccepted && 
       isFullNameFilled && 
       isParishNameFilled && 
       isDioceseFilled && 
       isPhoneNumberFilled && 
       isDateSelected && 
       isRecommendationUploaded && 
       isRetreatProgramUploaded){
      submitBtn.disabled = false;
    } else {
    submitBtn.disabled = true;
    }
  }

  // Prevent submit if anything missing
  submitBtn.addEventListener("click", (e) => {
    let hasError = false;

    if(fullName.value.trim() === ""){
      hasError = true;
    }

    if(parishName.value.trim() === ""){
      hasError = true;
    }

    if(diocese.value.trim() === ""){
      hasError = true;
    }

    if(phoneNumber.value.trim() === ""){
      hasError = true;
    }

    if(hiddenDate.value === ""){
      hasError = true;
    }

    if(file.files.length === 0){
      warning.style.display = "block";
      hasError = true;
    }

    if(retreatProgramFile.files.length === 0){
      retreatProgramWarning.style.display = "block";
      hasError = true;
    }

    if(hasError){
      e.preventDefault();
      alert("⚠️ Please fill in all required fields before submitting.");
    }
  });

});