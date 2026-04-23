function checkLen(){var val = document.getElementById("len_input").value; if(val == 200){document.getElementById("len_feedback").innerText = "Perfekt! ⚽";} else {document.getElementById("len_feedback").innerText = "Leider falsch.";}}

function checkTime(){var val = document.getElementById("time_input").value.toLowerCase().replace(/\s/g,''); if(val === "1h30min" || val === "1stunde30minuten"){document.getElementById("time_feedback").innerText = "Krass gut! 🕒";} else {document.getElementById("time_feedback").innerText = "Versuch's nochmal. 90 = 60 + 30.";}}


function topicInit() {}
