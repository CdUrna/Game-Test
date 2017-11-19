function getRandomNum(min, max) {
    var result = Math.random() * (max - min) + min;
    result = Math.floor(result);
    return result;
}

class GameLogic {
    constructor(row, col) {
        this.Matrix = new Array(row);

        for (let i = 0; i < row; i++) {
            this.Matrix[i] = new Array(col);
            for (let j = 0; j < col; j++) {
                this.Matrix[i][j] = 0;
            }
        }
    }

    getPosition(){
        var position = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if(this.Matrix[i][j] === 1){
                    position.push({row: i, col: j, oldTextCss: "el-"+i+"-"+j});
                }
            }
        }
        return position;
    }

    StartInit(count) {
        for (let i = 0; i < count; i++) {
            let row = getRandomNum(0, 4);
            let col = getRandomNum(0, 4);
            this.Matrix[row][col] = 1;
            $("#gameContainer").append('<div class="element el-' + row + '-' + col + '"></div>');
        }
    }

    moveTop(){
        let newTextCss;
        console.log(this)
        let positionInfo = this.getPosition();

        var counterRow;
        positionInfo.forEach((item, i, arr) => {
            counterRow = item.row;
            for(let i=item.row; i>=0; i--){
                if(this.Matrix[i][item.col] === 0){
                    counterRow = counterRow-1; ///
                }
            }
            newTextCss = "el-"+counterRow+"-"+item.col;

            this.Matrix[item.row][item.col] = 0;
            this.Matrix[counterRow][item.col] = 1;

            let $element = $("#gameContainer").find(".element."+ item.oldTextCss);
            $element.removeClass(item.oldTextCss);
            $element.addClass(newTextCss);
        })
    }

    moveBottom(){

    }
}

let Game = new GameLogic(4, 4);
$(document).ready(function () {
    let getRandomSection = getRandomNum(1, 3);
    Game.StartInit(getRandomSection);//Generate first elements
    /////----------------------/////
    $(document).keydown((e) => {
        if (e.which == 38) {
            console.log("allah");
            Game.moveTop()
        }
    })
    // StartInit(getRandomSection);
});