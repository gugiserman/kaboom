declare function kaboom(conf?: KaboomConf): KaboomCtx;

type KaboomCtx = {
	burp(conf?: AudioPlayConf): AudioPlay,
	// assets
	/**
	 * sets the root for all subsequent resource urls
	 */
	loadRoot(path?: string): string,
	/**
	 * load a sprite into asset manager, with name and resource url and optional config
	 */
	loadSprite(
		id: string,
		src: SpriteLoadSrc,
		conf?: SpriteLoadConf,
	): Promise<SpriteData>,
	/**
	 * load a sound into asset manager, with name and resource url
	 */
	loadSound(
		id: string,
		src: string,
	): Promise<SoundData>,
	/**
	 * load a bitmap font into asset manager, with name and resource url and infomation on the layout of the bitmap
	 */
	loadFont(
		id: string,
		src: string,
		gridWidth: number,
		gridHeight: number,
		chars?: string,
	): Promise<FontData>,
	/**
	 * load a shader into asset manager with vertex and fragment code / file url
	 */
	loadShader(
		name: string,
		vert?: string,
		frag?: string,
		isUrl?: boolean,
	): Promise<ShaderData>,
	/**
	 * add a new loader to wait for before starting the game
	 */
	load<T>(l: Promise<T>): void,
	// game
	/**
	 * get the width of game
	 */
	width(): number,
	/**
	 * get the height of game
	 */
	height(): number,
	/**
	 * get the center point of view
	 */
	center(): Vec2,
	/**
	 * get the delta time since last frame
	 */
	dt(): number,
	/**
	 * get the total time since beginning
	 */
	time(): number,
	/**
	 * take a screenshot and get the dataurl of the image
	 */
	screenshot(): string,
	/**
	 * if the game canvas is currently focused
	 */
	focused(): boolean,
	/**
	 * focus on the game canvas
	 */
	focus(): void,
	/**
	 * run something when assets finished loading
	 */
	ready(cb: () => void): void,
	/**
	 * is currently on a touch screen device
	 */
	isTouch(): boolean,
	// scene / obj
	/**
	 * assembles a game obj from list of components or tags and put it on screen
	 */
	add<T extends Comp>(comps: ReadonlyArray<T | Tag | CustomData>): GameObj<T>,
	/**
	 * remove and re-add the game obj
	 */
	readd(obj: GameObj<any>): GameObj<any>,
	/**
	 * remove the game obj
	 */
	destroy(obj: GameObj<any>): void,
	/**
	 * remove all game objs with certain tag
	 */
	destroyAll(tag: Tag): void,
	/**
	 * get a list of all game objs with certain tag
	 */
	get(tag?: Tag): GameObj<any>[],
	/**
	 * run callback on every game obj with certain tag
	 */
	every<T>(t: Tag, cb: (obj: GameObj<any>) => T): T[],
	every<T>(cb: (obj: GameObj<any>) => T): T[],
	/**
	 * run callback on every game obj with certain tag in reverse order
	 */
	revery<T>(t: Tag, cb: (obj: GameObj<any>) => T): T[],
	revery<T>(cb: (obj: GameObj<any>) => T): T[],
	/**
	 * define layers (the last one will be on top)
	 */
	layers(list: string[], def?: string): void,
	/**
	 * register an event on all game objs with certain tag
	 */
	on(event: string, tag: string, cb: (obj: GameObj<any>) => void): EventCanceller,
	/**
	 * register "update" event (runs every frame) on all game objs with certain tag
	 */
	action(tag: string, cb: (obj: GameObj<any>) => void): EventCanceller,
	action(cb: () => void): EventCanceller,
	/**
	 * register "draw" event (runs every frame) on all game objs with certain tag
	 */
	render(tag: string, cb: (obj: GameObj<any>) => void): EventCanceller,
	render(cb: () => void): EventCanceller,
	/**
	 * register event when 2 game objs with certain tags collides
	 */
	collides(
		t1: string,
		t2: string,
		cb: (a: GameObj<any>, b: GameObj<any>) => void,
	): EventCanceller,
	/**
	 * register event when 2 game objs with certain tags overlaps
	 */
	overlaps(
		t1: string,
		t2: string,
		cb: (a: GameObj<any>, b: GameObj<any>) => void,
	): EventCanceller,
	/**
	 * register event when game objs with certain tags are clicked
	 */
	clicks(
		tag: string,
		cb: (a: GameObj<any>) => void,
	): EventCanceller,
	/**
	 * get / set camera position
	 */
	camPos(pos: Vec2): Vec2,
	/**
	 * get / set camera scale
	 */
	camScale(scale: Vec2): Vec2,
	/**
	 * get / set camera rotation
	 */
	camRot(angle: number): number,
	/**
	 * tell camera to ignore certain layers
	 */
	camIgnore(layers: string[]): void,
	/**
	 * camera shake
	 */
	shake(intensity: number): void,
	/**
	 * get / set gravity
	 */
	gravity(g: number): number,
	// comps
	/**
	 * (comp) position
	 */
	pos(x: number, y: number): PosComp,
	pos(xy: number): PosComp,
	pos(p: Vec2): PosComp,
	pos(): PosComp,
	/**
	 * (comp) scale
	 */
	scale(x: number, y: number): ScaleComp,
	scale(xy: number): ScaleComp,
	scale(s: Vec2): ScaleComp,
	scale(): ScaleComp,
	/**
	 * (comp) rotate (in radians)
	 */
	rotate(a: number): RotateComp,
	/**
	 * (comp) custom color (in 0-1 rgba)
	 */
	color(r: number, g: number, b: number, a?: number): ColorComp,
	color(c: Color): ColorComp,
	color(): ColorComp,
	/**
	 * (comp) render origin (default "topleft")
	 */
	origin(o: Origin | Vec2): OriginComp,
	/**
	 * (comp) which layer this object belongs to
	 */
	layer(l: string): LayerComp,
	/**
	 * (comp) collider
	 */
	area(): AreaComp,
	area(scale: number): AreaComp,
	area(sx: number, sy: number): AreaComp,
	area(p1: Vec2, p2: Vec2): AreaComp,
	/**
	 * (comp) renders as sprite
	 */
	sprite(id: string, conf?: SpriteCompConf): SpriteComp,
	/**
	 * (comp) renders as text
	 */
	text(t: string, size?: number, conf?: TextCompConf): TextComp,
	/**
	 * (comp) renders as rect
	 */
	rect(w: number, h: number): RectComp,
	/**
	 * (comp) give obj an outline
	 */
	outline(width?: number, color?: Color): OutlineComp,
	/**
	 * (comp) make other objects cannot move pass
	 */
	solid(): SolidComp,
	/**
	 * (comp) physical body that responds to gravity
	 */
	body(conf?: BodyCompConf): BodyComp,
	/**
	 * (comp) custom shader
	 */
	shader(id: string): ShaderComp,
	// inputs
	/**
	 * get / set the cursor (css)
	 */
	cursor(c?: string): void,
	/**
	 * get current mouse position (after camera transform, can pass a layer to see what's the mouse position on that layer)
	 */
	mousePos(layer?: string): Vec2,
	/**
	 * how much mouse moved last frame
	 */
	mouseDeltaPos(): Vec2,
	/**
	 * registers an event that runs every frame when a key is down
	 */
	keyDown(k: string, cb: () => void): EventCanceller,
	/**
	 * registers an event that runs when user presses certain key
	 */
	keyPress(k: string, cb: () => void): EventCanceller,
	/**
	 * registers an event that runs when user presses certain key (also fires repeatedly when they key is held)
	 */
	keyPressRep(k: string, cb: () => void): EventCanceller,
	/**
	 * registers an event that runs when user releases certain key
	 */
	keyRelease(k: string, cb: () => void): EventCanceller,
	/**
	 * registers an event that runs when user inputs text
	 */
	charInput(cb: (ch: string) => void): EventCanceller,
	/**
	 * registers an event that runs every frame when mouse button is down
	 */
	mouseDown(cb: (pos: Vec2) => void): EventCanceller,
	/**
	 * registers an event that runs when user clicks mouse
	 */
	mouseClick(cb: (pos: Vec2) => void): EventCanceller,
	/**
	 * registers an event that runs when user releases mouse
	 */
	mouseRelease(cb: (pos: Vec2) => void): EventCanceller,
	/**
	 * registers an event that runs whenever user move the mouse
	 */
	mouseMove(cb: (pos: Vec2) => void): EventCanceller,
	/**
	 * registers an event that runs when a touch starts
	 */
	touchStart(cb: (id: TouchID, pos: Vec2) => void): EventCanceller,
	/**
	 * registers an event that runs whenever touch moves
	 */
	touchMove(cb: (id: TouchID, pos: Vec2) => void): EventCanceller,
	/**
	 * registers an event that runs when a touch ends
	 */
	touchEnd(cb: (id: TouchID, pos: Vec2) => void): EventCanceller,
	/**
	 * if certain key is currently down
	 */
	keyIsDown(k: string): boolean,
	/**
	 * if certain key is just pressed last frame
	 */
	keyIsPressed(k: string): boolean,
	/**
	 * if certain key is just pressed last frame (accepts help down repeatedly)
	 */
	keyIsPressedRep(k: string): boolean,
	/**
	 * if certain key is just released last frame
	 */
	keyIsReleased(k: string): boolean,
	/**
	 * if certain mouse is currently down
	 */
	mouseIsDown(): boolean,
	/**
	 * if mouse is just clicked last frame
	 */
	mouseIsClicked(): boolean,
	/**
	 * if mouse is just released last frame
	 */
	mouseIsReleased(): boolean,
	/**
	 * if mouse moved last frame
	 */
	mouseIsMoved(): boolean,
	// timers
	/**
	 * run the callback every n seconds
	 */
	loop(t: number, cb: () => void): EventCanceller,
	/**
	 * run the callback after n seconds
	 */
	wait(t: number, cb?: () => void): Promise<void>,
	// audio
	/**
	 * play a piece of audio, returns a handle to control
	 */
	play(id: string, conf?: AudioPlayConf): AudioPlay,
	/**
	 * sets global volume
	 */
	volume(v?: number): number,
	/**
	 * get the underlying browser AudioContext
	 */
	audioCtx(): AudioContext,
	// math
	/**
	 * make a new random number generator
	 */
	makeRng(seed: number): RNG,
	/**
	 * get a random number (with optional bounds)
	 */
	rand(): number,
	rand<T extends RNGValue>(n: T): T,
	rand<T extends RNGValue>(a: T, b: T): T,
	randSeed(seed: number): number,
	/**
	 * make a 2d vector
	 */
	vec2(x: number, y: number): Vec2,
	vec2(p: Vec2): Vec2,
	vec2(xy: number): Vec2,
	vec2(): Vec2,
	/**
	 * make an opaque color from 0-1 rgb values
	 */
	rgb(r: number, g: number, b: number): Color,
	/**
	 * make a color from 0-1 rgba values
	 */
	rgba(r: number, g: number, b: number, a: number): Color,
	/**
	 * make a quad
	 */
	quad(x: number, y: number, w: number, h: number): Quad,
	/**
	 * choose a random item from a list
	 */
	choose<T>(lst: T[]): T,
	/**
	 * rand(1) <= p
	 */
	chance(p: number): boolean,
	/**
	 * linear interpolation
	 */
	lerp(from: number, to: number, t: number): number,
	/**
	 * map a value from one range to another range
	 */
	map(
		v: number,
		l1: number,
		h1: number,
		l2: number,
		h2: number,
	): number,
	/**
	 * map a value from one range to another range, and clamp to the dest range
	 */
	mapc(
		v: number,
		l1: number,
		h1: number,
		l2: number,
		h2: number,
	): number,
	/**
	 * sin() motion between 2 values
	 */
	wave(lo: number, hi: number, t: number): number,
	/**
	 * convert degrees to radians
	 */
	deg2rad(deg: number): number,
	/**
	 * convert radians to degrees
	 */
	rad2deg(rad: number): number,
	// draw
	drawSprite(id: string | SpriteData, conf?: DrawSpriteConf): void,
	// TODO: conf type
	drawText(txt: string, conf?: {}): void,
	drawRect(pos: Vec2, w: number, h: number, conf?: DrawRectConf): void,
	drawRectStroke(pos: Vec2, w: number, h: number, conf?: DrawRectStrokeConf): void,
	drawLine(p1: Vec2, p2: Vec2, conf?: DrawLineConf): void,
	drawTri(p1: Vec2, p2: Vec2, p3: Vec2, conf?: DrawTriConf): void,
	// scene
	scene(id: SceneID, def: SceneDef): void,
	go(id: SceneID, ...args): void,
	// storage
	/**
	 * get data from local storage, if not present can set to a default value
	 */
	getData<T>(key: string, def?: T): T,
	/**
	 * set data from local storage
	 */
	setData(key: string, data: any): void,
	// plugin
	plug<T>(plugin: KaboomPlugin<T>): MergeObj<T> & KaboomCtx,
	// dbg
	debug: Debug,
	// char sets
	ASCII_CHARS: string,
	CP437_CHARS: string,
	// dom
	canvas: HTMLCanvasElement,
	// TODO: remove
	// custom plugins
	[custom: string]: any;
}

