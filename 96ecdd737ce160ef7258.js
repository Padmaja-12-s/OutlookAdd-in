var msalConfig={auth:{clientId:"786c8795-e2b7-4d83-b5e3-7c3f9a34fd71",authority:"https://login.microsoftonline.com/059227af-dbff-4759-b2c3-8e7e7945fcdb",redirectUri:"https://padmaja-12-s.github.io/OutlookAdd-in/"}},msalInstance=new msal.PublicClientApplication(msalConfig),loginRequest={scopes:["https://ittridentsqa.sharepoint.com/.default"]};function getAccessToken(){return msalInstance.acquireTokenSilent(loginRequest).then((function(e){return e.accessToken})).catch((function(e){return msalInstance.loginPopup(loginRequest).then((function(e){return e.accessToken})).catch((function(e){console.error("Login failed: ",e)}))}))}function populateDropdown(){var e=document.getElementById("projectDropdown");getAccessToken().then((function(t){fetch("https://ittridentsqa.sharepoint.com/sites/TridentSQAM365InternalSolution/_api/web/lists/getbytitle('DynamicValues')/items",{method:"GET",headers:{Accept:"application/json;odata=verbose",Authorization:"Bearer "+t}}).then((function(e){return e.json()})).then((function(t){for(;e.options.length>1;)e.remove(1);t.d.results.forEach((function(t){var o=document.createElement("option");o.value=t.Title,o.text=t.Title,e.add(o)}))})).catch((function(e){return console.error("Error fetching SharePoint list: ",e)}))}))}function addProjectToSubject(){var e=document.getElementById("projectDropdown").value;e&&"Select a project"!==e?Office.context.mailbox.item.subject.setAsync(e,(function(e){e.status===Office.AsyncResultStatus.Succeeded?console.log("Subject updated successfully."):console.error(e.error.message)})):console.log("Please select a valid project.")}Office.onReady((function(e){e.host===Office.HostType.Outlook&&(populateDropdown(),document.getElementById("projectDropdown").onchange=addProjectToSubject)}));