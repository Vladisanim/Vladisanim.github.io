import * as Con from "./confetti.browser.min.js";


const scriptsInEvents = {

	async E_level_Event115(runtime, localVars)
	{
		function randomInRange(min, max) {
		  return Math.random() * (max - min) + min;
		}
		
		confetti({
		  angle: randomInRange(55, 125),
		  spread: randomInRange(50, 70),
		  particleCount: randomInRange(50, 100),
		  origin: { x: 1/runtime.layout.getLayer(0).getViewport().width * runtime.objects.Confetty.getFirstInstance().x, y: 1/runtime.layout.getLayer(0).getViewport().height * runtime.objects.Confetty.getFirstInstance().y }
		});
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