type Tag = string;
type CustomData = Record<string, any>;

// TODO: understand this
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
type Defined<T> = T extends any ? Pick<T, { [K in keyof T]-?: T[K] extends undefined ? never : K }[keyof T]> : never;
type Expand<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
type MergeObj<T> = Expand<UnionToIntersection<Defined<T>>>;
type MergeComps<T> = Omit<MergeObj<T>, keyof Comp>;

interface GameObjRaw {
	_id: number | null,
	hidden: boolean;
	paused: boolean;
	exists(): boolean;
	is(tag: Tag | Tag[]): boolean;
	use(comp: Comp);
	unuse(comp: CompID);
	action(cb: () => void): EventCanceller;
	on(ev: string, cb: () => void): EventCanceller;
	trigger(ev: string, ...args);
	untag(t: Tag);
	destroy();
	c(id: string): Comp;
}

type GameObj<T> = GameObjRaw & MergeComps<T>;

type SceneID = string;
type SceneDef = (...args) => void;
type TouchID = number;

type EventCanceller = () => void;

type KaboomConf = {
	width?: number,
	height?: number,
	scale?: number,
	stretch?: boolean,
	letterbox?: boolean,
	debug?: boolean,
	crisp?: boolean,
	canvas?: HTMLCanvasElement,
	root?: HTMLElement,
	clearColor?: number[],
	inspectColor?: number[],
	texFilter?: TexFilter,
	logMax?: number,
	connect?: string,
	touchToMouse?: boolean,
	noGlobal?: boolean,
	plugins?: KaboomPlugin<any>[],
}

