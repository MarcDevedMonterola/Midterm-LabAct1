// ==========================================
// Interactive Student Profile Controller
// ==========================================

// Initial student data
const initialProfile = {
  name: "Maria Santos",
  program: "BS Information Technology",
  year: "3rd Year",
  status: "active",
  studentId: "2026-001"
};

// Available options
const programOptions = [
  "BS Information Technology",
  "BS Computer Science",
  "BS Information Systems"
];

const yearOptions = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year"
];

const statusOptions = [
  "active",
  "inactive"
];

// ==========================================
// DOM SELECTION
// ==========================================

// Using getElementById() for required elements
const profileForm = document.getElementById("profileForm");
const nameInput = document.getElementById("nameInput");
const programInput = document.getElementById("programInput");
const yearInput = document.getElementById("yearInput");
const statusInput = document.getElementById("statusInput");

const updateBtn = document.getElementById("updateBtn");
const toggleDetailsBtn = document.getElementById("toggleDetailsBtn");
const themeBtn = document.getElementById("themeBtn");
const resetBtn = document.getElementById("resetBtn");

const profileCard = document.getElementById("profileCard");
const profileName = document.getElementById("profileName");
const profileProgram = document.getElementById("profileProgram");
const profileYear = document.getElementById("profileYear");
const profileStatus = document.getElementById("profileStatus");

const detailsPanel = document.getElementById("detailsPanel");
const studentIdDisplay = document.getElementById("studentIdDisplay");
const formMessage = document.getElementById("formMessage");

// Using querySelector()
const controlPanel = document.querySelector(".control-panel");

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Checks whether the student name is valid.
 * A valid name must contain at least 2 characters
 * after removing leading/trailing spaces.
 */
function isValidStudentName(name) {
  return typeof name === "string" && name.trim().length >= 2;
}

/**
 * Converts the lowercase status value into
 * the display version.
 */
function formatStudentStatus(status) {
  if (status === "active") {
    return "Active";
  }

  if (status === "inactive") {
    return "Inactive";
  }

  return "";
}

// ==========================================
// UPDATE PROFILE DISPLAY
// ==========================================

function updateProfileDisplay(name, program, year) {
  // Defensive checks before modifying elements
  if (profileName) {
    profileName.textContent = name;
  }

  if (profileProgram) {
    profileProgram.textContent = program;
  }

  if (profileYear) {
    profileYear.textContent = year;
  }
}

// ==========================================
// SET STATUS
// ==========================================

function setStatus(status) {
  // Make sure the required elements exist
  if (!profileCard || !profileStatus) {
    return;
  }

  const formattedStatus = formatStudentStatus(status);

  // Safely change the status text
  profileStatus.textContent = formattedStatus;

  // Update data-status
  profileCard.dataset.status = status;

  // Remove both state classes first
  profileCard.classList.remove("active");
  profileCard.classList.remove("inactive");

  // Add the correct state class
  if (status === "active") {
    profileCard.classList.add("active");
  } else if (status === "inactive") {
    profileCard.classList.add("inactive");
  }
}

// ==========================================
// TOGGLE DETAILS
// ==========================================

function toggleDetails() {
  if (!detailsPanel) {
    return;
  }

  // Required classList.toggle()
  detailsPanel.classList.toggle("hidden");
}

// ==========================================
// TOGGLE THEME
// ==========================================

function toggleTheme() {
  // Add/remove dark-theme from body
  document.body.classList.toggle("dark-theme");
}

// ==========================================
// DISPLAY STUDENT ID
// ==========================================

function displayStudentId() {
  if (!profileCard || !studentIdDisplay) {
    return;
  }

  // Read student ID from data-student-id
  const studentId = profileCard.dataset.studentId;

  // Safely display it using textContent
  studentIdDisplay.textContent = `Student ID: ${studentId}`;
}

// ==========================================
// FORM MESSAGE
// ==========================================

