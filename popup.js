document.getElementById('download').addEventListener('click', function() {
    var url = document.getElementById('url').value;
    console.log(url);
    if (url) {
        fetch(`http://localhost:3000/download?url=${encodeURIComponent(url)}`)
        .then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'video.mp4';
            document.body.appendChild(a); 
            a.click();    
            a.remove();
        });
    }
});

document.getElementById('clear').addEventListener('click', function() {
    document.getElementById('url').value = '';
});