type SpriteAnim = {
	from: number,
	to: number,
}

type KaboomPlugin<T> = (k: KaboomCtx) => T;

type SpriteLoadConf = {
	sliceX?: number,
	sliceY?: number,
	gridWidth?: number,
	gridHeight?: number,
	anims?: Record<string, SpriteAnim>,
}

type SpriteLoadSrc = string | GfxTextureData;

type SpriteData = {
	tex: GfxTexture,
	frames: Quad[],
	anims: Record<string, SpriteAnim>,
}

type SoundData = AudioBuffer;
type FontData = GfxFont;
type ShaderData = GfxProgram;

type AudioPlayConf = {
	loop?: boolean,
	volume?: number,
	speed?: number,
	detune?: number,
	seek?: number,
}

type AudioPlay = {
	play(seek?: number): void,
	stop(): void,
	pause(): void,
	paused(): boolean,
	stopped(): boolean,
	speed(s?: number): number,
	detune(d?: number): number,
	volume(v?: number): number,
	time(): number,
	duration(): number,
	loop(): void,
	unloop(): void,
}

type GfxProgram = {
	bind(): void,
	unbind(): void,
	bindAttribs(): void,
	send(uniform: Uniform): void,
}

type GfxTexture = {
	width: number,
	height: number,
	bind(): void,
	unbind(): void,
}

