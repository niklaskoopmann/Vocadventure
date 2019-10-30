function CanvasDict(globalDict) {
  this.gD = globalDict;
  this.canvas = document.getElementById("adventureCanvas");
  this.context = this.canvas.getContext("2d");
  this.spritesheet = new Image();
  this.spritesheet.src = "img/Spritesheet.png";
  this.raf = null;
  this.startTS = 0;
  this.lag = 0;
  this.refreshrate = 1000 / 60;
  this.frameNo = 0;
  this.animationInProgress = false;
  this.animationQueue = [];
  this.currentAnimation = null;
  this.animationStart = 0;
  this.backgroundAnimationSpeed = 1;
  this.infoText = null;
  this.currentAction = null;
  this.styles = styles;
  // start spriteDict
  // The following code is auto-generated, don't change it!
  /**
   * Maps a Sprite-Key to Location Information regarding the Sprite-Sheet as a key-value-dict.
   * @type {Object.<string, [boolean, number, number|Array<number>, number, number]>}
   * Each value's array has the contents: isAnimated, x-pos, y-pos, width, height.
   * If isAnimated is true, y-pos is an array, otherwise just a single number.
   */
  this.spriteDict = {
    "Background_Fuji": [false, 0, 0, 504, 120],
    "Background_Tiles_Appletree": [true, 505, [0, 301, 602, 903], 480, 300],
    "Background_Tiles_Basic": [false, 505, 1204, 288, 300],
    "Background_Tiles_Bridge_B": [true, 505, [1505, 1806, 2107, 2408], 480, 300],
    "Background_Tiles_Bridge_F": [false, 505, 2709, 480, 300],
    "Background_Tiles_Dirtmine_B": [false, 505, 3010, 96, 300],
    "Background_Tiles_Dirtmine_F": [false, 505, 3311, 96, 300],
    "Background_Tiles_Sky": [false, 505, 3612, 600, 180],
    "Background_Tiles_Stone": [false, 505, 3793, 288, 300],
    "Decoration_Bush1": [false, 1106, 0, 96, 36],
    "Decoration_Bush2": [false, 1106, 37, 108, 48],
    "Decoration_Bush3": [false, 1106, 86, 120, 48],
    "Decoration_Bush4": [false, 1106, 135, 120, 48],
    "Decoration_Farn1": [false, 1106, 184, 24, 36],
    "Decoration_Farn10": [false, 1106, 221, 24, 36],
    "Decoration_Farn2": [false, 1106, 258, 24, 48],
    "Decoration_Farn3": [false, 1106, 307, 24, 60],
    "Decoration_Farn4": [false, 1106, 368, 36, 72],
    "Decoration_Farn5": [false, 1106, 441, 12, 36],
    "Decoration_Farn6": [false, 1106, 478, 12, 48],
    "Decoration_Farn7": [false, 1106, 527, 36, 72],
    "Decoration_Farn8": [false, 1106, 600, 24, 60],
    "Decoration_Farn9": [false, 1106, 661, 24, 48],
    "Decoration_Flower1": [false, 1106, 710, 36, 48],
    "Decoration_Flower2": [false, 1106, 759, 36, 48],
    "Decoration_Flower3": [false, 1106, 808, 36, 48],
    "Decoration_Flower4": [false, 1106, 857, 36, 48],
    "Decoration_Flower5": [false, 1106, 906, 36, 48],
    "Decoration_Flower6": [false, 1106, 955, 36, 48],
    "Item_Apple": [false, 1227, 0, 84, 96],
    "Item_Apple_S": [false, 1227, 97, 14, 16],
    "Item_Axe": [false, 1227, 114, 120, 96],
    "Item_Cobwebs": [false, 1227, 211, 96, 96],
    "Item_Cobwebs_S": [false, 1227, 308, 16, 16],
    "Item_Fish": [false, 1227, 325, 96, 72],
    "Item_Fishing_Rod": [false, 1227, 398, 96, 96],
    "Item_Fish_S": [false, 1227, 495, 16, 12],
    "Item_Ironore": [false, 1227, 508, 96, 96],
    "Item_Ironore_S": [false, 1227, 605, 16, 16],
    "Item_Pickaxe": [false, 1227, 622, 96, 96],
    "Item_Sand_Bucket": [false, 1227, 719, 84, 84],
    "Item_Sand_Bucket_S": [false, 1227, 804, 14, 14],
    "Item_Shovel": [false, 1227, 819, 96, 96],
    "Item_Stone": [false, 1227, 916, 96, 96],
    "Item_Stone_S": [false, 1227, 1013, 16, 16],
    "Item_String": [false, 1227, 1030, 96, 96],
    "Item_Wood": [false, 1227, 1127, 108, 96],
    "Item_Wood_S": [false, 1227, 1224, 18, 16],
    "Item_Worm": [false, 1227, 1241, 72, 96],
    "Item_Worm_S": [false, 1227, 1338, 12, 16],
    "Player_Player": [false, 1348, 0, 72, 84],
    "Player_Player_Back": [false, 1348, 85, 72, 84],
    "Player_Player_Back_Walk": [true, 1348, [170, 255], 72, 84],
    "Player_Player_Shadow": [false, 1348, 340, 36, 12],
    "Player_Player_Walk": [true, 1348, [353, 438], 72, 84],
    "Special_Placeholder": [false, 1421, 0, 40, 40],
    "Special_Placeholder_B": [false, 1421, 41, 80, 80]
  };
  // end spriteDict
  this.availableBackgrounds = [
    { spriteKey: 'Background_Tiles_Appletree', animationSpeed: 24, chance: 0.1, action: 3,
      textId: 'appletree', toolId: 'axe', uses: 8 },
    { spriteKey: 'Background_Tiles_Basic', chance: 1 },
    { spriteKey: 'Background_Tiles_Bridge_B', animationSpeed: 12, chance: 0.1, action: 3,
      textId: 'bridge', toolId: 'fishingRod', uses: 10 },
    { spriteKey: 'Background_Tiles_Dirtmine_B', chance: 0.25, action: 1,
      textId: 'dirtmine', toolId: 'shovel', uses: 12 },
    { spriteKey: 'Background_Tiles_Stone', chance: 0.25, action: 2,
      textId: 'rock', toolId: 'pickaxe', uses: 6 }
  ];
  this.player = {
    x: 198, y: 156, spriteKeys: ['Player_Player', 'Player_Player_Walk', 'Player_Player_Back', 'Player_Player_Back_Walk'],
    animationSpeed : 16
  };
  this.backgrounds = [
    { x: 0, lastX: 0, y: 0, spriteKey: 'Background_Tiles_Basic' },
    { x: 288, lastX: 288, y: 0, spriteKey: 'Background_Tiles_Basic' },
    { x: 576, lastX: 576, y: 0, spriteKey: 'Background_Tiles_Basic' }
  ];
  this.canvasLoop = function (timestamp) {
    if (this.gD.page === 'adventure') {
      this.raf = requestAnimationFrame(timestamp => this.canvasLoop(timestamp));

      this.lag += timestamp - this.startTS;

      while (this.lag > this.refreshrate) {
        this.frameNo++;

        this.canvasUpdate();

        if (this.lag > this.refreshrate * 5) {
          this.lag %= this.refreshrate;
        } else {
          this.lag -= this.refreshrate;
        }
      }

      this.clearCanvas();
      this.canvasDraw();

      this.startTS = timestamp;
    }
  };
  this.canvasUpdate = function () {
    if (!this.animationInProgress && this.animationQueue.length > 0) {
      this.currentAnimation = this.animationQueue.pop();
      this.animationInProgress = true;
      this.animationStart = this.frameNo;
    }
    if (this.currentAnimation) {
      this.animate();
    }
  };
  this.animate = function () {
    console.log(this.currentAnimation.type);
    let animationFinished = this[this.currentAnimation.type]();
    if (animationFinished) {
      this.backgrounds.map(background => {
        background.x = Math.round(background.x / 96) * 96;
        background.lastX = background.x;
      }, this);
      this.player.y = Math.round(this.player.y / 12) * 12;
      this.currentAnimation = null;
      this.animationInProgress = false;
      this.animationStart = 0;
    }
  };
  this.moveBackground = function () {
    for (let i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].x -= this.backgroundAnimationSpeed;

      if (this.backgrounds[i].spriteKey.includes('Bridge')) {
        if (this.backgrounds[i].x < 156 && this.backgrounds[i].x >= 96) {
          this.player.y -= 24 / 60 * this.backgroundAnimationSpeed;
        } else if (this.backgrounds[i].x < 96 && this.backgrounds[i].x >= 0) {
          this.player.y -= 12 / 96 * this.backgroundAnimationSpeed;
        } else if (this.backgrounds[i].x < 0 && this.backgrounds[i].x >= -96) {
          this.player.y += 12 / 96 * this.backgroundAnimationSpeed;
        } else if (this.backgrounds[i].x < -96 && this.backgrounds[i].x >= -132) {
          this.player.y += 24 / 36 * this.backgroundAnimationSpeed;
        }
      }

      if (this.backgrounds[i].lastX - this.currentAnimation.goal === this.backgrounds[i].action &&
          this.currentAction === null) {
        this.currentAction = {
          textId: this.backgrounds[i].textId,
          toolId: this.backgrounds[i].toolId,
          uses: this.backgrounds[i].uses,
          used: 0
        };
      }

      let {spriteWidth} = getSpriteData(this.backgrounds[i].spriteKey, this);
      if (i === 0) {
        if (this.backgrounds[i].x + spriteWidth < -100) {
          this.backgrounds.splice(i, 1);
          i--;
        }
      }
      if (i === this.backgrounds.length - 1) {
        if (this.backgrounds[i].x + spriteWidth < this.canvas.width + 100) {
          let total = 0;
          let random;
          this.availableBackgrounds.map(availableBackground => {
            total += availableBackground.chance;
          }, this);

          random = Math.random() * total;

          for (let j = 0; j < this.availableBackgrounds.length; j++) {
            random -= this.availableBackgrounds[j].chance;
            if (random <= 0) {
              let newBackground = {
                x: this.backgrounds[i].x + spriteWidth,
                lastX: this.backgrounds[i].x + spriteWidth,
                y: 0,
                spriteKey: this.availableBackgrounds[j].spriteKey
              };
              if (this.availableBackgrounds[j].action) {
                newBackground.action = 192 - (this.availableBackgrounds[j].action - 1) * 96;
                newBackground.textId = this.availableBackgrounds[j].textId;
                newBackground.toolId = this.availableBackgrounds[j].toolId;
                newBackground.uses = this.availableBackgrounds[j].uses;
              }
              if (this.availableBackgrounds[j].animationSpeed) {
                newBackground.animationSpeed = this.availableBackgrounds[j].animationSpeed
              }
              this.backgrounds.push(newBackground);
              break;
            }
          }
        }
      }
    }
    this.currentAnimation.counter += 1;

    return this.currentAnimation.counter >= this.currentAnimation.goal;
  };
  this.approachObject = function () {
    this.player.y -= 1;
    this.currentAnimation.counter += 1;
    return this.currentAnimation.counter >= this.currentAnimation.goal;
  };
  this.backOnTrack = function () {
    this.player.y += 1;
    this.currentAnimation.counter += 1;
    return this.currentAnimation.counter >= this.currentAnimation.goal;
  };
  this.diveDown = function () {
    this.player.y += 1;
    this.currentAnimation.counter += 1;
    return this.currentAnimation.counter >= this.currentAnimation.goal;
  };
  this.diveUp = function () {
    this.player.y -= 1;
    this.currentAnimation.counter += 1;
    return this.currentAnimation.counter >= this.currentAnimation.goal;
  };
  this.axeAnimation = function () {
    if (this.currentAnimation.counter >= 60) {
      if (this.infoText === null) {
        this.initInfoText('Item_Wood_S', 'wood');
        if (Math.random() < 0.03) {
          this.addToInfoText('Item_Apple_S', 'apple');
        }
      } else {
        if (this.currentAnimation.counter === this.currentAnimation.goal - 1) {
          this.addPoints('axe');
        } else {
          this.infoText.y -= 0.5;
        }
      }
    }
    this.currentAnimation.counter += 1;
    return this.currentAnimation.counter >= this.currentAnimation.goal;
  };
  this.pickaxeAnimation = function () {
    if (this.currentAnimation.counter >= 60) {
      if (this.infoText === null) {
        if (Math.random() < 0.005) {
          this.initInfoText('Item_Ironore_S', 'ironOre');
        } else {
          this.initInfoText('Item_Stone_S', 'stone');
        }
      } else {
        if (this.currentAnimation.counter === this.currentAnimation.goal - 1) {
          this.addPoints('pickaxe');
        } else {
          this.infoText.y -= 0.5;
        }
      }
    }

    this.currentAnimation.counter += 1;
    return this.currentAnimation.counter >= this.currentAnimation.goal;
  };
  this.shovelAnimation = function () {
    if (this.currentAnimation.counter >= 60) {
      if (this.infoText === null) {
        this.initInfoText('Item_Sand_Bucket', 'sandBucket');
        if (Math.random() < 0.2) {
          this.addToInfoText('Item_Worm_S', 'worm');
        }
        if (Math.random() < 0.1) {
          this.addToInfoText('Item_Cobwebs_S', 'cobwebs');
        }
      } else {
        if (this.currentAnimation.counter === this.currentAnimation.goal - 1) {
          this.addPoints('shovel');
        } else {
          this.infoText.y -= 0.5;
        }
      }
    }
    this.currentAnimation.counter += 1;
    return this.currentAnimation.counter >= this.currentAnimation.goal;
  };
  this.fishingRodAnimation = function () {
    if (this.currentAnimation.counter >= 60) {
      if (this.infoText === null) {
        this.initInfoText('Item_Fish_S', 'fish');
      } else {
        if (this.currentAnimation.counter === this.currentAnimation.goal - 1) {
          this.addPoints('fishingRod');
        } else {
          this.infoText.y -= 0.5;
        }
      }
    }
    this.currentAnimation.counter += 1;
    return this.currentAnimation.counter >= this.currentAnimation.goal;
  };
  this.initInfoText = function (spriteKey, itemId) {
    let {spriteWidth} = getSpriteData('Player_Player', this);
    let number;
    if (Math.random() < 0.04) {
      number = 2;
    } else {
      number = 1;
    }
    this.infoText = {
      x: this.player.x + spriteWidth + 12,
      y: this.player.y + 12,
      items: [{
        spriteKey: spriteKey,
        itemId: itemId,
        number: number
      }]
    };
  };
  this.addToInfoText = function (spriteKey, itemId) {
    let number;
    if (Math.random() < 0.04) {
      number = 2;
    } else {
      number = 1;
    }
    this.infoText.items.push({
      spriteKey: spriteKey,
      itemId: itemId,
      number: number
    });
  };
  this.addPoints = function (type) {
    this.infoText.items.map(item => {
      let inventoryItem = this.gD.inventory.find(entry => entry.id === item.itemId);
      let itemTemplate = this.gD.items.find(entry => entry.id === item.itemId);
      if (inventoryItem) {
        inventoryItem.quantity += item.number;
      } else {
        this.gD.inventory.push({
          id: itemTemplate.id,
          quantity: item.number,
          spriteKey: itemTemplate.spriteKey
        });
      }
      this.gD.scores.scores.find(score => score.id === 'statusLeft').number += itemTemplate.points * item.number;
    }, this);
    this.infoText = null;
    this.currentAction.used++;
    if (this.currentAction.used === this.currentAction.uses) {
      this.gD.actionIsActive = false;
      this.currentAction = null;
      if (type === 'axe' || type === 'pickaxe') {
        this.animationQueue.push({
          type: 'backOnTrack',
          goal: 36,
          counter: 0
        });
      } else if (type === 'shovel') {
        this.animationQueue.push({
          type: 'diveUp',
          goal: 96,
          counter: 0
        });
      }
    }
  };
  this.canvasDraw = function () {
    drawCanvasImage(0, 0, 'Background_Tiles_Sky', this);

    this.backgrounds.map(background => {
      drawCanvasImage(
        background.x, background.y, background.spriteKey, this,
        background.animationSpeed ? background.animationSpeed : undefined
      );
    }, this);

    let playerKey = 0;
    if (this.gD.actionIsActive) {
      if (this.currentAnimation) {
        if (['approachObject', 'diveDown', 'diveUp'].includes(this.currentAnimation.type)) {
          playerKey = 3;
        } else if (this.currentAnimation.type === 'axeAnimation') {
          playerKey = 2;
        }
      } else {
        playerKey = 2;
      }
    } else if (this.currentAnimation) {
      if (this.currentAnimation.type === 'moveBackground' || this.currentAnimation.type === 'backOnTrack') {
        playerKey = 1;
      }
    }

    drawCanvasImage(
      this.player.x, this.player.y, this.player.spriteKeys[playerKey], this, this.player.animationSpeed, true
    );
    if (playerKey === 1 || playerKey === 3) {
      drawCanvasImage(this.player.x, this.player.y + 72, 'Player_Player_Shadow', this);
    }

    this.backgrounds.map(background => {
      if (background.spriteKey.includes('Bridge')) {
        drawCanvasImage(
          background.x, background.y, 'Background_Tiles_Bridge_F', this
        )
      } else if (background.spriteKey.includes('Dirtmine')) {
        drawCanvasImage(
          background.x, background.y, 'Background_Tiles_Dirtmine_F', this
        )
      }
    }, this);

    if (this.infoText !== null) {
      this.infoText.items.map((item, index) => {
        let {spriteHeight} = getSpriteData(item.spriteKey, this);
        drawCanvasText(this.infoText.x, this.infoText.y + (index * 16), '+ ' + item.number, 'infoText', this);
        drawCanvasImage(this.infoText.x + 16, this.infoText.y + (index * 16) - spriteHeight / 2, item.spriteKey, this);
      }, this);
    }

    if (this.gD.vocabWords.length !== 0) {
      drawCanvasRect(this.canvas.width / 2 - 150, 0, 300, 30, 'standardBlur', this);
      drawCanvasText(this.canvas.width / 2, 15, this.gD.vocabWords[this.gD.currentWord][this.gD.lang], 'standard', this);
    }
  };
  this.clearCanvas = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
}
