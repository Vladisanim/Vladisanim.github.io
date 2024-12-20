const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Sprite,
		C3.Behaviors.Tween,
		C3.Plugins.Touch,
		C3.Behaviors.NoSave,
		C3.Plugins.Browser,
		C3.Plugins.LocalStorage,
		C3.Plugins.Arr,
		C3.Plugins.Keyboard,
		C3.Plugins.TiledBg,
		C3.Plugins.Dictionary,
		C3.Plugins.Spritefont2,
		C3.Behaviors.Pin,
		C3.Plugins.Audio,
		C3.Plugins.PlatformInfo,
		C3.Plugins.Eponesh_GameScore,
		C3.Plugins.Text,
		C3.Behaviors.lunarray_LiteTween,
		C3.Behaviors.Sin,
		C3.Behaviors.Bullet,
		C3.Plugins.System.Cnds.IsGroupActive,
		C3.Plugins.System.Cnds.OnLayoutStart,
		C3.Plugins.Sprite.Acts.Destroy,
		C3.Plugins.Sprite.Acts.SetVisible,
		C3.Plugins.Eponesh_GameScore.Acts.AdsShowFullscreen,
		C3.Plugins.System.Acts.CreateObject,
		C3.Plugins.System.Exps.layoutwidth,
		C3.Plugins.Sprite.Exps.Height,
		C3.Plugins.Sprite.Acts.SetInstanceVar,
		C3.Plugins.Sprite.Cnds.OnCreated,
		C3.Plugins.Sprite.Exps.X,
		C3.Plugins.Sprite.Exps.Y,
		C3.Plugins.Sprite.Cnds.PickByUID,
		C3.Plugins.Sprite.Exps.UID,
		C3.Plugins.Sprite.Cnds.CompareInstanceVar,
		C3.Plugins.System.Cnds.PickRandom,
		C3.Plugins.Sprite.Acts.SetAnimFrame,
		C3.Plugins.System.Exps.max,
		C3.Plugins.System.Exps.choose,
		C3.Plugins.System.Exps.min,
		C3.Plugins.Sprite.Exps.AnimationFrame,
		C3.Plugins.System.Cnds.Else,
		C3.Plugins.System.Cnds.CompareVar,
		C3.Plugins.System.Acts.SetVar,
		C3.Plugins.Sprite.Acts.SetAnim,
		C3.Plugins.Sprite.Acts.SetOpacity,
		C3.Behaviors.Tween.Acts.TweenOneProperty,
		C3.Behaviors.Tween.Acts.TweenTwoProperties,
		C3.Plugins.Sprite.Acts.MoveToBottom,
		C3.Plugins.Touch.Cnds.OnTouchStart,
		C3.Plugins.Touch.Cnds.IsTouchingObject,
		C3.Behaviors.Tween.Cnds.IsPlaying,
		C3.Plugins.Sprite.Acts.MoveToTop,
		C3.Plugins.Touch.Cnds.IsInTouch,
		C3.Plugins.Touch.Exps.X,
		C3.Plugins.Touch.Exps.Y,
		C3.Plugins.Sprite.Cnds.PickDistance,
		C3.Plugins.Sprite.Cnds.IsOverlapping,
		C3.Plugins.Sprite.Cnds.IsAnimPlaying,
		C3.Plugins.Sprite.Acts.SetPosToObject,
		C3.Plugins.Sprite.Cnds.PickInstVarHiLow,
		C3.Plugins.Sprite.Cnds.CompareFrame,
		C3.Plugins.Touch.Cnds.OnTouchEnd,
		C3.Plugins.System.Acts.Wait,
		C3.Plugins.Sprite.Acts.AddInstanceVar,
		C3.Plugins.Sprite.Exps.Width,
		C3.Behaviors.Tween.Cnds.OnTweensFinished,
		C3.Plugins.Sprite.Acts.SubInstanceVar,
		C3.Plugins.System.Acts.AddVar,
		C3.Plugins.LocalStorage.Acts.SetItem,
		C3.Plugins.Spritefont2.Acts.SetInstanceVar,
		C3.Plugins.Spritefont2.Acts.SetText,
		C3.Plugins.Spritefont2.Acts.SetDefaultColor,
		C3.Plugins.System.Exps.rgbex255,
		C3.Plugins.Spritefont2.Exps.Y,
		C3.Plugins.System.Cnds.ForEach,
		C3.Behaviors.Bullet.Cnds.IsEnabled,
		C3.Behaviors.Bullet.Acts.SetAngleOfMotion,
		C3.Plugins.System.Exps.random,
		C3.Behaviors.Bullet.Acts.SetSpeed,
		C3.Behaviors.Bullet.Acts.SetEnabled,
		C3.Behaviors.Tween.Acts.TweenValue,
		C3.Plugins.Sprite.Exps.Angle,
		C3.Plugins.Sprite.Acts.SetAngle,
		C3.Behaviors.Tween.Exps.Value,
		C3.Plugins.System.Cnds.TriggerOnce,
		C3.Plugins.System.Cnds.CompareTime,
		C3.Plugins.Eponesh_GameScore.Acts.AdsShowRewarded,
		C3.Plugins.Sprite.Acts.SetEffectEnabled,
		C3.Plugins.Arr.Acts.SetSize,
		C3.Plugins.Arr.Exps.AsJSON,
		C3.Plugins.System.Acts.SaveState,
		C3.Plugins.System.Cnds.OnSaveComplete,
		C3.Plugins.Arr.Acts.JSONLoad,
		C3.Plugins.Arr.Acts.SetX,
		C3.Plugins.System.Exps.savestatejson,
		C3.Plugins.System.Cnds.For,
		C3.Plugins.System.Exps.loopindex,
		C3.Plugins.Arr.Acts.Pop,
		C3.Plugins.Arr.Acts.Push,
		C3.Plugins.System.Acts.LoadStateJSON,
		C3.Plugins.Arr.Exps.At,
		C3.Plugins.Arr.Cnds.CompareX,
		C3.Plugins.System.Acts.SetLayerEffectParam,
		C3.Plugins.TiledBg.Acts.SetWidth,
		C3.Plugins.Spritefont2.Cnds.CompareInstanceVar,
		C3.Plugins.System.Exps.int,
		C3.Plugins.Spritefont2.Exps.Text,
		C3.Plugins.Sprite.Cnds.IsOutsideLayout,
		C3.Behaviors.Tween.Cnds.IsAnyPlaying,
		C3.Plugins.TiledBg.Acts.SetOpacity,
		C3.Plugins.TiledBg.Acts.SetPos,
		C3.Plugins.System.Exps.layoutheight,
		C3.Plugins.TiledBg.Acts.SetSize,
		C3.Plugins.System.Exps.viewportwidth,
		C3.Plugins.System.Exps.viewportheight,
		C3.Plugins.TiledBg.Acts.MoveToLayer,
		C3.Plugins.Sprite.Exps.ImagePointX,
		C3.Plugins.Sprite.Exps.ImagePointY,
		C3.Behaviors.Pin.Acts.PinByProperties,
		C3.Plugins.TiledBg.Acts.MoveToBottom,
		C3.Behaviors.Pin.Acts.Unpin,
		C3.Plugins.Spritefont2.Acts.SetPos,
		C3.Plugins.Spritefont2.Acts.SetScale,
		C3.Plugins.Spritefont2.Acts.AppendText,
		C3.Plugins.System.Exps.viewporttop,
		C3.Plugins.Sprite.Acts.SetEffectParam,
		C3.Plugins.System.Cnds.OnLoadComplete,
		C3.Behaviors.Tween.Acts.StopTweens,
		C3.Plugins.Spritefont2.Cnds.CompareText,
		C3.Plugins.System.Cnds.Compare,
		C3.Plugins.LocalStorage.Acts.CheckItemExists,
		C3.Plugins.LocalStorage.Cnds.OnItemExists,
		C3.Plugins.LocalStorage.Exps.ItemValue,
		C3.Plugins.LocalStorage.Cnds.OnItemMissing,
		C3.Plugins.LocalStorage.Cnds.OnItemRemoved,
		C3.Plugins.TiledBg.Cnds.IsOnLayer,
		C3.Plugins.Sprite.Exps.AnimationName,
		C3.Plugins.System.Exps.tokenat,
		C3.Plugins.System.Exps.tokencount,
		C3.Plugins.Sprite.Acts.SetY,
		C3.Plugins.System.Cnds.ForEachOrdered,
		C3.Plugins.System.Acts.ResetGlobals,
		C3.Plugins.System.Acts.RestartLayout,
		C3.Plugins.Audio.Acts.SetListenerObject,
		C3.Plugins.Audio.Acts.Play,
		C3.Plugins.Audio.Acts.PlayByName,
		C3.Plugins.TiledBg.Acts.MoveToTop,
		C3.Plugins.System.Cnds.EveryTick,
		C3.Plugins.Text.Acts.SetPosToObject,
		C3.Plugins.Text.Acts.SetText,
		C3.Plugins.Eponesh_GameScore.Cnds.IsAdsRewardedPlaying,
		C3.Plugins.Audio.Acts.SetSilent,
		C3.Plugins.Audio.Acts.Stop,
		C3.Plugins.Eponesh_GameScore.Cnds.IsAdsFullscreenPlaying,
		C3.Plugins.Eponesh_GameScore.Cnds.OnAdsRewardedClose,
		C3.Plugins.Eponesh_GameScore.Cnds.OnAdsRewardedReward,
		C3.Plugins.Audio.Cnds.IsTagPlaying,
		C3.Plugins.Touch.Cnds.OnTouchObject
	];
};
self.C3_JsPropNameTable = [
	{DeckUID: 0},
	{FirstX: 0},
	{FirstY: 0},
	{Place: 0},
	{TargetPlace: 0},
	{NumOnDeck: 0},
	{Del: 0},
	{Card: 0},
	{n: 0},
	{CardCount: 0},
	{Deck: 0},
	{GotCard: 0},
	{Tween: 0},
	{Discard: 0},
	{Touch: 0},
	{Hover: 0},
	{Unlocked: 0},
	{name: 0},
	{undoArray: 0},
	{curStep: 0},
	{maxSteps: 0},
	{LightValue: 0},
	{undoCount: 0},
	{NoSave: 0},
	{BtnUndo: 0},
	{Browser: 0},
	{LocalStorage: 0},
	{TempArray: 0},
	{Keyboard: 0},
	{DashLine: 0},
	{BtnLight: 0},
	{Dictionary: 0},
	{Light: 0},
	{Sound: 0},
	{Music: 0},
	{MusicIsPlaying: 0},
	{Main: 0},
	{Square: 0},
	{LevelBarBg: 0},
	{LevelBar: 0},
	{type: 0},
	{Pin: 0},
	{txt: 0},
	{LevelUp: 0},
	{BtnCool: 0},
	{Black: 0},
	{BtnMenu: 0},
	{Menu: 0},
	{BtnNewGame: 0},
	{BtnResume: 0},
	{BtnSound: 0},
	{BtnMusic: 0},
	{Audio: 0},
	{Tut: 0},
	{Failed: 0},
	{BtnRestart: 0},
	{Lock: 0},
	{PlatformInfo: 0},
	{GamePush: 0},
	{txt_sbros: 0},
	{txt2: 0},
	{LiteTween: 0},
	{Прикрепить: 0},
	{txt_failed_score: 0},
	{image: 0},
	{image2: 0},
	{image3: 0},
	{image4: 0},
	{image5: 0},
	{image6: 0},
	{image7: 0},
	{image8: 0},
	{image9: 0},
	{image10: 0},
	{image11: 0},
	{image12: 0},
	{image13: 0},
	{image14: 0},
	{image15: 0},
	{image16: 0},
	{Текст: 0},
	{Синусоида: 0},
	{decor_ad: 0},
	{TEST: 0},
	{TESTER: 0},
	{FDeck: 0},
	{Bullet: 0},
	{FCard: 0},
	{FButtons: 0},
	{FMenuButtons: 0},
	{SelectedCard: 0},
	{Spc: 0},
	{Level: 0},
	{Score: 0},
	{BestScore: 0},
	{TargetScore: 0},
	{PrevTargetScore: 0},
	{StartingTarget: 0},
	{TargetScoreAdd: 0},
	{Combo: 0},
	{LevelUpPopup: 0},
	{LightUnlockLevel: 0},
	{WildCardUnlockLevel: 0},
	{UndoUnlockLevel: 0},
	{LSList: 0},
	{Interstitial_ID: 0},
	{InterstitialVideo_ID: 0},
	{ShowVideoAd: 0},
	{AD_undo: 0},
	{deck1: 0},
	{deck2: 0},
	{deck3: 0},
	{deck4: 0},
	{vWildCardChance: 0},
	{vCantMerge: 0},
	{TargetUID: 0},
	{CardUID: 0},
	{vTime: 0},
	{v: 0},
	{vSound: 0},
	{vMusic: 0},
	{vLight: 0},
	{Name: 0},
	{vFoundSame: 0}
];

