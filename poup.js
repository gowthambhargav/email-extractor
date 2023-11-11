let scrapeEmails = document.getElementById("scrapeEmails");
let showList = document.getElementById("emailList");
// Handler to receive emails from content

chrome.runtime.onMessage.addListener((re, sender, sr) => {
  // Get elails
  let emails = re.emails;
  if (emails == null || emails.length == 0) {
    // No emails
    let li = document.createElement("li");
    li.innerText = "No emails found";
    showList.appendChild(li);
  } else {
    // let li2 = document.createElement("li");
    // li2 = emails.innerText = emails.length;
    // showList.appendChild(li2);
    alert(emails);
    emails.forEach((email) => {
      let li = document.createElement("li");
      li.innerText = email;
      showList.appendChild(li);
    });
  }
});

scrapeEmails.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  //
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: scrapeEmailsFromPages,
  });
});

function scrapeEmailsFromPages() {
  const emailRegEx = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;
  let emails = document.body.innerHTML.match(emailRegEx);
  //   alert(emails);
  // Send emails to pupup
  chrome.runtime.sendMessage({ emails });
}
