//=============================================================================
// MPP_CharacterMake.js
//=============================================================================
// Copyright (c) 2017-2022 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc This plugin allows you to create characters in-game using
 * generator parts.
 * @author Mokusei Penguin
 * @url http://woodpenguin.web.fc2.com/MV_Plugin/CharacterMake.html
 *
 * @help [version 2.0.0]
 * This plugin is for RPG Maker MZ.
 *
 * ▼ Installation
 *  - To use this plugin, you need character generation image files.
 *  - Please move the Generator folder in accordance with the
 *	  instructions at the provided URL before use.
 *  - In test play, a file called CharGene.json will be created
 * 	  in the Generator folder.
 *  - The plugin will not work without this file, so please be
 *	  sure to run at least one test play once you've changed
 *	  the Generator folder.
 *  - To save space, delete any unused files in the Generator folder.
 *  - If you won't be generating kids, you don't need the Kid folders.
 *  - If you use front view battles, you don't need an SV folder.
 *
 * ▼ Actor note field
 *  〇 <GeneKind:kind>
 *   - Sets the default base type.
 *   - By setting the basic type, the template of the actor will be
 *     changed to that kind for character generation.
 *
 *  〇 <GeneDefaultParts:p1,p2,...p20>
 *   - Set the default parts all at once.
 *   - Set 20 values separated by commas.
 *   - You can get the required number with MPP_CharacterMake_Op1.
 *
 * ▼ Note field for classes, weapons and armors
 *  - The priority of trait objects is equipment (top slot to bottom) > class.
 *
 *  〇 <GeneParts PARTS:id> / <GeneParts PARTS KIND:id>
 *       PARTS : Part name
 *       KIND  : Basic type
 *       id    : Part ID
 *   - If the actor has a trait object with this notetag set,
 *     it modifies the specified part.
 *   - If you specify a basic type, it applies only to that type.
 *       Example: <GeneParts Clothing:1>  => Set the Clothing part ID to 1.
 *                <GeneParts AccA Male:2>
 *               => For basic type Male, set the part ID of AccA
 *                  (accessory 1) to 2.
 *
 *  〇 <GeneColor NUMBER:id> /
 *     <GeneColor NUMBER KIND:id> /
 *     <GeneColor NUMBER:-1, r, g, b> /
 *     <GeneColor NUMBER KIND:-1, r, g, b>
 *       NUMBER : Part color nmber
 *       KIND   : Basic type
 *       id     : Color ID
 *   - If the actor has a trait object with this notetag set,
 *     it modifies the specified part color number.
 *   - In [Color ID], specify the colour of the gradient image (0, 1, 2 etc)
 *     in order from the top left.
 *   - When [Color ID] is set to 0, the default color (no change) will be
 *     applied instead of the top gradient color.
 *   - If [Color ID] is set to -1, RGB values can be specified.
 *   - If you specify a basic type, it applies only to that type.
 *       Example: <GeneColor 3:1>  => Set the color ID of part color number 3
 *                (hair color) to 1.
 *
 * ▼ Plugin Commands
 *  〇 Actor's fall character switching (switchActorDamageTV) /
 *     Party member's fallen character switching (switchPartyDamageTV)
 *   - Change the walking graphic of the target actor to a fallen character
 *     (or a normal walking character).
 *   - For a specific fallen character image, refer to RPG Maker MZ character
 *     generation.
 *   - From left to right, they are assigned downward, left and right.
 *
 * ▼ Details of each parameter
 *  〇 Basic Types
 *   Male   : Men
 *   Female : Women
 *   Kid    : Children
 *   - The character for which the basic type has been set will switch
 *     to the image with character makeup.
 *   - If you want to use a normal image file, leave the basic type unset.
 *
 *  〇 Part names
 *   Face      : Face		FrontHair  : Bangs
 *   RearHair  : Rear hair	Beard      : Beard
 *   Ears      : Ear		Eyes       : Eye
 *   Eyebrows  : Eyebrow		Nose       : Nose
 *   Mouth     : Mouth		FacialMark : Face marking
 *   BeastEars : Animal ear	Tail       : Tail
 *   Wing      : Wing		Clothing   : Clothes
 *   Cloak     : Cloak		AccA       : Accessory 1
 *   AccB      : Accessory 2	Glasses    : Glasses
 *
 *  〇 Color Numbers
 *   1  : Skin color		2  : Eye color
 *   3  : Hair color		4  : Subcolor of rear hair
 *   5  : Pattern color		6  : Animal ears color
 *   7  : Main clothing color	8  : Clothes subcolor 1
 *   9  : Clothes subcolor 2	10 : Clothes subcolor 3
 *   11 : Main cloak color	12 : Cloak subcolor 1
 *   13 : Acc1 main color		14 : Acc1 subcolor 1
 *   15 : Acc1 subcolor 2		16 : Acc2 main color
 *   17 : Acc2 subcolor 1		18 : Acc2 subcolor 2
 *   19 : Acc3 subcolor 3		20 : Main glasses color
 *   21 : Glasses subcolor 1	22 : Glasses subcolor 2
 *   23 : Tail color		24 : Feather color
 *
 *  〇 Gradient image compatible parts
 *   grad_hair.png   : Hair color, Subcolor of rear hair, Animal ears color,
 *                     Tail color
 *   grad_skin.png   : Skin color
 *   grad_eyes.png   : Eye color
 *   grad_common.png : All except those above
 *   - You can increase or decrease the number of gradient colors by changing
 *     the height of each image.
 *
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 *  @command openScene
 *      @text Open the character create scene
 *
 *  @command setActorKind
 *      @text Basic type setting
 *      @desc
 *      @arg actorId
 *          @text Actor ID
 *          @desc
 *          @type actor
 *          @default 0
 *      @arg kind
 *          @text Basic type
 *          @desc none:none, Male:male, Female:female, Kid:child
 *          @type select
 *              @option none
 *              @option Male
 *              @option Female
 *              @option Kid
 *          @default Male
 *
 *  @command switchActorDamageTV
 *      @text Switch actor's fallen character
 *      @desc
 *      @arg actorIds
 *          @text Actor array
 *          @desc
 *          @type actor[]
 *          @default []
 *      @arg damage
 *          @text Fallen
 *          @desc
 *          @type boolean
 *          @default false
 *
 *  @command switchPartyDamageTV
 *      @text Switch party member's fallen character
 *      @desc
 *      @arg target
 *          @text Subject
 *          @desc
 *          @type select
 *              @option Leader only
 *                  @value top
 *              @option All members
 *                  @value all members
 *          @default all members
 *      @arg damage
 *          @text Fallen
 *          @desc
 *          @type boolean
 *          @default false
 *
 *	@command changePart
 *		@text Change Part
 *		@desc Change chosen part to the specified ID.
 *		@arg part
 *			@text Part
 *			@desc Name of the part to change.
 *			@type select
 *				@option Front Hair
 *					@value FrontHair
 *				@option Rear Hair
 *					@value RearHair
 *				@option Clothing
 *					@value Clothing
 *				@option Glasses
 *					@value Glasses
 *		@arg partID
 *			@text Part ID
 *			@desc ID of the part to change to.
 *			@type number
 *			@min 0
 *			@max 100
 *
 *	@command changeColour
 *		@text Change Colour
 *		@desc Change chosen part colour to the specified colour ID.
 *		@arg part
 *			@text Part
 *			@desc ID of the colour to change.
 *			@type select
 *				@option Hair
 *					@value 3
 *				@option Clothing main
 *					@value 7
 *				@option Clothing subcolour 1
 *					@value 8
 *				@option Clothing subcolour 2
 *					@value 9
 *				@option Clothing subcolour 3
 *					@value 10
 *		@arg colourID
 *			@text Colour ID
 *			@desc ID of the colour to change to.
 *			@type number
 *			@min 0
 *			@max 100
 *
 *  @param Base Kinds
 *      @text Basic types
 *      @desc There is no need to remove types not being used.
 *            Use this parameter if you want to add more.
 *      @type string[]
 *      @default ["Male", "Female", "Kid"]
 *
 * @param forceClothing
 * @text Force Clothing?
 * @desc Determine whether to allow the "no clothing" option.
 * @type boolean
 * @on Force clothing
 * @off Allow no clothing
 * @default true
 */