self.InstanceType = {
	Card: class extends self.ISpriteInstance {},
	Deck: class extends self.ISpriteInstance {},
	Discard: class extends self.ISpriteInstance {},
	Touch: class extends self.IInstance {},
	Hover: class extends self.ISpriteInstance {},
	BtnUndo: class extends self.ISpriteInstance {},
	Browser: class extends self.IInstance {},
	LocalStorage: class extends self.IInstance {},
	TempArray: class extends self.IArrayInstance {},
	Keyboard: class extends self.IInstance {},
	DashLine: class extends self.ITiledBackgroundInstance {},
	BtnLight: class extends self.ISpriteInstance {},
	Dictionary: class extends self.IDictionaryInstance {},
	Main: class extends self.ISpriteInstance {},
	Square: class extends self.ISpriteInstance {},
	LevelBarBg: class extends self.ITiledBackgroundInstance {},
	LevelBar: class extends self.ITiledBackgroundInstance {},
	txt: class extends self.ISpriteFontInstance {},
	LevelUp: class extends self.ISpriteInstance {},
	BtnCool: class extends self.ISpriteInstance {},
	Black: class extends self.ITiledBackgroundInstance {},
	BtnMenu: class extends self.ISpriteInstance {},
	Menu: class extends self.ISpriteInstance {},
	BtnNewGame: class extends self.ISpriteInstance {},
	BtnResume: class extends self.ISpriteInstance {},
	BtnSound: class extends self.ISpriteInstance {},
	BtnMusic: class extends self.ISpriteInstance {},
	Audio: class extends self.IInstance {},
	Tut: class extends self.ISpriteInstance {},
	Failed: class extends self.ISpriteInstance {},
	BtnRestart: class extends self.ISpriteInstance {},
	Lock: class extends self.ISpriteInstance {},
	PlatformInfo: class extends self.IInstance {},
	GamePush: class extends self.IInstance {},
	txt_sbros: class extends self.ITextInstance {},
	txt2: class extends self.ISpriteFontInstance {},
	txt_failed_score: class extends self.ITextInstance {},
	image: class extends self.ISpriteInstance {},
	image2: class extends self.ISpriteInstance {},
	image3: class extends self.ISpriteInstance {},
	image4: class extends self.ISpriteInstance {},
	image5: class extends self.ISpriteInstance {},
	image6: class extends self.ISpriteInstance {},
	image7: class extends self.ISpriteInstance {},
	image8: class extends self.ISpriteInstance {},
	image9: class extends self.ISpriteInstance {},
	image10: class extends self.ISpriteInstance {},
	image11: class extends self.ISpriteInstance {},
	image12: class extends self.ISpriteInstance {},
	image13: class extends self.ISpriteInstance {},
	image14: class extends self.ISpriteInstance {},
	image15: class extends self.ISpriteInstance {},
	image16: class extends self.ISpriteInstance {},
	Текст: class extends self.ITextInstance {},
	decor_ad: class extends self.ISpriteInstance {},
	TEST: class extends self.ITextInstance {},
	TESTER: class extends self.ISpriteInstance {},
	FDeck: class extends self.ISpriteInstance {},
	FCard: class extends self.ISpriteInstance {},
	FButtons: class extends self.ISpriteInstance {},
	FMenuButtons: class extends self.ISpriteInstance {}
}