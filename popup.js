// Add an event listener to the 'download' button
document.getElementById('download').addEventListener('click', function() {
    
    // Get the value of the URL entered in the input field with id 'url'
    var url = document.getElementById('url').value;
    
    // Log the entered URL to the console for debugging purposes
    console.log(url);
    
    // Check if the URL is not empty
    if (url) {
        
        // Make a fetch request to the backend with the provided URL (using a local server in this case)
        // encodeURIComponent ensures that any special characters in the URL are properly encoded
        fetch(`http://localhost:3000/download?url=${encodeURIComponent(url)}`)
        
        // Once the response is received, convert it to a blob (binary data)
        .then(response => response.blob())
        
        // Once the blob is available, create a downloadable link
        .then(blob => {
            var url = window.URL.createObjectURL(blob);  // Create a URL for the blob object
            var a = document.createElement('a');         // Create an anchor (link) element
            a.href = url;                                // Set the href of the anchor to the blob URL
            a.download = 'video.mp4';                    // Set the download attribute with the default filename
            
            // Append the anchor to the document body (needed for clicking the link)
            document.body.appendChild(a); 
            
            // Simulate a click on the anchor to trigger the download
            a.click();    
            
            // Remove the anchor from the document after the download is triggered
            a.remove();
        });
    }
});

// Add an event listener to the 'clear' button
// This clears the input field when the button is clicked
document.getElementById('clear').addEventListener('click', function() {
    document.getElementById('url').value = '';  // Set the value of the URL input field to an empty string
});