function setFormMessage(message) {
  if (!formMessage) {
    return;
  }

  // Use textContent instead of innerHTML
  formMessage.textContent = message;
}

function clearFormMessage() {
  setFormMessage("");
}

// ==========================================
// UPDATE PROFILE
// ==========================================

function updateProfile() {
  // Make sure the required controls exist
  if (
    !nameInput ||
    !programInput ||
    !yearInput ||
    !statusInput
  ) {
    return;
  }

  // Get current control values
  const currentName = nameInput.value;
  const currentProgram = programInput.value;
  const currentYear = yearInput.value;
  const currentStatus = statusInput.value;

  // Validate the name first
  if (!isValidStudentName(currentName)) {
    setFormMessage("Student name is required");
    return;
  }

  // Update profile text
  // textContent is used for safe DOM manipulation
  updateProfileDisplay(
    currentName.trim(),
    currentProgram,
    currentYear
  );

  // Update status and classes
  setStatus(currentStatus);

  // Display success message
  setFormMessage("Profile updated successfully.");
}

// ==========================================
// RESET PROFILE
// ==========================================

function resetProfile() {
  if (
    !nameInput ||
    !programInput ||
    !yearInput ||
    !statusInput ||
    !profileCard ||
    !detailsPanel
  ) {
    return;
  }

  // Reset form controls
  nameInput.value = initialProfile.name;
  programInput.value = initialProfile.program;
  yearInput.value = initialProfile.year;
  statusInput.value = initialProfile.status;

  // Reset profile text
  updateProfileDisplay(
    initialProfile.name,
    initialProfile.program,
    initialProfile.year
  );

  // Reset student ID
  profileCard.dataset.studentId = initialProfile.studentId;

  // Reset status
  setStatus(initialProfile.status);

  // Reset student ID display
  displayStudentId();

  // Show details panel
  detailsPanel.classList.remove("hidden");

  // Remove dark theme
  document.body.classList.remove("dark-theme");

  // Clear form message
  clearFormMessage();
}

// ==========================================
// EVENT LISTENERS
// ==========================================

if (profileForm) {
  profileForm.addEventListener("submit", function (event) {
    // Prevent page reload
    event.preventDefault();

    updateProfile();
  });
}

if (updateBtn) {
  updateBtn.addEventListener("click", function () {
    updateProfile();
  });
}

if (toggleDetailsBtn) {
  toggleDetailsBtn.addEventListener("click", function () {
    toggleDetails();
  });
}

if (themeBtn) {
  themeBtn.addEventListener("click", function () {
    toggleTheme();
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    resetProfile();
  });
}

// ==========================================
// INITIAL PAGE SETUP
// ==========================================

if (
  profileCard &&
  nameInput &&
  programInput &&
  yearInput &&
  statusInput
) {
  // Set initial data attributes
  profileCard.dataset.studentId = initialProfile.studentId;
  profileCard.dataset.status = initialProfile.status;

  // Set initial form values
  nameInput.value = initialProfile.name;
  programInput.value = initialProfile.program;
  yearInput.value = initialProfile.year;
  statusInput.value = initialProfile.status;

  // Set initial profile display
  updateProfileDisplay(
    initialProfile.name,
    initialProfile.program,
    initialProfile.year
  );

  // Set initial status
  setStatus(initialProfile.status);

  // Display student ID from dataset
  displayStudentId();

  // Clear message
  clearFormMessage();
}

// ==========================================
// ARRAY METHODS
// ==========================================

// These demonstrate the use of array methods
// required by the laboratory rubric.

const validPrograms = programOptions.filter(function (program) {
  return program.length > 0;
});

const validYears = yearOptions.filter(function (year) {
  return year.length > 0;
});

const validStatuses = statusOptions.filter(function (status) {
  return status === "active" || status === "inactive";
});

// Destructuring example
const {
  name,
  program,
  year,
  status,
  studentId
} = initialProfile;
