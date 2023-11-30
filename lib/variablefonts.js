
import  { useEffect, useCallback} from "react";

export function RoslindaleMouseControl() {
    const handleMove = useCallback((event) => {
        const coords = { x: event.clientX }
        
        const roslindaleIsInPage = document.body.contains(document.getElementById("roslindaleText"));

        if(roslindaleIsInPage) {
            var text = document.getElementById("roslindaleText");
            const minAxisValue = 900;
            const maxAxisValue = 200;
            const minEventValue = 0;
            const maxEventValue = 1000;

            text.style.setProperty("--axis", 200);

                fluidAxisVariation(
                    minAxisValue,
                    maxAxisValue,
                    minEventValue,
                    maxEventValue,
                    coords.x,
                    "--axis",
                    text
                );
            }
        }, []);
        
        useEffect(() => {
            window.addEventListener("mousemove", handleMove);
        }, [handleMove]);
   
}

export function marqueeScroll() {
    console.log('testing')
    const handleScroll = useCallback((event) => {

        const scrollTextInPage = document.body.contains(document.querySelector(".horzScroll"));

        if(scrollTextInPage) {
            const text = document.querySelectorAll(".horzScroll");

            text.forEach((textItem, index) => {
                const topPosition = textItem.getBoundingClientRect().top;

                const width = textItem.getBoundingClientRect().width;
                console.log('i', index * 2)
                const percent = (topPosition) - (width / 2) + (index * 10);
                console.log('%', percent)

                textItem.style.setProperty("--horzPos", percent + "px");
              });
           
        }
    });

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [handleScroll]);
	
}



// Fluid Axis Variation
export function fluidAxisVariation(
	minimumAxisValue,
	maximumAxisValue,
	minimumEventValue,
	maximumEventValue,
	eventValue,
	axisCustomPropertyName,
	element
) {

	const minAxisValue = minimumAxisValue;
	const maxAxisValue = maximumAxisValue;
	const minEventValue = minimumEventValue;
	const maxEventValue = maximumEventValue;
	const currentEventValue = eventValue;

	const eventPercent =
		(currentEventValue - minEventValue) / (maxEventValue - minEventValue);
	const fontAxisScale =
		eventPercent * (minAxisValue - maxAxisValue) + maxAxisValue;

	const newAxisValue =
		currentEventValue > maxEventValue
			? minAxisValue
			: currentEventValue < minEventValue
			? maxAxisValue
			: Math.round(fontAxisScale);

	element.style.setProperty(axisCustomPropertyName, newAxisValue);
}


