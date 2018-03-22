
var GameBoard = {
    // 位置 列
    row: function (num) {
        return 83 * (num - 1) + 55;
    }
};

// 敌人速度
var Speed = {
    SLOW: 1,
    NORMAL: 2,
    FAST: 3,
    VERY_FAST: 4
};

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
    this.checkCollision(player);
    this.x += this.speed;
    if (this.x >= 500) {
        // 回到起始点
        this.x = -55;
        // 重新赋予速度值
        this.speed = Math.floor(Math.random() * 3 + 1);
    }
};

// 游戏必须的函数，用来在屏幕上画出敌人
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 敌人与玩家碰撞检测
Enemy.prototype.checkCollision = function (player) {
    // 碰撞检测
    if (this.isCollision(player)) {
        player.resume();
    }
};

// 判定碰撞检测
Enemy.prototype.isCollision = function (player) {
    // 当玩家与敌人在同一行 且玩家进入敌人范围内则判定碰撞成立
    if ((this.x + 70 >= player.x && this.x < player.x || this.x - 70 <= player.x && this.x > player.x) && this.y == player.y) {
        return true;
    }

    return false;
}

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
let Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function (dt) {
    if (this.isEnterRiver()) {
        let successBoardElm = document.getElementById('success-board');
        successBoardElm.removeAttribute('class', 'hidden');
        successBoardElm.setAttribute('class', 'show');
    }
};

// 重新开始
Player.prototype.resume = function () {
    // 将玩家移动到起始点
    player.x = 202;
    player.y = 83 * 4 + 55;
}

// 过河检测
Player.prototype.isEnterRiver = function () {
    if (this.y === -28) {
        return true;
    }
}

/**
 * 控制玩家移动函数
 * @param {movent} 移动方向 
 */
Player.prototype.handleInput = function (movement) {
    switch (movement) {
        case 'left':
            if (this.canMoveLeft()) {
                this.move(-101, 0);
            }
            break;
        case 'right':
            if (this.canMoveRight()) {
                this.move(101, 0);
            }
            break;
        case 'up':
            if (this.canMoveUp()) {
                this.move(0, -83);
            }
            break;
        case 'down':
            if (this.canMoveDown()) {
                this.move(0, 83);
            }
            break;
    }
    console.log(this.x, this.y);
};

// 玩家是否可以左移函数
Player.prototype.canMoveLeft = function () {
    if (this.x > 0) {
        return true;
    }
    return false;
}

// 玩家是否可以右移函数
Player.prototype.canMoveRight = function () {
    if (this.x < 404) {
        return true;
    }
    return false;
}

// 玩家是否可以上移函数
Player.prototype.canMoveUp = function () {
    if (this.y > -28) {
        return true;
    }
    return false;
}

// 玩家是否可以下移函数
Player.prototype.canMoveDown = function () {
    if (this.y < 387) {
        return true;
    }
    return false;
}

/**
 * 
 * @param {int} x 横坐标移动的距离
 * @param {int} y 纵坐标移动的距离 
 */
Player.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
}

// 游戏必须的函数，在屏幕上画出玩家
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
let allEnemies = [
    new Enemy(22, GameBoard.row(1), Speed.FAST),
    new Enemy(22, GameBoard.row(1), Speed.NORMAL),
    new Enemy(57, GameBoard.row(2), Speed.FAST),
    new Enemy(59, GameBoard.row(3), Speed.SLOW),
];
let player = new Player(202, 83 * 4 + 55);

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

// 重启元素
let resumeBtnElm = document.getElementsByClassName('resume-btn')[0];

// 重新游戏 绑定事件
resumeBtnElm.addEventListener('click', function (e) {
    let successBoardElm = document.getElementById('success-board');
    successBoardElm.removeAttribute('class', 'show');
    successBoardElm.setAttribute('class', 'hidden');
    player.resume();
});