document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.querySelector(".map-container");

  // Define locations first
const locations = {
  kitintale: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.863047964983!2d32.627708874791244!3d0.32129356306667145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbbd0a8a50f7d%3A0x7c1dc413ed60a4fd!2sClevers'%20Origin%20Junior%20School%20Kitintale!5e0!3m2!1sen!2sug!4v1720530000000",
  
  kasokoso: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.997358867763!2d32.63707017479119!3d0.30622526327228704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbbdc2451b71f%3A0x10eaa6270cccb2dd!2sClevers'%20Origin%20Junior%20School%20Kasokoso!5e0!3m2!1sen!2sug!4v1720531000000",
  
  maganjo: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.4405118038066!2d32.55948027479065!3d0.27047926371174095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177d8cd54ff247e5%3A0x7b82b4b8db2d6e1b!2sClevers'%20Origin%20Junior%20School%20Maganjo!5e0!3m2!1sen!2sug!4v1720532000000"
};


  // Create and insert iframe
  const mapIframe = document.createElement("iframe");
  mapIframe.setAttribute("allowfullscreen", "");
  mapIframe.setAttribute("loading", "lazy");
  mapIframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
  mapIframe.style.width = "100%";
  mapIframe.style.height = "450px";
  mapIframe.style.border = "none";

  // Insert iframe before setting src
  mapContainer.innerHTML = ""; // clear existing
  mapContainer.appendChild(mapIframe);

  // Zoom and visibility state
  let currentZoom = 100;
  let visible = true;

  // Set default map source (AFTER iframe is added to DOM)
  mapIframe.src = locations.kitintale;

  // Make functions globally accessible
 window.showMap = (place) => {
  const schoolCoordinates = {
    kitintale: { lat: 0.3212935, lng: 32.6277089 },
    kasokoso: { lat: 0.3062252, lng: 32.6370701 },
    maganjo: { lat: 0.2704792, lng: 32.5594802 }
  };

  if (!schoolCoordinates[place]) {
    alert("Unknown location: " + place);
    return;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const dest = schoolCoordinates[place];

        const directionsURL = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${dest.lat},${dest.lng}&travelmode=driving`;

        window.open(directionsURL, "_blank"); // Open in new tab
      },
      (error) => {
        alert("Unable to get your location. Make sure location access is allowed.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
};


  window.toggleMap = () => {
    visible = !visible;
    mapContainer.style.display = visible ? "block" : "none";
  };

  window.zoomIn = () => {
    currentZoom += 10;
    mapIframe.style.height = `${currentZoom}%`;
  };

  window.zoomOut = () => {
    currentZoom = Math.max(50, currentZoom - 10);
    mapIframe.style.height = `${currentZoom}%`;
  };
});
