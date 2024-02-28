document.addEventListener('DOMContentLoaded', function () {
  var newUrl = window.location.href.split('?')[0];
  history.pushState({ path: newUrl }, '', newUrl);
  fetch(newUrl)
    .then(response => { return response.text() })
    .then(data => {
      var body = document.querySelector('body');
      body.innerHTML = data
    }).then(() => {
      window.addEventListener("keydown", function (e) {
        console.log(e.key);
      });
      console.clear();
    })
    .catch();
});