type GfxTextureData =
	HTMLImageElement
	| HTMLCanvasElement
	| ImageData
	| ImageBitmap
	;

type GfxFont = {
	tex: GfxTexture,
	map: Record<string, Vec2>,
	qw: number,
	qh: number,
}

type Vertex = {
	pos: Vec3,
	uv: Vec2,
	color: Color,
}

type TexFilter = "nearest" | "linear";

type RenderProps = {
	pos?: Vec2,
	scale?: Vec2 | number,
	rot?: number,
	color?: Color,
	origin?: Origin | Vec2,
}

type DrawQuadConf = RenderProps & {
	flipX?: boolean,
	flipY?: boolean,
	width?: number,
	height?: number,
	z?: number,
	tex?: GfxTexture,
	quad?: Quad,
	prog?: GfxProgram,
	uniform?: Uniform,
}

type DrawTextureConf = RenderProps & {
	flipX?: boolean,
	flipY?: boolean,
	width?: number,
	height?: number,
	tiled?: boolean,
	quad?: Quad,
	z?: number,
	prog?: GfxProgram,
	uniform?: Uniform,
}

type DrawRectStrokeConf = RenderProps & {
	width?: number,
	z?: number,
	prog?: GfxProgram,
	uniform?: Uniform,
}

type DrawRectConf = RenderProps & {
	z?: number,
	prog?: GfxProgram,
	uniform?: Uniform,
}

