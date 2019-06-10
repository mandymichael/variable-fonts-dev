
// Content Editable Demos

if (document.getElementById("demoText")) {
    var element = document.getElementById("demoText");

    element.addEventListener("input", function() {
        this.setAttribute("data-text", this.innerText);
    });
}

// Animation Toggle
if ( document.getElementById('toggle')) {
    document.getElementById('toggle').addEventListener('click', function () {
        if (document.body.classList.contains("no-animation")) {
            document.body.classList.remove("no-animation");
        } else {
            document.body.classList.add("no-animation");
        }
    });
}

// Homepage Effect with gem font
var homeHeadline = document.querySelector("h1");

const minAxisValue = 1;
const maxAxisValue = 30;

const minAxisValue2 = 30;
const maxAxisValue2 = 1;

const minEventValue = 0;
const maxEventValue = 1000;

homeHeadline.style.setProperty("--axis", 0);
homeHeadline.style.setProperty("--axis2", 0);


document.addEventListener('mousemove', function(e) {
  setPosition(e);
});

document.addEventListener('touchmove', function(e) {
  setPosition(e);
});

function setPosition(e) {
	fluidAxisVariation(minAxisValue, maxAxisValue, minEventValue, maxEventValue, e.pageX, "--axis", homeHeadline);
	fluidAxisVariation(minAxisValue2, maxAxisValue2, minEventValue, maxEventValue, e.pageY, "--axis2", homeHeadline);
}

// Variable Light Sensor Demo
function getLightSensor() {
    const minAxisValue = 300;
    const maxAxisValue = 20;

    const minEventValue = 20;
    const maxEventValue = 300;

    element.style.setProperty("--axis", 20);

    if ( 'AmbientLightSensor' in window ) {
      const sensor = new AmbientLightSensor();
      sensor.onreading = () => {
         fluidAxisVariation(minAxisValue, maxAxisValue, minEventValue, maxEventValue, sensor.illuminance, "--axis", element);
      };
      sensor.onerror = (event) => {
        console.log(event.error.name, event.error.message);
      };
      sensor.start();
    }
}

getLightSensor();



// Fluid Axis Variation
function fluidAxisVariation(minimumAxisValue, maximumAxisValue, minimumEventValue, maximumEventValue, eventValue, axisCustomPropertyName, element) {

	const minAxisValue = minimumAxisValue;
	const maxAxisValue = maximumAxisValue;
    const minEventValue = minimumEventValue;
	const maxEventValue = maximumEventValue;
	const currentEventValue = eventValue;

	const eventPercent = (currentEventValue - minEventValue) / (maxEventValue - minEventValue);
	const fontAxisScale = eventPercent * (minAxisValue - maxAxisValue) + maxAxisValue;

	const newAxisValue = currentEventValue > maxEventValue
	   ? minAxisValue
       : currentEventValue < minEventValue
   			? maxAxisValue
   			: fontAxisScale;


    element.style.setProperty(axisCustomPropertyName, newAxisValue);

}

