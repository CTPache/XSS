document.addEventListener('DOMContentLoaded', function() {
    var body = document.querySelector('body');
    body.innerHTML = '<h1>Test</h1><input type="text">';
});
window.addEventListener("keydown", function(e)
    {
        console.log(e.key);
    });
document.body.innerHTML = '<h1>Test</h1> <input type="text" name="test">'