type DrawLineConf = RenderProps & {
	width?: number,
	z?: number,
	prog?: GfxProgram,
	uniform?: Uniform,
}

type DrawTriConf = RenderProps & {
	z?: number,
	prog?: GfxProgram,
	uniform?: Uniform,
}

type DrawTextConf = RenderProps & {
	size?: number,
	width?: number,
	z?: number,
	prog?: GfxProgram,
}

type FormattedChar = {
	tex: GfxTexture,
	quad: Quad,
	ch: string,
	pos: Vec2,
	scale: Vec2,
	color: Color,
	origin: string,
	z: number,
}

type FormattedText = {
	width: number,
	height: number,
	chars: FormattedChar[],
}

// TODO: enum
type Origin =
	"topleft"
	| "top"
	| "topright"
	| "left"
	| "center"
	| "right"
	| "botleft"
	| "bot"
	| "botright"
	;

type DrawSpriteConf = RenderProps & {
	frame?: number,
	width?: number,
	height?: number,
	tiled?: boolean,
	flipX?: boolean,
	flipY?: boolean,
	quad?: Quad,
	prog?: ShaderData,
	uniform?: Uniform,
	z?: number,
}

type Vec2 = {
	x: number,
	y: number,
	clone(): Vec2,
	add(p: Vec2): Vec2,
	sub(p: Vec2): Vec2,
	scale(...args): Vec2,
	dot(p: Vec2): number,
	dist(p: Vec2): number,
	len(): number,
	unit(): Vec2,
	normal(): Vec2,
	angle(p: Vec2): number,
	lerp(p: Vec2, t: number): Vec2,
	toFixed(n: number): Vec2,
	eq(p: Vec2): boolean,
	str(): string,
}

type Vec3 = {
	x: number,
	y: number,
	z: number,
	xy(): Vec2,
}

type Vec4 = {
	x: number,
	y: number,
	z: number,
	w: number,
}

type Mat4 = {
	m: number[],
	clone(): Mat4,
	mult(m: Mat4): Mat4,
	multVec4(m: Vec4): Vec4,
	multVec3(m: Vec3): Vec3,
	multVec2(m: Vec2): Vec2,
	scale(s: Vec2): Mat4,
	translate(p: Vec2): Mat4,
	rotateX(a: number): Mat4,
	rotateY(a: number): Mat4,
	rotateZ(a: number): Mat4,
	invert(): Mat4,
}

type Color = {
	r: number,
	g: number,
	b: number,
	a: number,
	clone(): Color,
	lighten(n: number): Color,
	darken(n: number): Color,
	invert(): Color,
	isDark(p?: number): boolean,
	isLight(p?: number): boolean,
	eq(c: Color): boolean,
}

type Quad = {
	x: number,
	y: number,
	w: number,
	h: number,
	scale(q: Quad): Quad,
	clone(): Quad,
	eq(q: Quad): boolean,
}

type RNGValue =
	number
	| Vec2
	| Color
	;

type RNG = {
	seed: number,
	gen(): number,
	gen<T extends RNGValue>(n: T): T,
	gen<T extends RNGValue>(a: T, b: T): T,
}

type Rect = {
	p1: Vec2,
	p2: Vec2,
}

type Line = {
	p1: Vec2,
	p2: Vec2,
}

