// 这是我们的玩家要躲避的敌人 
var Enemy = function (x, y, speed, dt) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.dt = dt;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
};

// 游戏必须的函数，用来在屏幕上画出敌人
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
let Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function (dt) {
};

Player.prototype.handleInput = function (movement) {
    switch (movement) {
        case 'left':
            if (this.x === 0) {
                break;
            }
            this.x -= 101; break;
        case 'right':
            if (this.x === 404) {
                break;
            }
            this.x += 101; break;
        case 'up':
            if (this.y === -28) {
                break;
            }
            this.y -= 83; break;
        case 'down':
            if (this.y === 387) {
                break;
            }
            this.y += 83; break;
    }
    console.log(this.x, this.y);
};

// 游戏必须的函数，在屏幕上画出玩家
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
let allEnemies = [new Enemy(0, 83 * 2 + 55, 200)];
let player = new Player(101, 83 * 3 + 55);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput() 方法里面
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
