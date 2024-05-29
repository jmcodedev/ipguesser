const __URL__ =
  "https://ip-geolocation-find-ip-location-and-ip-info.p.rapidapi.com/backend/ipinfo/?ip";
const __OPTIONS_ = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4ba3b2ea5bmsha2416e5462a8b46p15e65fjsn49ed8477b01f",
    "X-RapidAPI-Host":
      "ip-geolocation-find-ip-location-and-ip-info.p.rapidapi.com",
  },
};
const fetchInfo = (ip) => {
  return fetch(`${__URL__}=${ip}`, __OPTIONS_)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

const $ = (selector) => document.getElementById(selector);

const $form = $("form");
const $input = $("ip");
const $submit = $("submit");
const $results = $("results");

try {
  $form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const { value } = $input;
    if (!value) return;

    $submit.setAttribute("disabled", "");
    $submit.setAttribute("aria-busy", "true");
    $submit.setAttribute("aria-label", "Getting info from API...");

    await fetchInfo(value)
      .then((result) => {
        $results.innerHTML = JSON.stringify(result, null, 2);
      })
      .catch((error) => {
        $results.innerHTML = error;
      });

    $submit.removeAttribute("disabled");
    $submit.removeAttribute("aria-busy");
    $submit.removeAttribute("aria-label");
  });
} catch (error) {
  $results.innerHTML = error;
}
