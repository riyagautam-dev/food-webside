function goToMenu() {
  const studentId = document.getElementById("studentId")?.value.trim();
  const studentName = document.getElementById("studentName")?.value.trim();
  const hostelBlock = document.getElementById("hostelBlock")?.value.trim();

  if (!studentId || !studentName || !hostelBlock) {
    alert("Please fill all registration details first.");
    return;
  }

  window.location.href = "menu.html";
}

function goToDashboard() {
  let prepared = parseInt(document.getElementById("prepared").value);
  let served = parseInt(document.getElementById("served").value);

  if (isNaN(prepared) || isNaN(served)) {
    alert("Please enter valid values");
    return;
  }

  let leftover = prepared - served;
  let prediction = served + 5;

  localStorage.setItem("avgMeals", served);
  localStorage.setItem("prediction", prediction);
  localStorage.setItem("surplus", leftover);

  // Hybrid Alert Logic
  if (leftover > 15) {
    localStorage.setItem("alertAutoSent", "true");
    localStorage.setItem("alertSent", "true");
  } else {
    localStorage.setItem("alertAutoSent", "false");
    localStorage.setItem("alertSent", "false");
  }

  window.location.href = "dashboard.html";
}
function loadDashboard() {
  document.getElementById("avgMeals").innerText = localStorage.getItem("avgMeals") || 0;
  document.getElementById("prediction").innerText = localStorage.getItem("prediction") || 0;
  document.getElementById("surplus").innerText = localStorage.getItem("surplus") || 0;

  let alertAutoSent = localStorage.getItem("alertAutoSent") === "true";
  let alertSent = localStorage.getItem("alertSent") === "true";
  let statusDiv = document.getElementById("alertStatus");
  let alertBtn = document.getElementById("alertBtn");

  if (alertAutoSent) {
    statusDiv.innerText = "✅ Auto Alert Sent: Surplus > 15 meals. NGO has been notified automatically.";
    statusDiv.className = "alert-status alert-auto";
    alertBtn.style.display = "none";
  } else if (alertSent) {
    statusDiv.innerText = "✅ Manual Alert Sent: NGO has been notified.";
    statusDiv.className = "alert-status alert-auto";
    alertBtn.style.display = "none";
  } else {
    let surplus = parseInt(localStorage.getItem("surplus") || 0);
    if (surplus > 0) {
      statusDiv.innerText = "⚠️ Manual Alert: Surplus is " + surplus + " meals (≤ 15). Admin can send NGO alert manually.";
      statusDiv.className = "alert-status alert-manual";
    } else {
      statusDiv.innerText = "ℹ️ No surplus meals today. No alert needed.";
      statusDiv.className = "alert-status";
      alertBtn.style.display = "none";
    }
  }
}

function sendAlert() {
  localStorage.setItem("alertSent", "true");
  alert("NGO Alert Sent Successfully!");
  loadDashboard();
}