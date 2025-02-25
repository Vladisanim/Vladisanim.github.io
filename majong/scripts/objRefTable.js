const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Sprite,
		C3.Plugins.Text,
		C3.Plugins.Touch,
		C3.Plugins.System.Cnds.OnLayoutStart,
		C3.Plugins.System.Acts.SetVar,
		C3.Plugins.Touch.Cnds.OnTouchObject,
		C3.Plugins.System.Acts.GoToLayout,
		C3.Plugins.System.Cnds.EveryTick,
		C3.Plugins.Sprite.Acts.SetAnimFrame,
		C3.Plugins.System.Cnds.IsGroupActive,
		C3.Plugins.System.Cnds.CompareVar,
		C3.Plugins.Sprite.Cnds.CompareInstanceVar,
		C3.Plugins.Sprite.Acts.SetInstanceVar,
		C3.Plugins.System.Acts.AddVar,
		C3.Plugins.Sprite.Cnds.PickTopBottom,
		C3.Plugins.Sprite.Acts.SetPosToObject,
		C3.Plugins.Sprite.Cnds.IsOverlapping,
		C3.Plugins.Sprite.Acts.SetPos,
		C3.Plugins.Sprite.Acts.Destroy,
		C3.Plugins.Text.Acts.SetText,
		C3.Plugins.System.Acts.Wait,
		C3.Plugins.Sprite.Cnds.OnDestroyed
	];
};
self.C3_JsPropNameTable = [
	{id: 0},
	{num: 0},
	{vibor: 0},
	{Mahjong_eg_Canton_carving: 0},
	{txt_1: 0},
	{txt_2: 0},
	{txt_3: 0},
	{Тач: 0},
	{txt_4: 0},
	{nakladka1: 0},
	{nakladka2: 0},
	{Текст: 0},
	{dele: 0},
	{Текст2: 0},
	{randomer: 0},
	{rezhim: 0},
	{played: 0},
	{tapped: 0},
	{plitka1id: 0},
	{plitka2id: 0},
	{plitka1num: 0},
	{plitka2num: 0},
	{delete: 0}
];

self.InstanceType = {
	Mahjong_eg_Canton_carving: class extends self.ISpriteInstance {},
	txt_1: class extends self.ITextInstance {},
	txt_2: class extends self.ITextInstance {},
	txt_3: class extends self.ITextInstance {},
	Тач: class extends self.IInstance {},
	txt_4: class extends self.ITextInstance {},
	nakladka1: class extends self.ISpriteInstance {},
	nakladka2: class extends self.ISpriteInstance {},
	Текст: class extends self.ITextInstance {},
	dele: class extends self.ISpriteInstance {},
	Текст2: class extends self.ITextInstance {}
}