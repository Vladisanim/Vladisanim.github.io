const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Touch,
		C3.Plugins.Sprite,
		C3.Plugins.Keyboard,
		C3.Plugins.TiledBg,
		C3.Behaviors.Physics,
		C3.Behaviors.Tween,
		C3.Plugins.Text,
		C3.Behaviors.Timer,
		C3.Behaviors.Flash,
		C3.Plugins.Eponesh_GameScore,
		C3.Behaviors.Anchor,
		C3.Plugins.Audio,
		C3.Plugins.Browser,
		C3.Plugins.System.Cnds.IsGroupActive,
		C3.Plugins.System.Cnds.OnLayoutStart,
		C3.Behaviors.Physics.Acts.SetWorldGravity,
		C3.Plugins.Touch.Cnds.OnTapGesture,
		C3.Behaviors.Tween.Cnds.IsPlaying,
		C3.Behaviors.Tween.Acts.TweenOneProperty,
		C3.Behaviors.Tween.Cnds.OnTweensFinished,
		C3.Plugins.System.Acts.SetGroupActive,
		C3.Plugins.System.Cnds.ForEach,
		C3.Behaviors.Physics.Acts.SetEnabled,
		C3.Plugins.Text.Acts.SetText,
		C3.Plugins.Text.Cnds.CompareOpacity,
		C3.Plugins.System.Acts.ResetGlobals,
		C3.Plugins.System.Acts.RestartLayout,
		C3.Plugins.Touch.Cnds.OnTouchEnd,
		C3.Plugins.Touch.Cnds.IsTouchingObject,
		C3.Plugins.Sprite.Cnds.IsAnimPlaying,
		C3.Plugins.System.Acts.CreateObject,
		C3.Plugins.Sprite.Exps.X,
		C3.Plugins.Sprite.Acts.SetAnim,
		C3.Plugins.Touch.Cnds.IsInTouch,
		C3.Plugins.Sprite.Acts.SetPos,
		C3.Plugins.System.Exps.max,
		C3.Plugins.System.Exps.min,
		C3.Plugins.Touch.Exps.X,
		C3.Plugins.System.Exps.layoutwidth,
		C3.Plugins.System.Exps.dt,
		C3.Plugins.Touch.Cnds.OnTouchStart,
		C3.Plugins.Sprite.Cnds.OnAnimFinished,
		C3.Behaviors.Timer.Cnds.IsTimerRunning,
		C3.Plugins.System.Acts.AddVar,
		C3.Behaviors.Timer.Acts.StopTimer,
		C3.Behaviors.Timer.Acts.StartTimer,
		C3.Plugins.Text.Acts.SetFontSize,
		C3.Plugins.Text.Exps.FaceSize,
		C3.Plugins.Text.Acts.SetFontColor,
		C3.Plugins.System.Exps.rgba255,
		C3.Plugins.Text.Acts.AddChild,
		C3.Plugins.Text.Acts.MoveToTop,
		C3.Plugins.System.Cnds.Else,
		C3.Plugins.System.Cnds.EvaluateExpression,
		C3.Plugins.Sprite.Exps.AnimationName,
		C3.Plugins.Sprite.Exps.TemplateName,
		C3.Plugins.Sprite.Cnds.IsBoolInstanceVarSet,
		C3.Plugins.System.Acts.SetVar,
		C3.Plugins.Sprite.Exps.Y,
		C3.Plugins.Sprite.Acts.SetBoolInstanceVar,
		C3.Behaviors.Tween.Acts.TweenValue,
		C3.Behaviors.Tween.Acts.TweenTwoProperties,
		C3.Plugins.System.Acts.WaitForPreviousActions,
		C3.Plugins.Sprite.Acts.Destroy,
		C3.Plugins.System.Exps.int,
		C3.Plugins.Sprite.Cnds.OnCollision,
		C3.Plugins.Sprite.Acts.SetEffectParam,
		C3.Behaviors.Tween.Exps.Value,
		C3.Plugins.Sprite.Exps.BBoxTop,
		C3.Plugins.System.Exps.random,
		C3.Plugins.System.Cnds.PickByEvaluate,
		C3.Plugins.Sprite.Exps.AnimationFrame,
		C3.Plugins.Sprite.Cnds.OnCreated,
		C3.Behaviors.Timer.Cnds.OnTimer,
		C3.Plugins.Text.Cnds.OnCreated,
		C3.Behaviors.Flash.Acts.Flash,
		C3.Plugins.Text.Exps.Y,
		C3.Plugins.System.Cnds.EveryTick,
		C3.Plugins.Eponesh_GameScore.Cnds.IsAdsRewardedPlaying,
		C3.Plugins.Eponesh_GameScore.Cnds.IsAdsFullscreenPlaying,
		C3.Plugins.Browser.Cnds.WindowHasFocus,
		C3.Plugins.Audio.Acts.Play,
		C3.Plugins.Audio.Cnds.IsTagPlaying,
		C3.Plugins.System.Cnds.Every,
		C3.Plugins.System.Acts.SaveState,
		C3.Plugins.System.Acts.LoadState,
		C3.Plugins.System.Cnds.OnLoadFailed,
		C3.Plugins.System.Acts.GoToLayout
	];
};
self.C3_JsPropNameTable = [
	{Touch: 0},
	{active: 0},
	{collided: 0},
	{fruitScore: 0},
	{Fruit: 0},
	{Keyboard: 0},
	{Physics: 0},
	{Limits: 0},
	{UIFruit: 0},
	{Tween: 0},
	{UINext: 0},
	{TextScore: 0},
	{UIBest: 0},
	{Cursor: 0},
	{Timer: 0},
	{GameManager: 0},
	{Flash: 0},
	{TextFruit: 0},
	{TextFruitShadow: 0},
	{Fader: 0},
	{TextTutorial: 0},
	{TextGameOver: 0},
	{Background: 0},
	{GamePush: 0},
	{ccc5c9be03f8412fb61c9a7f5188334a: 0},
	{Якорь: 0},
	{organicflatjunglebackground_: 0},
	{rightarrowred_: 0},
	{b0c072b66c96a30cf025460001c: 0},
	{milyisiniimonstrizplastilina: 0},
	{Аудио: 0},
	{Браузер: 0},
	{FruitFamily: 0},
	{BONUS_MULT: 0},
	{BONUS_TIME: 0},
	{nextFruit: 0},
	{bestFruit: 0},
	{score: 0},
	{x: 0},
	{y: 0},
	{points: 0},
	{meanX: 0},
	{meanY: 0},
	{randomNum: 0},
	{justSpawned: 0}
];

