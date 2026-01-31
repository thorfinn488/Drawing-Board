const svg = document.getElementById('drawingCanvas');
let isDrawing = false;           
let currentPolyline = null;      
let pointsArray = [];            
function getSVGCoordinates(event) {
    const svgRect = svg.getBoundingClientRect();
    const x = event.clientX - svgRect.left;
    const y = event.clientY - svgRect.top;
    
    return { x, y };
}
svg.addEventListener('mousedown', function(event) {
    isDrawing = true;
    const coords = getSVGCoordinates(event);
    currentPolyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    currentPolyline.setAttribute('stroke', '#8b5cf6');
    currentPolyline.setAttribute('stroke-width', '3'); 
    currentPolyline.setAttribute('fill', 'none');
    currentPolyline.setAttribute('stroke-linecap', 'round'); 
    currentPolyline.setAttribute('stroke-linejoin', 'round'); 
    pointsArray = [`${coords.x},${coords.y}`];
    currentPolyline.setAttribute('points', pointsArray.join(' '));
    svg.appendChild(currentPolyline);
});
svg.addEventListener('mousemove', function(event) {
    if (!isDrawing) {
        return;
    }
    const coords = getSVGCoordinates(event);
    pointsArray.push(`${coords.x},${coords.y}`);
    currentPolyline.setAttribute('points', pointsArray.join(' '));
});
svg.addEventListener('mouseup', function(event) {
    isDrawing = false;
    pointsArray = [];
    currentPolyline = null;
});
svg.addEventListener('mouseleave', function(event) {
    isDrawing = false;
    pointsArray = [];
    currentPolyline = null;
});

const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
    svg.innerHTML = "";
});