(() => {
    'use strict';

    const pluginName = 'MPP_CharacterMake_TLB';

    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const param_BaseKinds = JSON.parse(parameters['Base Kinds'] || '[]');
	const param_ForceClothing = eval(parameters['forceClothing']);

    // Dealing with other plugins
    const __base = (obj, prop) => {
        if (obj.hasOwnProperty(prop)) {
            return obj[prop];
        } else {
            const proto = Object.getPrototypeOf(obj);
            return function () { return proto[prop].apply(this, arguments); };
        }
    };

    const DATABASE = {
        icon: ['Body', 'body', 'Face', 'FrontHair', 'RearHair', 'Beard', 'Ears', 'Eyes', 'Eyebrows', 'Nose', 'Mouth', 'FacialMark', 'BeastEars', 'Tail', 'Wing', 'Clothing', 'Cloak', 'AccA', 'AccB', 'Glasses'],
        TVD: ['Body', 'FacialMark', 'Clothing','Beard', 'Tail', 'Cloak', 'Glasses', 'Wing', 'RearHair', 'BeastEars', 'Eyes', 'AccA', 'FrontHair', 'AccB'],
        TV: ['Wing2', 'Cloak2', 'Tail2', 'FrontHair2', 'Beard2', 'Body', 'FacialMark', 'RearHair2', 'Clothing2', 'Beard1', 'Clothing1', 'Tail1', 'Cloak1', 'BeastEars', 'Glasses', 'RearHair1', 'AccA', 'FrontHair1', 'AccB', 'Wing1'],
        SV: ['Wing', 'Cloak2', 'Tail', 'body', 'FacialMark', 'RearHair1', 'Clothing2', 'Beard', 'Clothing1', 'Cloak1', 'BeastEars', 'Ears', 'Glasses', 'AccA', 'FrontHair', 'AccB'],
        FG: ['RearHair2', 'Cloak2', 'Body', 'Clothing2', 'Face', 'Mouth', 'Nose', 'FacialMark', 'Eyes', 'Eyebrows', 'RearHair1', 'Ears', 'Clothing1', 'Beard', 'BeastEars', 'AccA', 'Cloak1', 'FrontHair', 'Glasses', 'AccB'],
        forceParts: new Set(['Body', 'body', 'Face', 'Ears', 'Eyes', 'Eyebrows', 'Nose', 'Mouth']),
        partsColorNumbers: { Face: [1], FrontHair: [3], RearHair: [3, 4], Beard: [3], Ears: [1], Eyes: [2], Eyebrows: [3], Nose: [1], Mouth: [1], FacialMark: [5], BeastEars: [6], Tail: [23], Wing: [24], Clothing: [7, 8, 9, 10], Cloak: [11, 12], AccA: [13, 14, 15], AccB: [16, 17, 18, 19], Glasses: [20, 21, 22] },
        gradients: { grad_hair: [3, 4, 6, 23], grad_skin: [1], grad_eyes: [2] },
        colors: ['255,255,255', '249,193,157', '44,128,203', '252,203,10', '184,146,197', '0,146,150', '211,206,199', '174,134,130', '254,157,30', '28,118,208', '217,164,4', '216,172,0', '163,7,8', '211,206,194', '218,52,110', '164,201,17', '199,132,7', '192,211,210', '65,85,182', '186,59,69', '153,153,153', '204,186,210', '96,126,75', '230,214,189', '167,214,214'],
    };

    // Confirmed error colors. There are too many and it is troublesome to add
	// more.
    const _errorColors = {
        '79,65,60':0, // Underwear color
        '58,48,44':0, // SV/Female/SV_body_p01_c, X:230, Y:49

        '155,121,94':0, // TV/Male/TV_Clothing2_p01_c, X:33, Y37
        '200,143,126':8, // TV/Male/TV_Clothing2_p03_c, X:69, Y:44
        '253,253,253':0, // TV/Male/TV_Clothing2_p06_c, X:71, Y:37
        '201,145,111':9, // TV/Male/TV_Clothing2_p07_c.png, X:33, Y:33
        '228,136,9':9, // SV/Male/SV_Clothing2_p02_c, X:405, Y:375
        '251,220,200':1, // SV/Male/SV_Clothing2_p12_c, X:290, Y:45
        '234,151,119':1, // SV/Male/SV_Clothing2_p12_c, X:28, Y:234
        '244,255,254':0, // SV/Male/SV_Clothing2_p14_c, X:208, Y:40
        '251,253,254':7, // SV/Male/SV_Clothing2_p17_c, X:40, Y:38
        '254,254,254':0, // SV/Male/SV_Clothing2_p22_c, X:449, Y:0
        '150,75,31':1, // SV/Male/SV_Clothing2_p26_c, X:524, Y:90
        '146,215,197':24, // SV/Male/SV_Wing_p04_c, X:426, Y:371
        '119,72,0':16, // SV/Male/SV_AccB_p03_c, X:446, Y:15

        '241,252,255':0, // TV/Male/TV_Clothing2_p27_c, X:67, Y:35
        '32,29,26':7, // SV/Male/SV_Clothing2_p28_c, X:232, Y:311

        '253,251,239':0, // TV/Female/TV_Clothing2_p22_c, X:61, Y:33
        '252,252,250':0, // TV/Female/TV_Clothing2_p25_c, X:62, Y:33
        '125,145,134':0, // SV/Female/SV_FrontHair_p10_c, X:527, Y:89
        '138,84,13':3, // SV/Female/SV_RearHair1_p17_c, X:25, Y:361
        '173,130,0':3, // SV/Female/SV_RearHair1_p17_c, X:26, Y:363
        '208,131,46':0, // SV/Female/SV_Clothing2_p03_c, X:413, Y:378
        '157,146,116':0, // SV/Female/SV_Clothing2_p09_c, X:293, Y:250
        '79,113,169':7, // SV/Female/SV_Clothing2_p10_c, X:23, Y:40
        '112,112,94':0, // SV/Female/SV_Clothing2_p17_c, X:83, Y:60
        '220,176,16':11, // SV/Female/SV_Cloak2_p02_c, X:24, Y:39

        '251,249,250':0, // SV/Female/SV_Clothing1_p28_c, X:214, Y:42
    };
    const _errorCheck = false;

    /**
     * Check whether two arrays are equal
     *
     * @param {array} ary1 - Array 1.
     * @param {array} ary2 - Array 2.
     * @returns {boolean}
     */
    function array_equals(ary1, ary2) {
        return JSON.stringify(ary1) === JSON.stringify(ary2);
    }

	var MPP = MPP || {};
	var MPPlugin = {};
	var Alias = {};
	var Method = {};

    //-------------------------------------------------------------------------
    // PluginManager

	PluginManager.registerCommand(pluginName, "openScene", args => {
		if (!$gameParty.inBattle()) {
			const actor = $gameActors.actor(6);
			if (actor && actor._geneKind) {
				$gameParty.setMenuActor(actor);
				SceneManager.push(Scene_CharacterEdit);
			}
		}
	});

    PluginManager.registerCommand(pluginName, 'setActorKind', args => {
        const actorId = PluginManager.mppValue(args.actorId);
        const actor = $gameActors.actor(actorId);
        if (actor) {
            const kind = args.kind === 'none' ? null : args.kind;
            actor.setGeneKind(kind);
        }
    });

    PluginManager.registerCommand(pluginName, 'switchActorDamageTV', function(args) {
        this._charGeneActors = JSON.parse(args.actorIds)
            .map(actorId => $gameActors.actor(actorId))
            .filter(actor => actor && actor.geneKind());
        if (this._charGeneActors.length > 0) {
            this._waitMode = 'GeneDamage';
            this._charGeneDamage = args.damage === 'true';
            for (const actor of this._charGeneActors) {
                const paramsStr = actor.geneParamsString();
                const charaType = (this._charGeneDamage ? 'TVD|' : 'TV|');
                const characterName = '$MppGene' + charaType + paramsStr;
                ImageManager.loadCharacter(characterName);
            }
        }
    });

    PluginManager.registerCommand(pluginName, 'switchPartyDamageTV', function(args) {
        if (args.target === 'top') {
            this._charGeneActors = [$gameParty.leader()];
        } else {
            this._charGeneActors = $gameParty.allMembers();
        }
        this._charGeneActors = this._charGeneActors
            .filter(actor => actor && actor.geneKind());
        if (this._charGeneActors.length > 0) {
            this._waitMode = 'GeneDamage';
            this._charGeneDamage = args.damage === 'true';
            for (const actor of this._charGeneActors) {
                const paramsStr = actor.geneParamsString();
                const charaType = (this._charGeneDamage ? 'TVD|' : 'TV|');
                const characterName = '$MppGene' + charaType + paramsStr;
                ImageManager.loadCharacter(characterName);
            }
        }
    });

	PluginManager.registerCommand(pluginName, 'changePart', function(args) {
		$gameActors.actor(6).setGeneParts(args.part, parseInt(args.partID));
	});

	PluginManager.registerCommand(pluginName, 'changeColour', function(args) {
		$gameActors.actor(6).setGeneColor(parseInt(args.part), parseInt(args.colourID));
	});

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };

    //-------------------------------------------------------------------------
    // CharGenerater

    window.CharGenerater = {
        DATABASE: DATABASE,
        _tempCanvas: null,
        _entries: new Map(),
        _images: {},
        _colors: {},

        isCreateEdit() {
            return Utils.isOptionValid('test') && Utils.isNwjs();
        },

        defaultGeneParts() {
            return [1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,1,0,0,0,0];
        },

        defaultGeneColors() {
            return new Array(24).fill([0, 136,136,136]).flat();
        },

        checkForceParts(parts, kind) {
            const list = $dataCharGene.icon[kind];
            if (!list) return parts;
            const { icon, forceParts } = DATABASE;
            return parts.map((partsId, i) => {
                const partsName = icon[i];
                if (
                    partsId === 0 &&
                    forceParts.has(partsName) &&
                    list[partsName].length > 0
                ) {
                    return list[partsName][0];
                }
                return partsId;
            });
        },

        getTempCanvas(width, height) {
            if (!this._tempCanvas) {
                this._tempCanvas = document.createElement('canvas');
            }
            const canvas = this._tempCanvas;
            if (canvas.width < width) {
                canvas.width = width;
            }
            if (canvas.height < height) {
                canvas.height = height;
            }
            return canvas;
        },

        loadGradients() {
            this._gradients = {};
            for (const fileName of ['grad_hair', 'grad_skin', 'grad_eyes', 'grad_common']) {
                const url = `generator/${Utils.encodeURI(fileName)}.png`;
                this._gradients[fileName] = new GenerateImage(url);
            }
        },

        getGradients(colorNumber) {
            for (const fileName of ['grad_hair', 'grad_skin', 'grad_eyes']) {
                if (DATABASE.gradients[fileName].includes(colorNumber)) {
                    return this._gradients[fileName];
                }
            }
            return this._gradients.grad_common;
        },

        addEntry(key, entry) {
            this._entries.set(key, entry);
        },

        getImage(type, kind, filename) {
            const cache = this._images;
            const url = `generator/${type}/${kind}/${Utils.encodeURI(filename)}.png`;
            if (!(url in cache)) {
                cache[url] = new GenerateImage(url);
            }
            return cache[url];
        },

        getColor(type, kind, filename) {
            const cache = this._colors;
            const url = `generator/${type}/${kind}/${Utils.encodeURI(filename)}_c.png`;
            if (!(url in cache)) {
                cache[url] = new GenerateColor(url);
            }
            return cache[url];
        },

        update() {
            this.updateEntries();
        },

        updateEntries() {
            for (const [key, entry] of this._entries) {
                entry.onGenerate();
                if (entry.isReady()) {
                    this._entries.delete(key);
                }
            }
        },

        clear() {
            this._entries.clear();
            this._images = {};
        },

        isReady() {
            return this._entries.size === 0;
        },

    };

    //-------------------------------------------------------------------------
    // GeneraterEntry

    class GeneraterEntry {
        constructor(type, params) {
            this._type = type;
            this._params = params;
            this._loaded = false;
        }

        setup(bitmap) {
            const type = this._type;
            const { kind, parts, colors } = this._params;
            const filenames = this.getFileNames(type, kind, parts);
            this._bitmap = bitmap;
            this._geneImages = this.createGeneImages(filenames, type, kind);
            this._geneColors = this.createGeneColors(filenames, type, kind);
            this._defaultColors = this.getDefaultColors(colors);
            this._gradData = this.getGradData(colors);
            this._index = 0;
        }

        getFileNames(type, kind, currentParts) {
            const icon = DATABASE.icon;
            const stackingOrder = DATABASE[type];
            const kindList = $dataCharGene[type][kind];
            const faceOrder = $dataCharGene.FaceOrder;
            const isFace = type === 'FG';
            return stackingOrder.reduce((r, partsName) => {
                const baseName = this.getPartsBaseName(partsName);
                const partsIndex = icon.indexOf(baseName);
                const partsId = partsIndex >= 0 ? currentParts[partsIndex] : 0;
                const partsList = kindList[partsName];
                if (partsList && partsList.includes(partsId)) {
                    if (!isFace) {
                        r.push(`${type}_${partsName}_p${partsId.padZero(2)}`);
                    } else {
                        r.push(...faceOrder[`${kind},${partsName},${partsId}`]);
                    }
                }
                return r;
            }, []);
        }

        getPartsBaseName(name) {
            return /\d$/.test(name) ? name.slice(0,-1) : name;
        }

        createGeneImages(filenames, type, kind) {
            const fileType = type === 'FG' ? 'Face' : type;
            return filenames.map(
                filename => CharGenerater.getImage(fileType, kind, filename)
            );
        }

        createGeneColors(filenames, type, kind) {
            const isFace = type === 'FG';
            return filenames.map(filename => {
                return isFace
                    ? this.getFilenameColorIndex(filename)
                    : CharGenerater.getColor(type, kind, filename);
            });
        }

        getFilenameColorIndex(filename) {
            const match = /_m(\d\d\d)/.exec(filename);
            return match ? +match[1] : 0;
        }

        getDefaultColors(currentColors) {
            return new Set(
                [...Array(24).keys()].filter(i => currentColors[i * 4] === 0)
            ).add(-1);
        }

        getGradData(currentColors) {
            const defColors = this._defaultColors;
            const tempCanvas = CharGenerater.getTempCanvas(256, 24);
            const tempContext = tempCanvas.getContext('2d');
            tempContext.globalCompositeOperation = 'source-over';
            for (let n = 0; n < 24; n++) {
                if (defColors.has(n)) continue;
                const ci = currentColors[n * 4];
                if (ci >= 0) {
                    const image = CharGenerater.getGradients(n + 1).image;
                    tempContext.drawImage(image, 0, ci * 4, 256, 1, 0, n, 256, 1);
                } else {
                    const rgb = currentColors.slice(n * 4 + 1, n * 4 + 4);
                    const grad = tempContext.createLinearGradient(0, 0, 256, 0);
                    grad.addColorStop(0, '#fff');
                    grad.addColorStop(0.5, `rgb(${rgb})`);
                    grad.addColorStop(1, '#000');
                    tempContext.fillStyle = grad;
                    tempContext.fillRect(0, n, 256, 1);
                }
            }
            return tempContext.getImageData(0, 0, 256, 24).data;
        }

        onGenerate() {
            const isFace = this._type === 'FG';
            while (this._geneImages.length > this._index) {
                const i = this._index;
                const image = this._geneImages[i];
                const color = this._geneColors[i];
                if (!image.isReady() || (!isFace && !color.isReady())) {
                    return;
                }
                const colorData = isFace ? [Infinity, color] : color.colorData();
                const tempCanvas = this.getCanvasWithChangedTone(image, colorData);
                const context = this._bitmap.context;
                context.globalCompositeOperation = i === 0 ? 'copy' : 'source-over';
                context.drawImage(tempCanvas, 0, 0);
                this._index++;
            }
            this.endGenerate();
        }

        getCanvasWithChangedTone(gameImage, colorData) {
            const imageData = gameImage.imageData();
            this.changeImageData(imageData, colorData);
            const width = imageData.width;
            const height = imageData.height;
            const tempCanvas = CharGenerater.getTempCanvas(width, height);
            const tempContext = tempCanvas.getContext('2d');
            tempContext.putImageData(imageData, 0, 0);
            return tempCanvas;
        }

        changeImageData(imageData, colorData) {
            const defColors = this._defaultColors;
            const gradData = this._gradData;
            const data = imageData.data;
            const max = data.length;
            const rgbToL = (r, g, b) => {
                return Math.floor((Math.min(r, g, b) + Math.max(r, g, b)) / 2);
            };
            let cn = -1;
            let ci = 0;
            let di = 0;
            for (let n = 0; n < max; n += 4) {
                if (cn < n) {
                    if (colorData.length === di) return;
                    cn = colorData[di++];
                    ci = colorData[di++] - 1;
                    if (defColors.has(ci)) {
                        n = cn;
                        continue;
                    }
                }
                if (data[n + 3] === 0) continue;
                const l = rgbToL(data[n], data[n + 1], data[n + 2]);
                const m = (ci * 256 + 255 - l) * 4;
                data[n] = gradData[m];
                data[n + 1] = gradData[m + 1];
                data[n + 2] = gradData[m + 2];
            }
        }

        endGenerate() {
            if (!this._loaded) {
                this._bitmap.endGenerate();
				if (Imported.VisuMZ_0_CoreEngine) this._bitmap._customModified = false;
                delete this._geneImages;
                delete this._geneColors;
                delete this._defaultColors;
                delete this._gradData;
                delete this._bitmap;
                delete this._index;
                this._loaded = true;
            }
        }

        isReady() {
            return this._loaded;
        }

    }

    //-------------------------------------------------------------------------
    // GenerateImage

    class GenerateImage {
        constructor(url) {
            this._url = url;
            this._loadingState = 'none';
            this.startLoading();
        }

        get image() {
            return this._image;
        }

        get width() {
            return this._url.startsWith('generator/Face')
                ? ImageManager.faceWidth
                : this._image.width;
        }

        get height() {
            return this._url.startsWith('generator/Face')
                ? ImageManager.faceHeight
                : this._image.height;
        }

        startLoading() {
            this._image = new Image();
            this._image.onload = this._onLoad.bind(this);
            this._image.onerror = this._onError.bind(this);
            this._loadingState = 'loading';
            if (Utils.hasEncryptedImages()) {
                this._startDecrypting();
            } else {
                this._image.src = this._url;
            }
        }

        _startDecrypting() {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', this._url + '_');
            xhr.responseType = 'arraybuffer';
            xhr.onload = () => this._onXhrLoad(xhr);
            xhr.onerror = this._onError.bind(this);
            xhr.send();
        }

        _onXhrLoad(xhr) {
            if (xhr.status < 400) {
                const arrayBuffer = Utils.decryptArrayBuffer(xhr.response);
                const blob = new Blob([arrayBuffer]);
                this._image.src = URL.createObjectURL(blob);
            } else {
                this._onError();
            }
        }

        isReady() {
            return this._loadingState === 'loaded';
        }

        isError() {
            return this._loadingState === 'error';
        }

        imageData() {
            const width = this.width;
            const height = this.height;
            const image = this._image;
            const dx = (width - image.width) / 2;
            const dy = (height - image.height) / 2;
            const tempCanvas = CharGenerater.getTempCanvas(width, height);
            const tempContext = tempCanvas.getContext('2d');
            tempContext.globalCompositeOperation = 'copy';
            tempContext.drawImage(image, dx, dy);
            return tempContext.getImageData(0, 0, width, height);
        }

        _onLoad() {
            if (Utils.hasEncryptedImages()) {
                URL.revokeObjectURL(this._image?.src);
            }
            this._loadingState = 'loaded';
        }

        _onError() {
            this._loadingState = 'error';
        }

    }

    //-------------------------------------------------------------------------
    // GenerateColor

    class GenerateColor extends GenerateImage {
        static _errorRGB = new Set();

        static hasErrorRgb(rgb) {
            return this._errorRGB.has(rgb);
        }

        static addError(rgb) {
            this._errorRGB.add(rgb);
        }

        colorData() {
            return this._colorData;
        }

        _onLoad() {
            this._colorData = this.compressData(this.imageData().data);
            delete this._image;
            super._onLoad();
        }

        compressData(imageData) {
            const result = [];
            let lastNumber = 0;
            for (let i = 0; i < imageData.length; i += 4) {
                const rgb = `${imageData[i]},${imageData[i + 1]},${imageData[i + 2]}`;
                const number = this.getColorNumber(rgb, i);
                if (lastNumber !== number) {
                    result.push(i - 4, lastNumber);
                    lastNumber = number;
                }
            }
            return result;
        }

        getColorNumber(rgb, i) {
            const index = DATABASE.colors.indexOf(rgb);
            if (index >= 0) {
                return index;
            }
            if (rgb in _errorColors) {
                return _errorColors[rgb];
            }
            if (_errorCheck && !GenerateColor.hasErrorRgb(rgb)) {
                this.outputErrorRgb(rgb, i / 4);
            }
            return 0;
        }

        outputErrorRgb(rgb, n) {
            const width = Math.max(this._image.width || 0, 1);
            const x = n % width;
            const y = Math.floor(n / width);
            const fileName = this._url.slice(this._url.indexOf('/') + 1, -4);
            GenerateColor.addError(rgb);
        }

        _onError() {
            this._colorData = [Infinity, 0];
            this._loadingState = 'loaded';
            delete this._image;
        }

    }

	//-----------------------------------------------------------------------------
	// GenerateColors

	function GenerateColors() {
		throw new Error('This is a static class');
	}

	MPP.GenerateColors = GenerateColors;

	GenerateColors._items = {};
	GenerateColors._errorRGB = [];
	GenerateColors._queue = [];

	GenerateColors.get = function(path, c) {
		var item = this._items[path];
		if (!item) {
			item = new GenerateColor(path);
			if (c === undefined) {
				this._queue.push(item);
			} else {
				item.setColor(c);
			}
			this._items[path] = item;
		}
		return item;
	};

	GenerateColors.error = function(rgb, path, x, y) {
		if (!this._errorRGB.contains(rgb)) {
			this._errorRGB.push(rgb);
			var text = 'File Name: ' + path + ',  ';
			text += 'X: ' + x + ',  Y: ' + y + ',  RGB: ' + rgb;
		}
	};

	GenerateColors.update = function() {
		if (this._queue.length === 0) return;

		var top = this._queue[0];
		if (top.isReady()) {
			this._queue.shift();
			top = this._queue[0];
			if (top) top.load();
		} else {
			top.load();
		}
	};

    //-------------------------------------------------------------------------
    // Bitmap

    Bitmap.generate = function(type) {
        const bitmap = Object.create(Bitmap.prototype);
        bitmap.initialize();
        bitmap._geneType = type;
        bitmap.setupGeneraterSize(type);
        return bitmap;
    };

    Bitmap.prototype.setupGeneraterSize = function(type) {
        switch (type) {
            case 'TVD':
            case 'TV':
                this.resize(48 * 3, 48 * 4);
                break;
            case 'SV':
                this.resize(576, 384);
                break;
            case 'FG':
                this.resize(ImageManager.faceWidth, ImageManager.faceHeight);
                break;
        }
    };

    Bitmap.prototype.setupGenerater = function(params) {
        if (!this.equalsGeneParams(params)) {
            //this.context.clearRect(0, 0, this.width, this.height);
            this.addGeneraterEntry(params);
            this._geneParams = params;
            this._loadingState = 'generateLoading';
        }
    };

    Bitmap.prototype.equalsGeneParams = function(params) {
        const geneParams = this._geneParams;
        if (!geneParams) return false;
        return (
            geneParams.kind === params.kind &&
            array_equals(geneParams.parts, params.parts) &&
            array_equals(geneParams.colors, params.colors)
        );
    };

    Bitmap.prototype.addGeneraterEntry = function(params) {
        const entry = new GeneraterEntry(this._geneType, params);
        entry.setup(this);
        CharGenerater.addEntry(params.key, entry);
    };

    Bitmap.prototype.endGenerate = function() {
        this._loadingState = 'loaded';
        if (this._geneType === 'TVD') {
            this.adjustTVD();
        }
        this._baseTexture.update();
        this._callLoadListeners();
    };

    Bitmap.prototype.adjustTVD = function() {
        const bw = Math.floor(this.width / 3);
        const bh = Math.floor(this.height / 4);
        const context = this.context;
        const canvas = this.canvas;
        context.globalCompositeOperation = 'source-over';
        context.drawImage(canvas, bw, 0, bw, bh, 0, bh, bw, bh);
        context.drawImage(canvas, bw * 2, 0, bw, bh, 0, bh * 2, bw, bh);
        this.context.clearRect(bw, 0, bw * 2, bh);
        context.drawImage(canvas, 0, 0, bw, bh * 3, bw, 0, bw, bh * 3);
        context.drawImage(canvas, 0, 0, bw, bh * 3, bw * 2, 0, bw, bh * 3);
    };

    //-------------------------------------------------------------------------
    // DataManager

    window.$dataCharGene = null;

    const _DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function() {
        _DataManager_loadDatabase.apply(this, arguments);
        if (CharGenerater.isCreateEdit()) {
            this.createEditData();
        } else {
            this.loadGeneData('$dataCharGene', 'chargene.json');
        }
    };

    DataManager.createEditData = function() {
        $dataCharGene = {
            icon: this.createGenePartsList('icon', 'Variation'),
            TVD: this.createGenePartsList('TVD'),
            TV: this.createGenePartsList('TV'),
            SV: this.createGenePartsList('SV'),
            FG: this.createGenePartsList('FG', 'Face'),
            FaceOrder: this.createGeneFaceOder()
        };
        StorageManager.saveGeneObject($dataCharGene);
    };

    DataManager.createGenePartsList = function(type, folderName) {
        folderName = folderName || type;
        const result = {};
        for (const kind of param_BaseKinds) {
            result[kind] = this.getKindPartsIds(folderName, type, kind);
        }
        return result;
    };

    DataManager.getKindPartsIds = function(folderName, type, kind) {
        const dirName = `${folderName}/${kind}/`;
        const allFileNames = StorageManager.geneReadFileNames(dirName);
        const result = {};
        if (allFileNames && type in DATABASE) {
            for (const partsName of DATABASE[type]) {
                const regexp = new RegExp(`^${type}_${partsName}_p(\\d+)`);
                result[partsName] = this.getPartsIds(allFileNames, regexp);
            }
        } else {
            console.log('Folder not found: ' + dirName);
        }
        return result;
    };

    DataManager.getPartsIds = function(allFileNames, regexp) {
        const partsIdSet = allFileNames.reduce((r, fileName) => {
            const match = regexp.exec(fileName);
            return match ? r.add(+match[1]) : r;
        }, new Set());
        return [...partsIdSet].sort((a, b) => a - b);
    };

    DataManager.createGeneFaceOder = function() {
        return Object.assign(
            {},
            ...param_BaseKinds.map(kind => this.getKindFaceOder(kind))
        );
    };

    DataManager.getKindFaceOder = function(kind) {
        const result = {};
        const dirName = `Face/${kind}/`;
        const allFileNames = StorageManager.geneReadFileNames(dirName);
        if (allFileNames) {
            const regexp = /^FG_(\w+?)_p(\d+)/;
            for (const fileName of allFileNames.sort()) {
                const match = regexp.exec(fileName);
                if (match) {
                    const key = `${kind},${match[1]},${+match[2]}`;
                    if (!(key in result)) result[key] = [];
                    result[key].unshift(fileName.slice(0, -4));
                }
            }
        } else {
            console.log('フォルダーなし : ' + dirName);
        }
        return result
    };

    const _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!CharGenerater.isCreateEdit() && !window['$dataCharGene']) {
            return false;
        }
        return _DataManager_isDatabaseLoaded.apply(this, arguments);
    };

    DataManager.loadGeneData = function(name, src) {
        const xhr = new XMLHttpRequest();
        const url = 'generator/' + src;
        window[name] = null;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = () => this.onXhrLoad(xhr, name, src, url);
        xhr.onerror = () => this.onXhrError(name, src, url);
        xhr.send();
    };

	DataManager.existGeneImage = function(type, kind, parts, p) {
		if (type === undefined) return true;
		var node = $dataCharGene[type];
		if (node === undefined) return false;
		if (kind === undefined) return true;
		node = node[kind];
		if (node === undefined) return false;
		if (parts === undefined) return true;
		node = node[parts];
		if (node === undefined) return false;
		if (p === undefined) return true;
		return node.contains(p);
	};

    //-------------------------------------------------------------------------
    // StorageManager

    StorageManager.geneReadFileNames = function(dirName) {
        const fs = require('fs');
        const dirPath = this.geneDirectoryPath() + dirName;
        return fs.existsSync(dirPath) ? fs.readdirSync(dirPath) : null;
    };

    StorageManager.geneDirectoryPath = function() {
        const path = require('path');
        const base = path.dirname(process.mainModule.filename);
        return path.join(base, 'generator/');
    };

    StorageManager.saveGeneObject = function(object) {
        this.objectToJson(object).then(json => this.saveGeneJson(json));
    };

    StorageManager.saveGeneJson = function(json) {
        const dirPath = this.geneDirectoryPath();
        const filePath = dirPath + 'chargene.json';
        const backupFilePath = filePath + '_';
        return new Promise((resolve, reject) => {
            this.fsMkdir(dirPath);
            this.fsUnlink(backupFilePath);
            this.fsRename(filePath, backupFilePath);
            try {
                this.fsWriteFile(filePath, json);
                this.fsUnlink(backupFilePath);
                resolve();
            } catch (e) {
                try {
                    this.fsUnlink(filePath);
                    this.fsRename(backupFilePath, filePath);
                } catch (e2) {
                    //
                }
                reject(e);
            }
        });
    };

    //-------------------------------------------------------------------------
    // ImageManager

    ImageManager._saveGenerater = null;

    ImageManager.createSaveGeneraterCache = function() {
        this._saveGenerater = {};
    };

    ImageManager.deleteSaveGeneraterCache = function() {
        if (this._saveGenerater) {
            const cache = this._saveGenerater;
            for (const url in cache) {
                cache[url].destroy();
            }
        }
        this._saveGenerater = null;
    };

    const _ImageManager_loadCharacter = ImageManager.loadCharacter;
    ImageManager.loadCharacter = function(filename) {
        const match = /^\$MppGene(TVD|TV)/.exec(filename);
        return match
            ? this.loadGeneraterBitmap(filename, match[1])
            : _ImageManager_loadCharacter.apply(this, arguments);
    };

    const _ImageManager_loadFace = ImageManager.loadFace;
    ImageManager.loadFace = function(filename) {
        return /^MppGeneFG/.test(filename)
            ? this.loadGeneraterBitmap(filename, 'FG')
            : _ImageManager_loadFace.apply(this, arguments);
    };

    const _ImageManager_loadSvActor = ImageManager.loadSvActor;
    ImageManager.loadSvActor = function(filename) {
        return /^MppGeneSV/.test(filename)
            ? this.loadGeneraterBitmap(filename, 'SV')
            : _ImageManager_loadSvActor.apply(this, arguments);
    };

    ImageManager.loadGeneraterBitmap = function(filename, type) {
        const params = this.makeGenerateParams(filename);
        const bitmap = this.loadGeneraterBitmapFromKey(params.key, type);
        bitmap.setupGenerater(params);
        return bitmap;
    };

    ImageManager.loadGeneraterBitmapFromKey = function(key, type) {
        const cache = this._saveGenerater || this._cache;
        if (!(key in cache)) {
            cache[key] = Bitmap.generate(type);
        }
        return cache[key];
    };

    ImageManager.makeGenerateParams = function(filename) {
        const [ header, params ] = filename.split('|');
        const [ actorId, kind, parts, colors ] = JSON.parse(params);
        const key = this._saveGenerater ? filename : header + actorId;
        return { key, actorId, kind, parts, colors };
    };

    const _ImageManager_clear = ImageManager.clear;
    ImageManager.clear = function() {
        _ImageManager_clear.apply(this, arguments);
        CharGenerater.clear();
    };

    const _ImageManager_isReady = ImageManager.isReady
    ImageManager.isReady = function() {
        return (
            _ImageManager_isReady.apply(this, arguments) &&
            CharGenerater.isReady()
        );
    };

	ImageManager.loadGenerator = function(type, kind, filename) {
		var folder = 'generator/' + type + '/' + kind + '/';
		const url = folder + Utils.encodeURI(filename) + ".png";
		var bitmap = this.loadBitmap(folder, filename);
		return bitmap;
	};

	ImageManager.loadGeneGradients = function(color) {
		if (color) {
			const url = CharGenerater.getGradients(color)._url.split("/");
			const folder = url[0] + "/";
			const filename = url[1].slice(0, url[1].indexOf("."));
			return this.loadBitmap(folder, filename);
		}
		return this.loadBitmap("generator/", "grad_common");
	};

    //-------------------------------------------------------------------------
    // SceneManager

    const _SceneManager_updateMain = SceneManager.updateMain;
    SceneManager.updateMain = function() {
        _SceneManager_updateMain.apply(this, arguments);
        CharGenerater.update();
    };

    //-------------------------------------------------------------------------
    // Game_Actor

    const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        _Game_Actor_initMembers.apply(this, arguments);
        this._geneCharacterName = '';
        this._geneFaceName = '';
        this._geneBattlerName =  '';
        this._geneKind = null;
        this._geneParts = [];
        this._geneColors = [];
        this._geneCharacterDamage = false;
    };

    const _Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _Game_Actor_setup.apply(this, arguments);
        this.initGeneKind();
        this.initGeneParts();
    };

    Game_Actor.prototype.initGeneKind = function() {
        this._geneKind = this.actor().meta['GeneKind'];
    };

    Game_Actor.prototype.initGeneParts = function() {
        const kind = this._geneKind;
        if (kind) {
            const geneColors = CharGenerater.defaultGeneColors();
            const traits = [this.actor()];
            this._geneParts = this.defaultGeneParts(kind);
            this._geneColors = this.applyTraitsGeneColors(geneColors, traits, kind);
        } else {
            this._geneParts = [];
            this._geneColors = [];
        }
        this._geneCharacterDamage = false;
        this.refreshImageName();
    };

    Game_Actor.prototype.defaultGeneParts = function(kind) {
        const metadata = this.actor().meta['GeneDefaultParts'];
        if (metadata) {
            const allParts = metadata.split(',').map(Number);
            return CharGenerater.checkForceParts(allParts, kind);
        } else {
            return CharGenerater.defaultGeneParts();
        }
    };

    const _Game_ActorcharacterName = Game_Actor.prototype.characterName;
    Game_Actor.prototype.characterName = function() {
        return this._geneKind
            ? this._geneCharacterName
            : _Game_ActorcharacterName.apply(this, arguments);
    };

    const _Game_Actor_characterIndex = Game_Actor.prototype.characterIndex;
    Game_Actor.prototype.characterIndex = function() {
        return this._geneKind
            ? 0
            : _Game_Actor_characterIndex.apply(this, arguments);
    };

    // const _Game_Actor_faceName = Game_Actor.prototype.faceName;
    // Game_Actor.prototype.faceName = function() {
    //     return this._geneKind
    //         ? this._geneFaceName
    //         : _Game_Actor_faceName.apply(this, arguments);
    // };

    // const _Game_Actor_faceIndex = Game_Actor.prototype.faceIndex;
    // Game_Actor.prototype.faceIndex = function() {
    //     return this._geneKind
    //         ? 0
    //         : _Game_Actor_faceIndex.apply(this, arguments);
    // };

    const _Game_Actor_battlerName = Game_Actor.prototype.battlerName;
    Game_Actor.prototype.battlerName = function() {
        return this._geneKind
            ? this._geneBattlerName
            : _Game_Actor_battlerName.apply(this, arguments);
    };

    const _Game_Actor_refresh = Game_Actor.prototype.refresh;
    Game_Actor.prototype.refresh = function() {
        _Game_Actor_refresh.apply(this, arguments);
        this.refreshImageName();
    };

    Game_Actor.prototype.setGeneKind = function(kind) {
        if (this._geneKind !== kind) {
            if (this._geneKind && !kind) {
                this.initImages();
            }
            this._geneKind = kind;
            this.initGeneParts();
        }
    };

    Game_Actor.prototype.refreshImageName = function() {
        if (this._geneKind && !param_BaseKinds.includes(this._geneKind)) {
            console.log('Basic type does not exist: ' + this._geneKind);
            this._geneKind = null;
        }
        if (this._geneKind) {
            const paramsStr = this.geneParamsString();
            const charaType = this._geneCharacterDamage ? 'TVD|' : 'TV|';
            this._geneCharacterName = '$MppGene' + charaType + paramsStr;
            this._geneFaceName = 'MppGeneFG|' + paramsStr;
            this._geneBattlerName =  'MppGeneSV|' + paramsStr;
            $gamePlayer.refresh();
        }
    };

    Game_Actor.prototype.geneParamsString = function() {
        const traits = this.geneTraitObjects();
        const kind = this._geneKind;
        return JSON.stringify([
            this._actorId,
            kind,
            this.applyTraitsGeneParts(this._geneParts, traits, kind),
            this.applyTraitsGeneColors(this._geneColors, traits, kind)
        ]);
    };

    Game_Actor.prototype.geneTraitObjects = function() {
        return this.equips().filter(Boolean).concat(this.currentClass());
    };

    Game_Actor.prototype.applyTraitsGeneParts = function(parts, traits, kind) {
        return parts.map((pId, i) => {
            const traitsPartsId = this.traitsMetaPartsId(i, traits, kind);
            return traitsPartsId >= 0 ? traitsPartsId : pId;
        });
    }

    Game_Actor.prototype.traitsMetaPartsId = function(i, traits, kind) {
        const name1 = `GeneParts ${DATABASE.icon[i]}`;
        const name2 = `${name1} ${kind}`;
        for (const { meta } of traits) {
            if (name2 in meta) return +meta[name2];
            if (name1 in meta) return +meta[name1];
        }
        return -1;
    }

    Game_Actor.prototype.applyTraitsGeneColors = function(colors, traits, kind) {
        const result = [...colors];
        for (let i = 0; i < 24; i++) {
            const ary = this.traitsMetaColors(i + 1, traits, kind);
            if (ary) result.splice(i * 4, ary.length, ...ary);
        }
        return result;
    };

    Game_Actor.prototype.traitsMetaColors = function(cn, traits, kind) {
        const name1 = `GeneColor ${cn}`;
        const name2 = `${name1} ${kind}`;
        for (const { meta } of traits) {
            if (name2 in meta) return meta[name2].split(',').map(Number);
            if (name1 in meta) return meta[name1].split(',').map(Number);
        }
        return null;
    };

    Game_Actor.prototype.setCharacterDamage = function(damage) {
        if (this._geneCharacterDamage !== damage) {
            this._geneCharacterDamage = damage;
            this.refreshImageName();
        }
    };

	Game_Actor.prototype.setGeneParts = function(parts, n, setOnly) {
		var index = DATABASE.icon.indexOf(parts);
		if (index >= 0 && this._geneParts[index] !== n) {
			this._geneParts[index] = n;
			if (!setOnly) this.refreshImageName();
		}
	};

	Game_Actor.prototype.getGeneParts = function(parts) {
		var index = DATABASE.icon.indexOf(parts);
		if (index >= 0) return this._geneParts[index];
	};

	Game_Actor.prototype.setGeneColor = function(number, index, setOnly) {
		if (number > 0 && number <= 24) {
			this._geneColors[(number - 1) * 4] = index;
			if (!setOnly) this.refreshImageName();
		}
	};

	Game_Actor.prototype.getGeneColor = function(number) {
		if (number > 0 && number <= 24) {
			return this._geneColors[(number - 1) * 4];
		}
	};

    //-------------------------------------------------------------------------
    // Game_Interpreter

    const _Game_Interpreter_clear = Game_Interpreter.prototype.clear;
    Game_Interpreter.prototype.clear = function() {
        _Game_Interpreter_clear.apply(this, arguments);
        this._charGeneDamage = false;
        this._charGeneActors = [];
    };

    const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        let waiting = false;
        if (this._waitMode === 'GeneDamage') {
            waiting = !CharGenerater.isReady();
            if (!waiting) {
                for (const actor of this._charGeneActors) {
                    actor.setCharacterDamage(this._charGeneDamage);
                }
                this._waitMode = '';
            }
        }
        return waiting || _Game_Interpreter_updateWaitMode.apply(this, arguments);
    };

    //-----------------------------------------------------------------------------
    // Spriteset_Battle

    const _Spriteset_Battle_initialize = Spriteset_Battle.prototype.initialize;
    Spriteset_Battle.prototype.initialize = function() {
        _Spriteset_Battle_initialize.apply(this, arguments);
        this.loadActorImages();
    };

    Spriteset_Battle.prototype.loadActorImages = function() {
        for (const actor of $gameParty.members()) {
            const batlerName = actor.battlerName();
            if (actor.isSpriteVisible() && /^MppGeneSV/.test(batlerName)) {
                ImageManager.loadSvActor(batlerName);
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Boot

    const _Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        _Scene_Boot_onDatabaseLoaded.apply(this, arguments);
        this.loadGeneratorImages();
    };

    Scene_Boot.prototype.loadGeneratorImages = function() {
        CharGenerater.loadGradients();
    };

    //-------------------------------------------------------------------------
    // Scene_File

    const _Scene_File_create = Scene_File.prototype.create;
    Scene_File.prototype.create = function() {
        ImageManager.createSaveGeneraterCache();
        _Scene_File_create.apply(this, arguments);
    };

    const _Scene_File_terminate = __base(Scene_File.prototype, 'terminate');
    Scene_File.prototype.terminate = function() {
        _Scene_File_terminate.apply(this, arguments);
        ImageManager.deleteSaveGeneraterCache();
    };

	//Basic
    MPPlugin.EditColor = true;
    MPPlugin.PartsList = ["Face","FrontHair","RearHair","Beard","Ears","Eyes","Eyebrows","Nose","Mouth","FacialMark","BeastEars","Tail","Wing","Clothing","Cloak","AccA","AccB","Glasses"];
    MPPlugin.PreviewList = "FG,TV,SV".split(',').map( t => t.toUpperCase() );
    MPPlugin.ForceParts = ["Face","Ears","Eyes","Eyebrows","Nose","Mouth"];
	if (param_ForceClothing) MPPlugin.ForceParts.push("Clothing");
	MPPlugin.ConfirmationScene = true;

    //Random
    MPPlugin.RandomPartsList = ["Face","FrontHair","RearHair","Beard","Ears","Eyes","Eyebrows","Nose","Mouth","FacialMark","Clothing","AccA","AccB","Glasses"];
    MPPlugin.RandomColorList = [3, 7, 8];
    MPPlugin.RandomSE = {"Name":"Decision1","Volume":"90","Pitch":"100","Pan":"0"};
    MPPlugin.RandomBackgroundType = 0;

    //Terms
    MPPlugin.text = {};
    var param = {"Yes":"Yes","No":"No","Reset":"Reset","Ok":"Ok","Custom":"Custom","Bright":"Bright","Normal":"Normal","Dark":"Dark"};
    MPPlugin.text.Yes = param['Yes'];
    MPPlugin.text.No = param['No'];
    MPPlugin.text.Default = param['Reset'];
    MPPlugin.text.Ok = param['Ok'];
    MPPlugin.text.Custom = param['Custom'];
    MPPlugin.text.CustomCommands = [param['Bright'], param['Normal'], param['Dark']];

    param = {"Confirmation":"Are you happy with your character design?","Loading":"Loading"};
    MPPlugin.text.Confirmation = param['Confirmation'];
    MPPlugin.text.Loading = param['Loading'];
    MPPlugin.text.Random = "Select Shift: to randomize character.";

    param = {"Male":"Male","Female":"Female","Kid":"Kid"};
    MPPlugin.text.Male = param['Male'];
    MPPlugin.text.Female = param['Female'];
    MPPlugin.text.Kid = param['Kid'];

    param = {"Face":"Face","FrontHair":"Bangs","RearHair":"Rear hair","Beard":"Beard","Ears":"Ears","Eyes":"Eyes","Eyebrows":"Eyebrows","Nose":"Nose","Mouth":"Mouth","FacialMark":"Face mark","BeastEars":"Animal ears","Tail":"Tail","Wing":"Wings","Clothing":"Clothes","Cloak":"Cloak","AccA":"Accessory 1","AccB":"Accessory 2","Glasses":"Glasses"};
    MPPlugin.text.Face = param['Face'];
    MPPlugin.text.FrontHair = param['FrontHair'];
    MPPlugin.text.RearHair = param['RearHair'];
    MPPlugin.text.Beard = param['Beard'];
    MPPlugin.text.Ears = param['Ears'];
    MPPlugin.text.Eyes = param['Eyes'];
    MPPlugin.text.Eyebrows = param['Eyebrows'];
    MPPlugin.text.Nose = param['Nose'];
    MPPlugin.text.Mouth = param['Mouth'];
    MPPlugin.text.FacialMark = param['FacialMark'];
    MPPlugin.text.BeastEars = param['BeastEars'];
    MPPlugin.text.Tail = param['Tail'];
    MPPlugin.text.Wing = param['Wing'];
    MPPlugin.text.Clothing = param['Clothing'];
    MPPlugin.text.Cloak = param['Cloak'];
    MPPlugin.text.AccA = param['AccA'];
    MPPlugin.text.AccB = param['AccB'];
    MPPlugin.text.Glasses = param['Glasses'];

    MPPlugin.colorText = [null];
    param = {"Color1":"Skin color","Color2":"Eye color","Color3":"Hair color","Color4":"Sub color","Color5":"Pattern color","Color6":"Animal ear color","Color7":"Main color","Color8":"Subcolor 1","Color9":"Subcolor 2","Color10":"Subcolor 3","Color11":"Main color","Color12":"Subcolor 1","Color13":"Main color","Color14":"Subcolor 1","Color15":"Subcolor 2","Color16":"Main color","Color17":"Subcolor 1","Color18":"Subcolor 2","Color19":"Subcolor 3","Color20":"Main color","Color21":"Subcolor 1","Color22":"Subcolor 2","Color23":"Tail color","Color24":"Feather color"};
    for (var i = 1; i <= 24; i++) {
        MPPlugin.colorText[i] = param['Color' + i];
    }

    //Advanced
    MPPlugin.GenerateSpeed = 32;
    MPPlugin.ManualColorIndexs = ["{\"RGB\":\"255,235,157\",\"ColorIndex\":\"17\"}","{\"RGB\":\"255,207,23\",\"ColorIndex\":\"17\"}"];
    for (var i = 0; i < MPPlugin.ManualColorIndexs.length; i++) {
        MPPlugin.ManualColorIndexs[i] = JSON.parse(MPPlugin.ManualColorIndexs[i]);
    }

    //Command
    MPPlugin.PluginCommands = {"SetCharGeneBaseKind":"SetCharGeneBaseKind","SetCharGeneDamage":"SetCharGeneDamage","StartCharEdit":"StartCharEdit"};

	//-------------------------------------------------------------------
	// Window_CharEdit_Category

	function Window_CharEdit_Category() {
		this.initialize.apply(this, arguments);
	}

	MPP.Window_CharEdit_Category = Window_CharEdit_Category;

	Window_CharEdit_Category.prototype = Object.create(Window_Command.prototype);
	Window_CharEdit_Category.prototype.constructor = Window_CharEdit_Category;

	Window_CharEdit_Category.prototype.initialize = function(rect, actor) {
		this._actor = actor;
		Window_Command.prototype.initialize.call(this, rect);
	};

	// REMOVED: windowWidth

	Window_CharEdit_Category.prototype.numVisibleRows = function() {
		var maxHeight = Graphics.boxHeight - 64 - this.itemPadding() * 2
		return Math.floor(maxHeight / this.itemHeight());
	};

	Window_CharEdit_Category.prototype.update = function() {
		Window_Command.prototype.update.call(this);
		if (this._partsWindow) {
			this._partsWindow.setCategory(this.currentSymbol());
		}
	};

	Window_CharEdit_Category.prototype.makeCommandList = function() {
		var list = MPPlugin.PartsList;
		var variation = $dataCharGene.icon[this._actor._geneKind];
		if (!variation) return;
		for (var i = 0; i < list.length; i++) {
			var symbol = list[i];
			if (variation[symbol] && variation[symbol].length > 0) {
				this.addCommand(MPPlugin.text[symbol], symbol);
			}
		}
		this.addCommand("Done", "done");
	};

	Window_CharEdit_Category.prototype.setPartsWindow = function(partsWindow) {
		this._partsWindow = partsWindow;
		this.update();
	};

	Window_CharEdit_Category.prototype.processOk = function() {
		if (this.isOkTriggered()) {
			Window_Command.prototype.processOk.call(this);
		}
	};

	//-----------------------------------------------------------------------------
	// Window_CharEdit_PartsList

	function Window_CharEdit_PartsList() {
		this.initialize.apply(this, arguments);
	}

	MPP.Window_CharEdit_PartsList = Window_CharEdit_PartsList;

	Window_CharEdit_PartsList.prototype = Object.create(Window_Selectable.prototype);
	Window_CharEdit_PartsList.prototype.constructor = Window_CharEdit_PartsList;

	Window_CharEdit_PartsList.prototype.initialize = function(rect, actor) {
		//var width = this.itemWidth() * this.maxCols() + this.standardPadding() * 2;
		//var height = this.itemHeight() * 2 + this.standardPadding() * 2;
		Window_Selectable.prototype.initialize.call(this, rect);
		this._actor = actor;
		this._category = 'none';
		this._data = [];
	};

	Window_CharEdit_PartsList.prototype.setCategory = function(category) {
		if (this._category !== category) {
			this._category = category;
			this.refresh();
			this.setTopRow(0);
			this.selectParts();
		}
	};

	Window_CharEdit_PartsList.prototype.maxCols = function() {
		return 4;
	};

	Window_CharEdit_PartsList.prototype.spacing = function() {
		return 0;
	};

	Window_CharEdit_PartsList.prototype.itemWidth = function() {
		return 72;
	};

	Window_CharEdit_PartsList.prototype.itemHeight = function() {
		return 72;
	};

	Window_CharEdit_PartsList.prototype.maxItems = function() {
		return this._data ? this._data.length : 1;
	};

	Window_CharEdit_PartsList.prototype.item = function() {
		var index = this.index();
		return this._data && index >= 0 ? this._data[index] : 0;
	};

	Window_CharEdit_PartsList.prototype.makeItemList = function() {
		var kind = this._actor._geneKind;
		var parts = (kind ? $dataCharGene.icon[kind] : null);
		var list = (parts ? parts[this._category] : null);
		this._data = (list ? list.clone() : []);
		if (!MPPlugin.ForceParts.contains(this._category)) {
			this._data.unshift(-1);
		}
	};

	Window_CharEdit_PartsList.prototype.selectParts = function() {
		var c = DATABASE.icon.indexOf(this._category);
		var p = this._actor._geneParts[c];
		var index = this._data.indexOf(p);
		this.select(index >= 0 ? index : 0);
	};

	Window_CharEdit_PartsList.prototype.update = function() {
		var lastIndex = this._index;
		Window_Selectable.prototype.update.call(this);
		if (this.isOpenAndActive() && lastIndex !== this._index) {
			this.setActorParts();
		}
		if (this._colorWindow) {
			this._colorWindow.setItem(this._category, this.item());
		}
	};

	Window_CharEdit_PartsList.prototype.getBitmap = function(index) {
		var p = this._data[index];
		if (p < 0) return null;
		var name = 'icon_' + this._category + '_p' + p.padZero(2);
		return ImageManager.loadGenerator('Variation', this._actor._geneKind, name);
	};

	Window_CharEdit_PartsList.prototype.setActorParts = function() {
		this._actor.setGeneParts(this._category, this.item());
	};

	Window_CharEdit_PartsList.prototype.drawItem = function(index) {
		var bitmap = this.getBitmap(index);
		if (bitmap) {
			var process = this.variationDrawer.bind(this, index, bitmap);
			if (process()) this.addUpdateDrawer(process);
		}
	};

	Window_CharEdit_PartsList.prototype.variationDrawer = function(index, bitmap) {
		if (bitmap.isReady()) {
			var rect = this.itemRect(index);
			var dx = rect.x + Math.floor((rect.width - 64) / 2);
			var dy = rect.y + Math.floor((rect.height - 64) / 2);
			this.contents.blt(bitmap, 0, 0, 64, 64, dx, dy);
			return false;
		} else if (bitmap._loadingState === 'purged') {
			bitmap.decode();
		}
		return true;
	};

	Window_CharEdit_PartsList.prototype.processOk = function() {
		if (this.isOkTriggered()) {
			Window_Selectable.prototype.processOk.call(this);
		}
	};

	Window_CharEdit_PartsList.prototype.processCancel = function() {
		if (this.isCancelTriggered()) {
			SoundManager.playCancel();
			this.updateInputData();
			this.deactivate();
			this.callHandler('keyCancel');
		} else {
			Window_Selectable.prototype.processCancel.call(this);
		}
	};

	Window_CharEdit_PartsList.prototype.setColorWindow = function(colorWindow) {
		this._colorWindow = colorWindow;
		this.update();
	};

	Window_CharEdit_PartsList.prototype.refresh = function() {
		this.clearUpdateDrawer();
		this.makeItemList();
		this.createContents();
		this.drawAllItems();
	};

	//-----------------------------------------------------------------------------
	// Window_CharEdit_ColorSlot

	function Window_CharEdit_ColorSlot() {
		this.initialize.apply(this, arguments);
	}

	MPP.Window_CharEdit_ColorSlot = Window_CharEdit_ColorSlot;

	Window_CharEdit_ColorSlot.prototype = Object.create(Window_Command.prototype);
	Window_CharEdit_ColorSlot.prototype.constructor = Window_CharEdit_ColorSlot;

	Window_CharEdit_ColorSlot.prototype.initialize = function(rect, actor) {
		this.clearCommandList();
		Window_Command.prototype.initialize.call(this, rect);
		this._actor = actor;
		this._category = 'none';
		this._parts = 0;
		this._colorLoaded = false;
		this._colorData = [];
		this.deactivate();
	};

	Window_CharEdit_ColorSlot.prototype.windowHeight = function() {
		return this.fittingHeight(this.numVisibleRows());
	};

	// REMOVED: windowWidth

	Window_CharEdit_ColorSlot.prototype.numVisibleRows = function() {
		return 4;
	};

	Window_CharEdit_ColorSlot.prototype.currentBottomY = function() {
		return this.y + $gameSystem.windowPadding() +
				Math.floor(this.index() / this.maxCols() + 1) * this.itemHeight() -
				this._scrollY;
	};

	Window_CharEdit_ColorSlot.prototype.setItem = function(category, parts) {
		if (this._category !== category || this._parts !== parts) {
			this._category = category;
			this._parts = parts;
			this.loadColorData();
			this.clearCommandList();
			this.makeItemList();
			this.checkColorData();
			this.refresh();
			this.select(0);
		}
	};

	Window_CharEdit_ColorSlot.prototype.loadColorData = function() {
		this._colorData = [];
		var kind = this._actor._geneKind;
		var cate = this._category;
		var parts = this._parts;
		if (DataManager.existGeneImage('TV', kind, cate, parts)) {
			var path = 'generator/TV/'+kind+'/TV_'+cate+'_p'+parts.padZero(2)+'.png';
			this._colorData.push(GenerateColors.get(path));
		}
		if (DataManager.existGeneImage('TV', kind, cate+'1', parts)) {
			var path = 'generator/TV/'+kind+'/TV_'+cate+'1_p'+parts.padZero(2)+'.png';
			this._colorData.push(GenerateColors.get(path));
		}
		if (DataManager.existGeneImage('TV', kind, cate+'2', parts)) {
			path = 'generator/TV/'+kind+'/TV_'+cate+'2_p'+parts.padZero(2)+'.png';
			this._colorData.push(GenerateColors.get(path));
		}
		this._colorLoaded = (this._colorData.length === 0);
	};

	Window_CharEdit_ColorSlot.prototype.update = function() {
		Window_Command.prototype.update.call(this);
		this.checkColorData();
	};

	Window_CharEdit_ColorSlot.prototype.checkColorData = function() {
		if (!this._colorLoaded && this.isColorReady()) {
			var colors = [];
			for (var n = 0; n < this._colorData.length; n++) {
				var data = this._colorData[n]._colorData;
				for (var m = 1; m < data.length; m += 2) {
					colors.push(data[m]);
				}
			}
			var list = this._list;
			for (var n = 1; n < list.length; n++) {
				list[n].enabled = colors.contains(list[n].ext);
			}
			this.refresh();
			this._colorLoaded = true;
		}
	};

	Window_CharEdit_ColorSlot.prototype.isColorReady = function() {
		for (var i = 0; i < this._colorData.length; i++) {
			if (!this._colorData[i].isReady()) return false;
		}
		return true;
	};

	Window_CharEdit_ColorSlot.prototype.processCancel = function() {
		if (this.isCancelTriggered()) {
			SoundManager.playCancel();
			this.updateInputData();
			this.deactivate();
			this.callHandler('keyCancel');
		} else {
			Window_Command.prototype.processCancel.call(this);
		}
	};

	Window_CharEdit_ColorSlot.prototype.makeItemList = function() {
		var list = DATABASE.partsColorNumbers[this._category] || [];
		for (var i = 0; i < list.length; i++) {
			var c = list[i];
			this.addCommand(MPPlugin.colorText[c], 'color', i === 0, c);
		}
	};

	Window_CharEdit_ColorSlot.prototype.refresh = function() {
		Window_Selectable.prototype.refresh.call(this);
	};

	Window_CharEdit_ColorSlot.prototype.drawItem = function(index) {
		var rect = this.itemRect(index);
		var name = this.commandName(index);
		var c = this._list[index].ext;
		this.resetTextColor();
		this.changePaintOpacity(this.isCommandEnabled(index));
		var data = this._actor._geneColors.slice(c * 4 - 4, c * 4);
		Method.drawColor.call(this, data, rect.x, rect.y, c);
		this.drawText(name, rect.x + 36, rect.y, rect.width - 36);
	};

	Method.drawColor = function(data, x, y, colorType) {
		this.contents.fillRect(x + 3, y + 3, 30, 30, 'rgba(0,0,0,0.5)');
		this.contents.fillRect(x + 4, y + 4, 28, 28, 'white');
		var c = data[0];
		if (c < 0) {
			for (var i = 0; i < 28; i++) {
				var dx = x + 4 + (i < 27 ? 28 - i - 2 : 0);
				var dw = (i === 0 || i === 27 ? 2 : 3);
				this.contents.fillRect(dx, y + 4 + i, dw, 1, 'red');
			}
		} else if (c >= 0) {
			var bitmap = ImageManager.loadGeneGradients(colorType);
			for (var i = 0; i < 26; i++) {
				var color = bitmap.getPixel(i * 5 + 5, c * 4);
				this.contents.fillRect(x + 5 + i, y + 5, 1, 26, color);
			}
		} else {
			var bitmap = Method.createGeneGradBitmap(data);
			for (var i = 0; i < 26; i++) {
				var color = bitmap.getPixel(i * 5 + 5, 0);
				this.contents.fillRect(x + 5 + i, y + 5, 1, 26, color);
			}
		}
	};

	Method.createGeneGradBitmap = function(data) {
		var bitmap = new Bitmap(256, 1);
		var context = bitmap.context;
		var gradient = context.createLinearGradient(0,0,256,0);
		gradient.addColorStop(0, 'rgb(%1,%2,%3)'.format(data[1], data[2], data[3]));
		gradient.addColorStop(0.5, 'rgb(%1,%2,%3)'.format(data[4], data[5], data[6]));
		gradient.addColorStop(1, 'rgb(%1,%2,%3)'.format(data[7], data[8], data[9]));
		context.fillStyle = gradient;
		context.fillRect(0, 0, 256, 1);
		return bitmap;
	};

	//-----------------------------------------------------------------------------
	// Window_CharEdit_ColorList

	function Window_CharEdit_ColorList() {
		this.initialize.apply(this, arguments);
	}

	MPP.Window_CharEdit_ColorList = Window_CharEdit_ColorList;

	Window_CharEdit_ColorList.prototype = Object.create(Window_Command.prototype);
	Window_CharEdit_ColorList.prototype.constructor = Window_CharEdit_ColorList;

	Window_CharEdit_ColorList.prototype.initialize = function(rect, actor) {
		Window_Command.prototype.initialize.call(this, rect);
		this.openness = 0;
		this._actor = actor;
		this.deactivate();
	};

	Window_CharEdit_ColorList.prototype.windowWidth = function() {
		return (this.itemWidth() + this.spacing()) * this.maxCols() -
				this.spacing() + this.itemPadding() * 2;
	};

	Window_CharEdit_ColorList.prototype.windowHeight = function() {
		return this.fittingHeight(this.numVisibleRows());
	};

	Window_CharEdit_ColorList.prototype.numVisibleRows = function() {
		return 5;
	};

	Window_CharEdit_ColorList.prototype.maxCols = function() {
		return 6;
	};

	Window_CharEdit_ColorList.prototype.spacing = function() {
		return 6;
	};

	Window_CharEdit_ColorList.prototype.itemWidth = function() {
		return 50;
	};

	Window_CharEdit_ColorList.prototype.cursorDown = function(wrap) {
		if (this.index() >= this.maxItems() - this.maxCols()) {
			this.select(this.maxItems() - 1);
		} else {
			Window_Command.prototype.cursorDown.call(this, wrap);
		}
	};

	Window_CharEdit_ColorList.prototype.makeCommandList = function() {
		var n = this._number;
		//this.addCommand(-1, 'color');
		var maxColors = ImageManager.loadGeneGradients(n).height / 4;
		for (var i = 0; i < maxColors; i++) {
			this.addCommand(i, 'color');
		}
		//this.addCommand(-2, 'custom');
	};

	Window_CharEdit_ColorList.prototype.setup = function(number) {
		this._number = number;
		this.refresh();
		var colorIndex = number > 0 ? this._actor._geneColors[number * 4 - 4] : 0;
		var index = 0;
		var list = this._list;
		for (var i = 0; i < list.length; i++) {
			if (list[i].name === colorIndex) {
				index = i;
				break;
			}
		}
		this.select(index);
		this.activate();
		this.open();
	};

	Window_CharEdit_ColorList.prototype.itemRect = function(index) {
		if (index >= 0 && this.commandSymbol(index) === 'custom') {
			var i = index - 1;
			var rect = new Rectangle();
			var maxCols = this.maxCols();
			rect.width = this.contentsWidth();
			rect.height = this.itemHeight();
			rect.x = 0;
			rect.y = Math.floor(i / maxCols + 1) * rect.height - this._scrollY;
			return rect;
		} else {
			return Window_Selectable.prototype.itemRect.call(this, index);
		}
	};

	Window_CharEdit_ColorList.prototype.update = function() {
		var lastIndex = this._index;
		Window_Selectable.prototype.update.call(this);
		if (this.isOpenAndActive() && lastIndex !== this._index) {
			this.setActorColor();
		}
	};

	Window_CharEdit_ColorList.prototype.setActorColor = function() {
		if (this.currentSymbol() === 'color') {
			this._actor.setGeneColor(this._number, this.commandName(this.index()));
		}
	};

	Window_CharEdit_ColorList.prototype.drawAllItems = function() {
    const topIndex = this.topIndex();
    for (let i = 0; i < this.maxVisibleItems(); i++) {
        const index = topIndex + i;
        if (index < this.maxItems()) {
            //this.drawItemBackground(index);
            this.drawItem(index);
        }
    }
};

	Window_CharEdit_ColorList.prototype.drawItem = function(index) {
		var c = this.commandName(index);
		var rect = this.itemRect(index);
		if (c === -2) {
			this.drawText(MPPlugin.text.Custom, rect.x, rect.y, rect.width, 'center');
		} else {
			Method.drawColor.call(this, [c], rect.x, rect.y, this._number);
		}
	};

	//-----------------------------------------------------------------------------
	// Window_CharEdit_ColorCustom

	function Window_CharEdit_ColorCustom() {
		this.initialize.apply(this, arguments);
	}

	MPP.Window_CharEdit_ColorCustom = Window_CharEdit_ColorCustom;

	Window_CharEdit_ColorCustom.prototype = Object.create(Window_Selectable.prototype);
	Window_CharEdit_ColorCustom.prototype.constructor = Window_CharEdit_ColorCustom;

	Window_CharEdit_ColorCustom.prototype.initialize = function(rect, actor) {
		Window_Selectable.prototype.initialize.call(this, rect);
		this.openness = 0;
		this._actor = actor;
		this._colors = [0,0,0, 0,0,0, 0,0,0];
	};

	Window_CharEdit_ColorCustom.prototype.maxCols = function() {
		return 3;
	};

	Window_CharEdit_ColorCustom.prototype.maxItems = function() {
		return 3;
	};

	Window_CharEdit_ColorCustom.prototype.spacing = function() {
		return 36;
	};

	Window_CharEdit_ColorCustom.prototype.setup = function(number) {
		this._number = number;
		this._actor.setGeneColor(number, -2);
		this.refresh();
		this.select(1);
		this.activate();
		this.open();
	};

	Window_CharEdit_ColorCustom.prototype.itemRect = function(index) {
		var rect = Window_Selectable.prototype.itemRect.call(this, index);
		rect.y += rect.height;
		return rect;
	};

	Window_CharEdit_ColorCustom.prototype.drawItem = function(index) {
		var name = MPPlugin.text.CustomCommands[index];
		var rect = this.itemRect(index);
		this.drawText(name, rect.x, rect.y, rect.width, 'center');
	};

	Window_CharEdit_ColorCustom.prototype.refresh = function() {
		Window_Selectable.prototype.refresh.call(this);
		var x = 12;
		var width = this.contentsWidth() - 24;
		var height = this.lineHeight() - 6;
		var n = this._number;
		var c = this._actor._geneColors.slice(n * 4 - 3, n * 4);
		var context = this.contents.context;
		var gradient = context.createLinearGradient(x,3, x + width, 3);
		gradient.addColorStop(0, 'rgb(%1,%2,%3)'.format(c[0], c[1], c[2]));
		gradient.addColorStop(0.5, 'rgb(%1,%2,%3)'.format(c[3], c[4], c[5]));
		gradient.addColorStop(1, 'rgb(%1,%2,%3)'.format(c[6], c[7], c[8]));
		context.fillStyle = gradient;
		context.fillRect(x, 3, width, height);
	};

	//-----------------------------------------------------------------------------
	// Window_CharEdit_ColorRgb

	function Window_CharEdit_ColorRgb() {
		this.initialize.apply(this, arguments);
	}

	MPP.Window_CharEdit_ColorRgb = Window_CharEdit_ColorRgb;

	Window_CharEdit_ColorRgb.prototype = Object.create(Window_Selectable.prototype);
	Window_CharEdit_ColorRgb.prototype.constructor = Window_CharEdit_ColorRgb;

	Window_CharEdit_ColorRgb.prototype.initialize = function(rect, actor) {
		Window_Selectable.prototype.initialize.call(this, rect);
		this.openness = 0;
		this._actor = actor;
		this._color = [0,0,0];
		this._sliderIndex = -1;
	};

	Window_CharEdit_ColorRgb.prototype.maxItems = function() {
		return 4;
	};

	Window_CharEdit_ColorRgb.prototype.itemWidth = function() {
		return 288;
	};

	Window_CharEdit_ColorRgb.prototype.isOpenAndActive = function() {
		return Window_Selectable.prototype.isOpenAndActive.call(this) &&
				this._sliderIndex < 0;
	};

	Window_CharEdit_ColorRgb.prototype.cursorRight = function() {
		var index = this.index();
		if (index < 3 && this._color[index] < 255) {
			this._color[index] = Math.min(this._color[index] + 17, 255);
			SoundManager.playCursor();
			this.redrawCurrentItem();
		}
	};

	Window_CharEdit_ColorRgb.prototype.cursorLeft = function() {
		var index = this.index();
		if (index < 3 && this._color[index] > 0) {
			this._color[index] = Math.max(this._color[index] - 17, 0);
			SoundManager.playCursor();
			this.redrawCurrentItem();
		}
	};

	Window_CharEdit_ColorRgb.prototype.setup = function(n1, n2) {
		if (this._customWindow) {
			var window = this._customWindow;
			this.x = window.x + Math.floor((window.width - this.width) * n2 / 2);
			this.y = window.y + window.height;
		}
		this._number1 = n1;
		this._number2 = n2;
		var n = (n1 - 1) * 10 + 1 + n2 * 3;
		this._color = this._actor._geneColors.slice(n, n + 3);
		this.refresh();
		this.select(0);
		this.activate();
		this.open();
	};

	Window_CharEdit_ColorRgb.prototype.setActorColor = function() {
		var c = this._color;
		this._actor.setGeneColorCustom(this._number1, this._number2, c[0], c[1], c[2]);
	};

	Window_CharEdit_ColorRgb.prototype.update = function() {
		Window_Selectable.prototype.update.call(this);
		this.updateSlider();
	};

	Window_CharEdit_ColorRgb.prototype.updateSlider = function() {
		if (this._sliderIndex < 0) {
			var index = this.index();
			if (index < 3 && TouchInput.isTriggered()) {
				var tx = this.canvasToLocalX(TouchInput.x) - this.standardPadding() - 88;
				if (tx >= 0 && tx < 192) {
					SoundManager.playCursor();
					this._sliderIndex = index;
				}
			}
		}
		if (this._sliderIndex >= 0) {
			if (TouchInput.isPressed()) {
				var index = this.index();
				var lc = this._color[index];
				var tx = this.canvasToLocalX(TouchInput.x) - this.standardPadding();
				tx -= 88 + 4;
				var tw = 192 - 8;
				var c = Math.round(255 * tx / tw / 17) * 17;
				this._color[index] = c.clamp(0, 255);
				if (lc !== this._color[index]) {
					this.redrawCurrentItem();
				}
			} else {
				this._sliderIndex = -1;
			}
		}
	};

	Window_CharEdit_ColorRgb.prototype.processOk = function() {
		if (this.index() === 3) {
			Window_Selectable.prototype.processOk.call(this);
		}
	};

	Window_CharEdit_ColorRgb.prototype.drawItem = function(index) {
		var rect = this.itemRect(index);
		if (index < 3) {
			var name, color;
			if (index === 0) {
				name = 'R:';
				color = 'red';
			} else if (index === 1) {
				name = 'G:';
				color = 'lime';
			} else {
				name = 'B:';
				color = 'blue';
			}
			var c = this._color[index];
			this.drawText(name + c, rect.x + 6, rect.y, rect.width);
			var dx = rect.x + 88;
			var dy = rect.y + Math.floor(rect.height / 2);
			this.drawSlider(dx, dy, 192, 8, c / 255, color);
			return;
		} else {
			this.drawText(MPPlugin.text.Ok, rect.x + 6, rect.y, rect.width, 'center');
		}
	};

	Window_CharEdit_ColorRgb.prototype.drawSlider = function(x, y, width, height, value, color) {
		var context = this.contents.context;
		var dx = x + height / 2;
		var dw = width - height;
		context.save();

		context.strokeStyle = 'gray';
		context.lineWidth = height;
		context.lineCap = 'round';
		context.beginPath();
		context.moveTo(dx, y);
		context.lineTo(dx + dw, y);
		context.stroke();
		var gradient = context.createLinearGradient(x, y, x + width, y);
		gradient.addColorStop(0, 'white');
		gradient.addColorStop(1, color);
		context.strokeStyle = gradient;
		context.lineWidth = height - 2;
		context.stroke();

		context.restore();

		var vx = dx + dw * value;
		context.fillStyle = 'gainsboro';
		context.shadowColor = 'black';
		context.shadowOffsetX = 1;
		context.shadowOffsetY = 1;
		context.shadowBlur = 6;
		context.beginPath();
		context.arc(vx, y, 9, 0, Math.PI * 2);
		context.fill();
		context.strokeStyle = 'gray';
		context.shadowColor = 'rgba(0,0,0,0)';
		context.stroke();

		context.restore();
		this.contents._setDirty();
	};

	Window_CharEdit_ColorRgb.prototype.redrawItem = function(index) {
		Window_Selectable.prototype.redrawItem.call(this, index);
		this.refreshColor();
	};

	Window_CharEdit_ColorRgb.prototype.refresh = function() {
		Window_Selectable.prototype.refresh.call(this);
		this.refreshColor();
	};

	Window_CharEdit_ColorRgb.prototype.refreshColor = function() {
		var x = 288 + 2;
		var y = 2;
		var width = this.contentsWidth() - x - 2;
		var height = this.lineHeight() * 3 - 4;
		this.contents.clearRect(x, y, width, height);
		this.contents.fillRect(x, y, width, height, 'black');
		this.contents.fillRect(x+1, y+1, width-2, height-2, 'white');
		var color = 'rgb(%1)'.format(this._color.join());
		this.contents.fillRect(x+2, y+2, width-4, height-4, color);
	};

	//-----------------------------------------------------------------------------
	// Window_CharEdit_Preview

	function Window_CharEdit_Preview() {
		this.initialize.apply(this, arguments);
	}

	MPP.Window_CharEdit_Preview = Window_CharEdit_Preview;

	Window_CharEdit_Preview.prototype = Object.create(Window_StatusBase.prototype);
	Window_CharEdit_Preview.prototype.constructor = Window_CharEdit_Preview;

	Window_CharEdit_Preview._directionPattern = [2, 4, 8, 6];
	Window_CharEdit_Preview._battlerPattern = [0, 7, 2, 10];

	Window_CharEdit_Preview.prototype.initialize = function(rect, actor) {
		Window_Base.prototype.initialize.call(this, rect);
		this._actor = actor;
		this._animeCount = 0;
		this._animeIndex = 0;
		this._animePattern = 0;
	};

	Window_CharEdit_Preview.prototype.windowWidth = function() {
		return this.itemX(MPPlugin.PreviewList.length) + this.itemPadding() * 2;
	};

	Window_CharEdit_Preview.prototype.windowHeight = function() {
		return 144 + $gameSystem.windowPadding() * 2;
	};

	Window_CharEdit_Preview.prototype.itemX = function(index) {
		var x = 0;
		for (var i = 0; i < index; i++) {
			x += this.itemWidth(i);
		}
		return x;
	};

	Window_CharEdit_Preview.prototype.itemWidth = function(index) {
		return (MPPlugin.PreviewList[index] === "TV3" ? 216 : 144);
	};

	Window_CharEdit_Preview.prototype.update = function() {
		Window_Base.prototype.update.call(this);
		if (this._characterName !== this._actor.characterName()) {
			this._characterName = this._actor.characterName();
			this.redrawAllItem();
		}
		this._animeCount++;
		if (this._animeCount === 24) {
			this._animeCount = 0;
			this._animePattern++;
			if (this._animePattern === 8) {
				this._animePattern = 0;
				this._animeIndex = (this._animeIndex + 1) % 4;
			}
		}
	};

	Window_CharEdit_Preview.prototype.refresh = function() {
		this.contents.clear();
		this.redrawAllItem();
	};

	Window_CharEdit_Preview.prototype.redrawAllItem = function() {
		this.clearUpdateDrawer();
		for (var i = 0; i < MPPlugin.PreviewList.length; i++) {
			this.redrawItem(i);
		}
	};

	Window_CharEdit_Preview.prototype.redrawItem = function(index) {
		var actor = this._actor;
		var bitmap;
		switch (MPPlugin.PreviewList[index]) {
			case 'TV': case 'TV2': case 'TV3':
				bitmap = ImageManager.loadCharacter(actor.characterName());
				break;
			case 'SV':
				bitmap = ImageManager.loadSvActor(actor.battlerName());
				break;
			case 'FG':
				bitmap = ImageManager.loadFace(actor.faceName());
				break;
		}
		if (bitmap) {
			if (!bitmap.isReady()) {
				this.drawLoading(index);
			}
			var process = this.itemDrawer.bind(this, index, bitmap);
			if (process()) this.addUpdateDrawer(process);
		}
	};

	Window_CharEdit_Preview.prototype.redrawItem2 = function(index) {
		var x = this.itemX(index);
		var width = this.itemWidth(index);
		this.contents.clearRect(x, 0, width, 144);
		switch (MPPlugin.PreviewList[index]) {
			case 'TV':
				var d = Window_CharEdit_Preview._directionPattern[this._animeIndex];
				this.drawActorCharacter(this._actor, x + 72, 128, d, 2);
				break;
			case 'TV2':
				this.drawActorCharacter(this._actor, x + 36, 68, 2, 4/3);
				this.drawActorCharacter(this._actor, x + 108, 68, 8, 4/3);
				this.drawActorCharacter(this._actor, x + 36, 140, 4, 4/3);
				this.drawActorCharacter(this._actor, x + 108, 140, 6, 4/3);
				break;
			case 'TV3':
				this.drawActorCharacter(this._actor, x + 36, 104+4, 4, 1.5);
				this.drawActorCharacter(this._actor, x + 108, 68+4, 8, 1.5);
				this.drawActorCharacter(this._actor, x + 108, 140+4, 2, 1.5);
				this.drawActorCharacter(this._actor, x + 180, 104+4, 6, 1.5);
				break;
			case 'SV':
				this.drawActorBattler(this._actor, x + 72, 136, 2);
				break;
			case 'FG':
				this.drawActorFace(this._actor, x, 0, Window_Base._faceWidth, Window_Base._faceHeight);
				break;
		}
	};

	Window_CharEdit_Preview.prototype.itemDrawer = function(index, bitmap) {
		if (bitmap.isReady() && this._animeCount === 0) {
			this.redrawItem2(index);
		}
		return true;
	};

	Window_CharEdit_Preview.prototype.drawLoading = function(index) {
		if (index >= 0) {
			var text = MPPlugin.text.Loading;
			var dx = this.itemX(index);
			var dy = Math.floor((144 - this.lineHeight()) / 2);
			var dw = this.itemWidth(index);
			this.drawText(text, dx, dy, dw, 'center');
		}
	};

	Window_CharEdit_Preview.prototype.drawCharacter = function(characterName, characterIndex, x, y, direction, rate) {
		var bitmap = ImageManager.loadCharacter(characterName);
		var big = ImageManager.isBigCharacter(characterName);
		var pw = bitmap.width / (big ? 3 : 3);
		var ph = bitmap.height / (big ? 4 : 4);
		var pattern = this._animePattern % 4;
		pattern = (pattern < 3 ? pattern : 1);
		var d = (direction - 2) / 2;
		var sx = (characterIndex % 4 * 3 + pattern) * pw;
		var sy = (Math.floor(characterIndex / 4) * 4 + d) * ph;
		var dw = pw * rate, dh = ph * rate;
		this.contents.blt(bitmap, sx, sy, pw, ph, x - dw / 2, y - dh, dw, dh);
	};

	Window_CharEdit_Preview.prototype.drawActorCharacter = function(actor, x, y, direction, rate) {
		this.drawCharacter(actor.characterName(), actor.characterIndex(), x, y, direction, rate || 1);
	};

	Window_CharEdit_Preview.prototype.drawActorBattler = function(actor, x, y, rate) {
		var bitmap = ImageManager.loadSvActor(actor.battlerName())
		var motionIndex = Window_CharEdit_Preview._battlerPattern[this._animeIndex];
		var pattern = this._animePattern % 4;
		pattern = (pattern < 3 ? pattern : 1);
		var cw = bitmap.width / 9;
		var ch = bitmap.height / 6;
		var cx = Math.floor(motionIndex / 6) * 3 + pattern;
		var cy = motionIndex % 6;
		var dw = cw * rate, dh = ch * rate;
		this.contents.blt(bitmap, cx * cw, cy * ch, cw, ch, x - dw / 2, y - dh, dw, dh);
	};

	//-----------------------------------------------------------------------------
	// Window_CharEdit_Random

	function Window_CharEdit_Random() {
		this.initialize.apply(this, arguments);
	}

	MPP.Window_CharEdit_Random = Window_CharEdit_Random;

	Window_CharEdit_Random.prototype = Object.create(Window_Base.prototype);
	Window_CharEdit_Random.prototype.constructor = Window_CharEdit_Random;

	Window_CharEdit_Random.prototype.initialize = function(rect) {
		Window_Base.prototype.initialize.call(this, rect);
		var text = MPPlugin.text.Random;
		var allPadding = (this.textPadding() + this.standardPadding()) * 2;
		this.width = this.textWidth(text) + allPadding;
		this.setBackgroundType(MPPlugin.RandomBackgroundType);
		this.createContents();
		this.refresh();
	};

	Window_CharEdit_Random.prototype.standardPadding = function() {
		return 8;
	};

	Window_CharEdit_Random.prototype.textPadding = function() {
		return 12;
	};

	Window_CharEdit_Random.prototype.textWidthEx = function(text) {
		return this.drawTextEx(text, 0, this.contents.height);
	};

	Window_CharEdit_Random.prototype.refresh = function() {
		this.contents.clear();
		this.drawTextEx(MPPlugin.text.Random, this.textPadding(), 0);
	};

	Window_CharEdit_Random.prototype.update = function() {
		Window_Base.prototype.update.call(this);
		this.processHandling();
	};

	Window_CharEdit_Random.prototype.processHandling = function() {
		if (this.isOpen() && this.active) {
			if (Input.isTriggered('shift') ||
					(TouchInput.isTriggered() && this.isTouchedInsideFrame())) {
				this.processOk();
			}
		}
	};

	Window_CharEdit_Random.prototype.isTouchedInsideFrame = function() {
		return Window_Selectable.prototype.isTouchedInsideFrame.call(this);
	};

	Window_CharEdit_Random.prototype.processOk = function() {
		if (this._randomHandler) {
			AudioManager.playStaticSe(MPPlugin.RandomSE);
			Input.update();
			TouchInput.update();
			this._randomHandler();
		}
	};

	function Window_CharEdit_Done() {
		this.initialize.apply(this, arguments);
	}

	MPP.Window_CharEdit_Done = Window_CharEdit_Done;

	Window_CharEdit_Done.prototype = Object.create(Window_Command.prototype);
	Window_CharEdit_Done.prototype.constructor = Window_CharEdit_Done;

	Window_CharEdit_Done.prototype.initialize = function(rect) {
		Window_Command.prototype.initialize.call(this, rect);
	};

	Window_CharEdit_Done.prototype.makeCommandList = function() {
		this.addCommand("Done", "done");
	};

	//-----------------------------------------------------------------------------
	// Scene_CharacterEdit

	function Scene_CharacterEdit() {
		this.initialize.apply(this, arguments);
	}

	MPP.Scene_CharacterEdit = Scene_CharacterEdit;

	Scene_CharacterEdit.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_CharacterEdit.prototype.constructor = Scene_CharacterEdit;

	Scene_CharacterEdit.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_CharacterEdit.prototype.prepare = function(tempActor) {
		this._tempActor = tempActor;
	};
	Scene_CharacterEdit.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this._switchWindows = [];
		this.createRandomWindow();
		this.createCategoryWindow();
		this.createPartsWindow();
		this.createPreviewWindow();
		this.createDoneWindow();
		if (MPPlugin.EditColor) {
			this.createColorSlotWindow();
			this.createColorListWindow();
			//this.createColorCustomWindow();
			//this.createColorRgbWindow();
		}
	};

	Scene_CharacterEdit.prototype.updateActor = function() {
		Scene_MenuBase.prototype.updateActor.call(this);
		if (!this._tempActor) {
			this._tempActor = JsonEx.makeDeepCopy(this._actor);
			this._tempActor.initEquips([]);
		}
		this._tempActor.refreshImageName();
	};

	Scene_CharacterEdit.prototype.createRandomWindow = function() {
		const rect = this.charEditRandomRect();
		this._randomWindow = new Window_CharEdit_Random(rect);
		this._randomWindow.x = Graphics.boxWidth - this._randomWindow.width;
		this._randomWindow.y = Graphics.boxHeight - this._randomWindow.height;
		this._randomWindow._randomHandler = this.processRandom.bind(this);
		this.addWindow(this._randomWindow);
	};

	Scene_CharacterEdit.prototype.charEditRandomRect = function() {
		const x = 0;
		const y = 0;
		const width = 0;
		const height = this.calcWindowHeight(1, false);
		return new Rectangle(x, y, width, height);
	};

	Scene_CharacterEdit.prototype.createCategoryWindow = function() {
		const rect = this.charEditCategoryRect();
		this._categoryWindow = new Window_CharEdit_Category(rect, this._tempActor);
		this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
		this._categoryWindow.setHandler('cancel', this.onEditCancel.bind(this));
		this._categoryWindow.setHandler('done', this.onEditCancel.bind(this));
		this.addWindow(this._categoryWindow);
		this._switchWindows.push(this._categoryWindow);
	};

	Scene_CharacterEdit.prototype.charEditCategoryRect = function() {
		const x = 32;
		const y = Imported.VisuMZ_0_CoreEngine ? 60 : 32;
		const width = 200;
		const height = this.mainAreaHeight();
		return new Rectangle(x, y, width, height);
	};

	Scene_CharacterEdit.prototype.createPartsWindow = function() {
		const rect = this.charEditPartsListRect();
		this._partsWindow = new Window_CharEdit_PartsList(rect, this._tempActor);
		const win = this._partsWindow;
		win.width = win.itemWidth() * win.maxCols() + win.itemPadding() * 2;
		win.height = win.itemHeight() * 2 + $gameSystem.windowPadding() * 2;
		this._partsWindow.setHandler('ok',        this.onPartsOk.bind(this));
		this._partsWindow.setHandler('keyCancel', this.onPartsCancel.bind(this));
		this._partsWindow.setHandler('cancel',    this.onEditCancel.bind(this));
		this.addWindow(this._partsWindow);
		this._categoryWindow.setPartsWindow(this._partsWindow);
		this._switchWindows.push(this._partsWindow);
	};

	Scene_CharacterEdit.prototype.charEditPartsListRect = function() {
		const x = this._categoryWindow.x + this._categoryWindow.width;
		const y = this._categoryWindow.y;
		const width = 0;
		const height = 0;
		return new Rectangle(x, y, width, height);
	};

	Scene_CharacterEdit.prototype.createPreviewWindow = function() {
		const rect = this.charEditPreviewRect();
		this._previewWindow = new Window_CharEdit_Preview(rect, this._tempActor);
		const win = this._previewWindow;
		win.width = win.windowWidth();
		win.height = win.windowHeight();
		win.createContents();
		var window = this._categoryWindow;
		this._previewWindow.y = window.y + window.height - this._previewWindow.height;
		this.addWindow(this._previewWindow);
	};

	Scene_CharacterEdit.prototype.charEditPreviewRect = function() {
		const x = this._partsWindow.x;
		const y = 0;
		const width = 0;
		const height = 0;
		return new Rectangle(x, y, width, height);
	};

	Scene_CharacterEdit.prototype.createDoneWindow = function() {
		const rect = this.charEditDoneRect();
		this._doneWindow = new Window_CharEdit_Done(rect);
		this._doneWindow.setHandler('done', this.onEditCancel.bind(this));
		this.addWindow(this._doneWindow);
	};

	Scene_CharacterEdit.prototype.charEditDoneRect = function() {
		const x = this._categoryWindow.x;
		const y = this._categoryWindow.y + this._categoryWindow.height;
		const width = this._categoryWindow.width;
		const height = this.calcWindowHeight(1, true);
		return new Rectangle(x, y, width, height);
	};

	Scene_CharacterEdit.prototype.createColorSlotWindow = function() {
		const rect = this.charEditColorSlotRect();
		this._colorSlotWindow = new Window_CharEdit_ColorSlot(rect, this._tempActor);
		this._colorSlotWindow.height = this._colorSlotWindow.windowHeight();
		this._partsWindow.height = this._colorSlotWindow.height;
		this._colorSlotWindow.setHandler('ok',        this.onColorSlotOk.bind(this));
		this._colorSlotWindow.setHandler('keyCancel', this.onColorSlotCancel.bind(this));
		this._colorSlotWindow.setHandler('cancel',    this.onEditCancel.bind(this));
		this._colorSlotWindow.createContents();
		this.addWindow(this._colorSlotWindow);
		this._partsWindow.setColorWindow(this._colorSlotWindow);
		this._switchWindows.push(this._colorSlotWindow);
	};

	Scene_CharacterEdit.prototype.charEditColorSlotRect = function() {
		const x = this._partsWindow.x + this._partsWindow.width;
		const y = this._partsWindow.y;
		const width = Math.max(Graphics.boxWidth - x - 32, 96);
		const height = 0;
		return new Rectangle(x, y, width, height);
	};

	Scene_CharacterEdit.prototype.createColorListWindow = function() {
		const rect = this.charEditColorListRect();
		this._colorListWindow = new Window_CharEdit_ColorList(rect, this._tempActor);
		const win = this._colorListWindow;
		win.width = win.windowWidth();
		win.height = win.windowHeight();
		win.createContents();
		this._colorListWindow.setHandler('ok',     this.onColorListOk.bind(this));
		this._colorListWindow.setHandler('cancel', this.onColorListCancel.bind(this));
		this.addWindow(this._colorListWindow);
	};

	Scene_CharacterEdit.prototype.charEditColorListRect = function() {
		const x = this._colorSlotWindow.x;
		const y = 0;
		const width = 0;
		const height = 0;
		return new Rectangle(x, y, width, height);
	};

	Scene_CharacterEdit.prototype.createColorCustomWindow = function() {
		const rect = this.charEditColorCustomRect();
		this._colorCustomWindow = new Window_CharEdit_ColorCustom(rect, this._tempActor);
		this._colorCustomWindow.setHandler('ok',     this.onColorCustomOk.bind(this));
		this._colorCustomWindow.setHandler('cancel', this.onColorCustomCancel.bind(this));
		this.addWindow(this._colorCustomWindow);
	};

	Scene_CharacterEdit.prototype.charEditColorCustomRect = function() {
		const x = this._categoryWindow.x + this._categoryWindow.width;
		const y = this._partsWindow.y + this._partsWindow.height;
		const width = this._partsWindow.width + this._colorSlotWindow.width;
		const height = this.calcWindowHeight(2, true);
		return new Rectangle(x, y, width, height);
	};

	Scene_CharacterEdit.prototype.createColorRgbWindow = function() {
		const rect = this.charEditColorRgbRect();
		this._colorRgbWindow = new Window_CharEdit_ColorRgb(rect, this._tempActor);
		this._colorRgbWindow.setHandler('ok',     this.onColorRgbOk.bind(this));
		this._colorRgbWindow.setHandler('cancel', this.onColorRgbCancel.bind(this));
		this._colorRgbWindow._customWindow = this._colorCustomWindow;
		this.addWindow(this._colorRgbWindow);
	};

	Scene_CharacterEdit.prototype.charEditColorRgbRect = function() {
		const x = 0;
		const y = 0;
		const width = 382;
		const height = this.calcWindowHeight(4, true);
		return new Rectangle(x, y, width, height);
	};

	Scene_CharacterEdit.prototype.update = function() {
		this.updateWindowSwitch();
		Scene_Base.prototype.update.call(this);
		this.updateCallDebug();
	};

	Scene_CharacterEdit.prototype.updateWindowSwitch = function() {
		if (TouchInput.isTriggered()) {
			var windows = this._switchWindows;
			if (windows.some(function(window) { return window.active; })) {
				var touchWindow = null;
				for (var i = 0; i < windows.length; i++) {
					if (windows[i].isTouchedInsideFrame()) {
						touchWindow = windows[i];
					}
				}
				if (touchWindow && !touchWindow.active) {
					for (var i = 0; i < windows.length; i++) {
						if (windows[i] === touchWindow) {
							windows[i].activate();
						} else {
							windows[i].deactivate();
						}
					}
				}
			}
		}
	};

	Scene_CharacterEdit.prototype.updateCallDebug = function() {
		if (this.isDebugCalled()) {
			var text = "";
			text += '<geneDef Parts:' + this._tempActor._geneParts + '>\n';
			if (MPPlugin.EditColor) {
				var geneColors = this._tempActor._geneColors;
				for (var i = 0; i < 24; i++) {
					var index = geneColors[i * 10];
					var baseName = '<geneDef Color ' + (i + 1) + ':';
					if (index === -2) {
						text += baseName + geneColors.slice(i * 10, i * 10 + 9) + '>\n';
					} else if (index >= 0) {
						text += baseName + index + '>\n';
					}
				}
			}
			console.log(text);
		}
	};

	Scene_CharacterEdit.prototype.isDebugCalled = function() {
		return Input.isTriggered('debug') && $gameTemp.isPlaytest();
	};

	Scene_CharacterEdit.prototype.onEditCancel = function() {
		if (MPPlugin.ConfirmationScene &&
				(!this._actor._geneParts.equals(this._tempActor._geneParts) ||
				!this._actor._geneColors.equals(this._tempActor._geneColors))) {
			SceneManager.push(Scene_Confirm);
			SceneManager.prepareNextScene(this._tempActor);
		} else {
			this._actor._geneParts = this._tempActor._geneParts;
			this._actor._geneColors = this._tempActor._geneColors;
			this._actor.refreshImageName();
			this.popScene();
		}
	};

	Scene_CharacterEdit.prototype.onCategoryOk = function() {
		this._partsWindow.activate();
	};

	Scene_CharacterEdit.prototype.onPartsOk = function() {
		if (this._colorSlotWindow) {
			this._colorSlotWindow.activate();
		} else {
			this._categoryWindow.activate();
		}
	};

	Scene_CharacterEdit.prototype.onPartsCancel = function() {
		this._categoryWindow.activate();
	};

	Scene_CharacterEdit.prototype.onColorSlotOk = function() {
		this._colorListWindow.y = this._colorSlotWindow.currentBottomY();
		this._colorListWindow.setup(this._colorSlotWindow.currentExt());
		this._randomWindow.deactivate();
	};

	Scene_CharacterEdit.prototype.onColorSlotCancel = function() {
		this._partsWindow.activate();
	};

	Scene_CharacterEdit.prototype.onColorListOk = function() {
		if (this._colorListWindow.currentSymbol() === 'color') {
			this._colorSlotWindow.activate();
			this._colorSlotWindow.refresh();
			this._colorListWindow.close();
			this._randomWindow.activate();
		} else {
			this._colorListWindow.close();
			this._colorCustomWindow.setup(this._colorSlotWindow.currentExt());
		}
	};

	Scene_CharacterEdit.prototype.onColorListCancel = function() {
		this._colorSlotWindow.activate();
		this._colorSlotWindow.refresh();
		this._colorListWindow.close();
		this._randomWindow.activate();
	};

	Scene_CharacterEdit.prototype.onColorCustomOk = function() {
		var n1 = this._colorSlotWindow.currentExt();
		var n2 = this._colorCustomWindow.index();
		this._colorRgbWindow.setup(n1, n2);
	};

	Scene_CharacterEdit.prototype.onColorCustomCancel = function() {
		this._colorSlotWindow.activate();
		this._colorSlotWindow.refresh();
		this._colorCustomWindow.close();
		this._randomWindow.activate();
	};

	Scene_CharacterEdit.prototype.onColorRgbOk = function() {
		this._colorRgbWindow.setActorColor();
		this._colorCustomWindow.refresh();
		this._colorCustomWindow.activate();
		this._colorRgbWindow.close();
	};

	Scene_CharacterEdit.prototype.onColorRgbCancel = function() {
		this._colorCustomWindow.activate();
		this._colorRgbWindow.close();
	};

	Scene_CharacterEdit.prototype.processRandom = function() {
		var partsList = MPPlugin.RandomPartsList;
		var variation = $dataCharGene.icon[this._tempActor._geneKind];
		for (var i = 0; i < partsList.length; i++) {
			var name = partsList[i];
			var list = variation[name];
			if (list && list.length > 0) {
				if (!MPPlugin.ForceParts.contains(name)) {
					list = list.clone();
					list.push(-1);
				}
				this._tempActor.setGeneParts(name, list[Math.randomInt(list.length)], true);
			}
		}
		if (MPPlugin.EditColor) {
			var colorList = MPPlugin.RandomColorList;
			for (var i = 0; i < colorList.length; i++) {
				var n = colorList[i];
				var start = DATABASE.gradients[n * 2] || 0;
				var max = DATABASE.gradients[n * 2 + 1] || 0;
				if (max > 0) {
					var c = Math.randomInt(max + 1);
					c = (c === max ? -1 : start + c);
					this._tempActor.setGeneColor(n, c);
				}
			}
		}
		this._tempActor.refreshImageName();
		this._partsWindow.selectParts();
		if (this._colorSlotWindow) this._colorSlotWindow.refresh();
	};

	//=============================================================================
	// Scene_Confirm
	//=============================================================================

	//-----------------------------------------------------------------------------
	// Window_Confirm

	function Window_Confirm() {
		this.initialize.apply(this, arguments);
	}

	Window_Confirm.prototype = Object.create(Window_Base.prototype);
	Window_Confirm.prototype.constructor = Window_Confirm;

	Window_Confirm.prototype.initialize = function(rect) {
		Window_Base.prototype.initialize.call(this, rect);
		this.openness = 0;
		this.refresh();
		this.open();
	};

	Window_Confirm.prototype.standardPadding = function() {
		return 12;
	};

	Window_Confirm.prototype.refresh = function() {
		this.contents.clear();
		this.drawText(MPPlugin.text.Confirmation, 0, 0, this.contentsWidth(), 'center');
	};

	//-----------------------------------------------------------------------------
	// Window_ConfirmCommand

	function Window_ConfirmCommand() {
		this.initialize.apply(this, arguments);
	}

	Window_ConfirmCommand.prototype = Object.create(Window_Command.prototype);
	Window_ConfirmCommand.prototype.constructor = Window_ConfirmCommand;

	Window_ConfirmCommand.prototype.initialize = function(rect) {
		Window_Command.prototype.initialize.call(this, rect);
		this.openness = 0;
		this.open();
	};

	Window_ConfirmCommand.prototype.windowWidth = function() {
		return 0;
	};

	Window_ConfirmCommand.prototype.numVisibleRows = function() {
		return 3;
	};

	Window_ConfirmCommand.prototype.makeCommandList = function() {
		this.addCommand(MPPlugin.text.Yes, 'yes');
		this.addCommand(MPPlugin.text.No, 'no');
		this.addCommand(MPPlugin.text.Default, 'default');
	};

	Window_ConfirmCommand.prototype.itemTextAlign = function() {
		return 'center';
	};

	Window_ConfirmCommand.prototype.refresh = function() {
		this.clearCommandList();
		this.makeCommandList();
		var widthMax = Math.max(this.textWidth(MPPlugin.text.Yes),
							this.textWidth(MPPlugin.text.No),
							this.textWidth(MPPlugin.text.Default));
		this.width = widthMax + (this.itemPadding() + $gameSystem.windowPadding()) * 2;
		this.x = (Graphics.boxWidth - this.width) / 2;
		this.createContents();
		Window_Selectable.prototype.refresh.call(this);
	};

	//-----------------------------------------------------------------------------
	// Scene_Confirm

	function Scene_Confirm() {
		this.initialize.apply(this, arguments);
	}

	Scene_Confirm.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_Confirm.prototype.constructor = Scene_Confirm;

	Scene_Confirm.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_Confirm.prototype.prepare = function(tempActor) {
		this._tempActor = tempActor;
	};

	Scene_Confirm.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this.createConfirmWindow();
		this.createCommandWindow();
		this.createPreviewWindow();
	};

	Scene_Confirm.prototype.createConfirmWindow = function() {
		const rect = this.windowConfirmRect();
		this._confirmWindow = new Window_Confirm(rect);
		this.addWindow(this._confirmWindow);
	};

	Scene_Confirm.prototype.windowConfirmRect = function() {
		const x = -$gameSystem.windowPadding();
		const y = 192;
		const width = Graphics.boxWidth + $gameSystem.windowPadding() * 2;
		const height = this.calcWindowHeight(1);
		return new Rectangle(x, y, width, height);
	};

	Scene_Confirm.prototype.createCommandWindow = function() {
		const rect = this.windowConfirmCommandRect();
		this._commandWindow = new Window_ConfirmCommand(rect);
		const win = this._commandWindow;
		win.x = (Graphics.boxWidth - win.windowWidth()) / 2;
		win.height = win.fittingHeight(3);
		win.createContents();
		win.refresh();
		this._commandWindow.setHandler('yes',     this.onCommandYes.bind(this));
		this._commandWindow.setHandler('no',      this.onCommandNo.bind(this));
		this._commandWindow.setHandler('default', this.onCommandDefault.bind(this));
		this.addWindow(this._commandWindow);
	};

	Scene_Confirm.prototype.windowConfirmCommandRect = function() {
		const x = 0;
		const y = 256;
		const width = this.mainCommandWidth();
		const height = 0;
		return new Rectangle(x, y, width, height);
	};

	Scene_Confirm.prototype.createPreviewWindow = function() {
		const rect = this.charEditPreviewRect();
		this._previewWindow = new Window_CharEdit_Preview(rect, this._tempActor);
		const win = this._previewWindow;
		win.width = win.windowWidth();
		win.height = win.windowHeight();
		win.createContents();
		this._previewWindow.x = (Graphics.boxWidth - this._previewWindow.width) / 2;
		this._previewWindow.y = 408;
		this.addWindow(this._previewWindow);
	};

	Scene_Confirm.prototype.charEditPreviewRect = function() {
		const x = 0;
		const y = 408;
		const width = 0;
		const height = 0;
		return new Rectangle(x, y, width, height);
	};

	Scene_Confirm.prototype.onCommandYes = function() {
		this._actor._geneParts = this._tempActor._geneParts;
		this._actor._geneColors = this._tempActor._geneColors;
		this._actor.refreshImageName();
		SceneManager.goto(Scene_Map);
	};

	Scene_Confirm.prototype.onCommandNo = function() {
		this.popScene();
		SceneManager.prepareNextScene(this._tempActor);
	};

	Scene_Confirm.prototype.onCommandDefault = function() {
		this._tempActor._geneParts = this._actor._geneParts.clone();
		this._tempActor._geneColors = this._actor._geneColors.clone();
		//this._tempActor.refreshImageName();
		this.popScene();
		SceneManager.prepareNextScene(this._tempActor);
	};

	Sprite_Character.prototype.patternWidth = function() {
		if (this._tileId > 0) {
			return $gameMap.tileWidth();
		} else if (this._isBigCharacter || this._characterName[0] === "$") {
			return this.bitmap.width / 3;
		} else {
			return this.bitmap.width / 12;
		}
	};

	Sprite_Character.prototype.patternHeight = function() {
		if (this._tileId > 0) {
			return $gameMap.tileHeight();
		} else if (this._isBigCharacter || this._characterName[0] === "$") {
			return this.bitmap.height / 4;
		} else {
			return this.bitmap.height / 8;
		}
	};
})();

//=============================================================================
// UpdateDrawer
//=============================================================================

(function() {

if (!Window_Base.Mpp_UpdateDrawer) {

var Alias = {};

//-----------------------------------------------------------------------------
// Window_Base

//13
Alias.WiBa_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function() {
    Alias.WiBa_initialize.apply(this, arguments);
    this._updateDrawers = [];
};

//105
Alias.WiBa_update = Window_Base.prototype.update;
Window_Base.prototype.update = function() {
    Alias.WiBa_update.apply(this, arguments);
    this.updateDrawer();
};

Window_Base.prototype.updateDrawer = function() {
    if (this.isOpen() && this.visible && this._updateDrawers.length > 0) {
        this._updateDrawers = this._updateDrawers.filter(function(process) {
            return process();
        });
    }
};

Window_Base.prototype.addUpdateDrawer = function(process) {
    this._updateDrawers.push(process);
};

Window_Base.prototype.clearUpdateDrawer = function() {
    this._updateDrawers = [];
};

Window_Base.Mpp_UpdateDrawer = true;
} //if (!Window_Base.MPP_UpdateDrawer)


})();