self.InstanceType = {
	Touch: class extends self.IInstance {},
	Fruit: class extends self.ISpriteInstance {},
	Keyboard: class extends self.IInstance {},
	Limits: class extends self.ITiledBackgroundInstance {},
	UIFruit: class extends self.ISpriteInstance {},
	UINext: class extends self.ISpriteInstance {},
	TextScore: class extends self.ITextInstance {},
	UIBest: class extends self.ISpriteInstance {},
	Cursor: class extends self.ISpriteInstance {},
	GameManager: class extends self.ISpriteInstance {},
	TextFruit: class extends self.ITextInstance {},
	TextFruitShadow: class extends self.ITextInstance {},
	Fader: class extends self.ITiledBackgroundInstance {},
	TextTutorial: class extends self.ITextInstance {},
	TextGameOver: class extends self.ITextInstance {},
	Background: class extends self.ISpriteInstance {},
	GamePush: class extends self.IInstance {},
	ccc5c9be03f8412fb61c9a7f5188334a: class extends self.ISpriteInstance {},
	organicflatjunglebackground_: class extends self.ISpriteInstance {},
	rightarrowred_: class extends self.ISpriteInstance {},
	b0c072b66c96a30cf025460001c: class extends self.ISpriteInstance {},
	milyisiniimonstrizplastilina: class extends self.ISpriteInstance {},
	Аудио: class extends self.IInstance {},
	Браузер: class extends self.IInstance {},
	FruitFamily: class extends self.ISpriteInstance {}
}