type ClientID = number;
type MsgHandler = (id: ClientID, data: any) => void;

interface Comp {
	id?: CompID;
	require?: CompID[];
	add?: AddEvent;
	load?: LoadEvent;
	update?: UpdateEvent;
	draw?: DrawEvent;
	destroy?: DestroyEvent;
	inspect?: InspectEvent;
}

type GameObjID = number;
type CompID = string;
type AddEvent = () => void;
type LoadEvent = () => void;
type DrawEvent = () => void;
type UpdateEvent = () => void;
type DestroyEvent = () => void;
type InspectEvent = () => any;

type PosCompInspect = {
	pos: string,
}

interface PosComp extends Comp {
	pos: Vec2;
	move(xVel: number, yVel: number);
	move(vel: Vec2);
	moveTo(dest: Vec2, speed?: number);
	screenPos(): Vec2;
}

interface ScaleComp extends Comp {
	scale: Vec2;
}

interface RotateComp extends Comp {
	angle: number;
}

interface ColorComp extends Comp {
	color: Color;
}

interface OriginComp extends Comp {
	origin: Origin | Vec2;
}

type LayerCompInspect = {
	layer: string,
}

interface LayerComp extends Comp {
	layer: string;
}

type RectSide =
	"top"
	| "bottom"
	| "left"
	| "right"
	;

type PushOut = {
	obj: GameObj<any>,
	side: RectSide,
	dis: number,
}

interface AreaComp extends Comp {
	area: Rect;
	areaWidth(): number,
	areaHeight(): number,
	isClicked(): boolean,
	isHovered(): boolean,
	isCollided(o: GameObj<any>): boolean,
	isOverlapped(o: GameObj<any>): boolean,
	clicks(f: () => void): void,
	hovers(f: () => void): void,
	collides(tag: string, f: (o: GameObj<any>) => void): void,
	overlaps(tag: string, f: (o: GameObj<any>) => void): void,
	hasPt(p: Vec2): boolean,
	pushOut(obj: GameObj<any>): PushOut | null,
	pushOutAll(): PushOut[],
	_worldArea(): Rect;
	_checkCollisions(tag: string, f: (obj: GameObj<any>) => void): void;
	_checkOverlaps(tag: string, f: (obj: GameObj<any>) => void): void;
}

type SpriteCompConf = {
	quad?: Quad,
	frame?: number,
	animSpeed?: number,
	tiled?: boolean,
	width?: number,
	height?: number,
	flipX?: boolean,
	flipY?: boolean,
}

type SpriteCurAnim = {
	name: string,
	loop: boolean,
	timer: number,
}

interface SpriteComp extends Comp {
	width: number;
	height: number;
	animSpeed: number;
	frame: number;
	quad: Quad;
	play(anim: string, loop?: boolean);
	stop();
	numFrames(): number;
	curAnim(): string;
	flipX(b: boolean);
	flipY(b: boolean);
}

type SpriteCompInspect = {
	curAnim?: string,
}

interface TextComp extends Comp {
	text: string;
	textSize: number;
	font: string;
	width: number;
	height: number;
}

type TextCompConf = {
	area?: boolean,
	font?: string,
	width?: number,
}

interface RectComp extends Comp {
	width: number;
	height: number;
}

interface OutlineComp extends Comp {
	lineWidth: number;
	lineColor: Color;
}

type Debug = {
	paused: boolean,
	inspect: boolean,
	timeScale: number,
	showLog: boolean,
	fps(): number,
	objCount(): number,
	drawCalls(): number,
	stepFrame(): void,
	clearLog(): void,
	log(msg: string): void,
	error(msg: string): void,
}

type UniformValue =
	Vec2
	| Vec3
	| Color
	| Mat4
	;

type Uniform = Record<string, UniformValue>;

interface ShaderComp extends Comp {
	uniform: Uniform;
	shader: string;
}

interface BodyComp extends Comp {
	jumpForce: number;
	curPlatform(): GameObj<any> | null;
	grounded(): boolean;
	falling(): boolean;
	jump(f?: number);
}

type BodyCompConf = {
	jumpForce?: number,
	maxVel?: number,
}

interface SolidComp extends Comp {
	solid: boolean;
}
