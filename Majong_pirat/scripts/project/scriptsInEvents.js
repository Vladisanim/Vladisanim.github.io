


const scriptsInEvents = {

	async Eload_Event1_Act2(runtime, localVars)
	{
		runtime.globalVars.currentDate = new Date(runtime.GameScore.serverTime).toLocaleString('en', {
		  year: 'numeric',
		  month: '2-digit',
		  day: '2-digit',
		});
		console.log({  currentDate: runtime.globalVars.currentDate });
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

