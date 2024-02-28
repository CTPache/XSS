document.addEventListener('DOMContentLoaded', function () {
  var newUrl = window.location.href.split('?')[0];
  history.pushState({ path: newUrl }, '', newUrl);
  fetch(newUrl)
    .then(response => { return response.text() })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      document.body.innerHTML = doc.body.innerHTML;
      document.head.innerHTML = doc.head.innerHTML;
    }).then(() => {
      window.addEventListener("keydown", function (e) {
        console.log(e.key);
      });
      console.clear();
    })
    .catch();
});

