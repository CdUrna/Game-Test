function getRandomNum(min, max) {
    var result = Math.random() * (max - min) + min;
    result = Math.floor(result);
    return result;
}

class GameLogic {
    constructor(row, col) {
        this.Matrix = new Array(row);
        this.row = row;
        this.col = col;

        for (let i = 0; i < row; i++) {
            this.Matrix[i] = new Array(col);
            for (let j = 0; j < col; j++) {
                this.Matrix[i][j] = {code: 0, id:""+i+"-"+j};
            }
        }
    }

    getPosition(){
        var position = [];
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                if(this.Matrix[i][j].code === 1){
                    position.push({row: i, col: j, oldTextCss: "el-"+i+"-"+j});
                }
            }
        }
        return position;
    }

    initRandomBoxes(count) {
        for (let i = 0; i < count; ) {
            let row = getRandomNum(0, 4);
            let col = getRandomNum(0, 4);
            if(this.Matrix[row][col].code === 0){
                this.Matrix[row][col].code = 1;
                $("#gameContainer").append('<div class="element el-' + row + '-' + col + '"></div>');
                i++;
            }
        }
    }

    moveTop(){
        let newTextCss;
        console.log(this)
        let positionInfo = this.getPosition();
   

        let counterRow;
        positionInfo.forEach((item, i, arr) => {
            counterRow = item.row;
            for(let i=item.row; i>=0; i--){
                if(this.Matrix[i][item.col].code === 0){
                    counterRow = counterRow-1; ///
                }
            }
            newTextCss = "el-"+counterRow+"-"+item.col;

            this.Matrix[item.row][item.col].code = 0;
            this.Matrix[counterRow][item.col].code = 1;

            let $element = $("#gameContainer").find(".element."+ item.oldTextCss);
            $element.removeClass(item.oldTextCss);
            $element.addClass(newTextCss);
        })
    }

    moveBottom(){
        let newTextCss;
        let positionInfo = this.getPosition();


        for(let i=positionInfo.length-1; i >= 0; i--){
           let counter = positionInfo[i].row;

           for(let j = positionInfo[i].row; j<4; j++){
               if(this.Matrix[j][positionInfo[i].col].code == 0){
                   counter +=1;
               }
           }

           newTextCss = "el-"+ counter + "-" + positionInfo[i].col;

           if(this.Matrix[positionInfo[i].row][positionInfo[i].col].id != this.Matrix[counter][positionInfo[i].col].id){
            this.Matrix[counter][positionInfo[i].col].code = 1;
            this.Matrix[positionInfo[i].row][positionInfo[i].col].code = 0;
           }

           let $element = $("#gameContainer").find(".element."+ positionInfo[i].oldTextCss);
               $element.removeClass(positionInfo[i].oldTextCss);
               $element.addClass(newTextCss);
        }
    }

    muveLeft(){
        let newTextCss;
        let positionInfo = this.getPosition();
        let tempMatrix = this.Matrix;

        positionInfo.forEach((item, i, arr) => {
            let counterCol = item.col;
            for(let i=item.col; i>=0; i--){
                if(this.Matrix[item.row][i].code === 0){
                    counterCol = counterCol-1; ///
                }
            }
            newTextCss = "el-"+item.row+"-"+counterCol;

            tempMatrix[item.row][item.col].code = 0;
            tempMatrix[item.row][counterCol].code = 1;

            let $element = $("#gameContainer").find(".element."+ item.oldTextCss);
            $element.removeClass(item.oldTextCss);
            $element.addClass(newTextCss);
        })
        this.Matrix = tempMatrix;
    }

    moveRight(){
        let newTextCss;
        let positionInfo = this.getPosition();

        for(let i=positionInfo.length-1; i >= 0; i--){
           let counter = positionInfo[i].col;

           for(let j = positionInfo[i].col; j<4; j++){
               if(this.Matrix[positionInfo[i].row][j].code == 0){
                   counter +=1;
               }
           }

           newTextCss = "el-"+ positionInfo[i].row + "-" + counter;

           if(this.Matrix[positionInfo[i].row][positionInfo[i].col].id != this.Matrix[positionInfo[i].row][counter].id){
            this.Matrix[positionInfo[i].row][counter].code = 1;
            this.Matrix[positionInfo[i].row][positionInfo[i].col].code = 0;
           }

           let $element = $("#gameContainer").find(".element."+ positionInfo[i].oldTextCss);
               $element.removeClass(positionInfo[i].oldTextCss);
               $element.addClass(newTextCss);
        }
    }
}

let Game = new GameLogic(4, 4);
$(document).ready(function () {
    let getRandomSection = getRandomNum(1, 3);
    Game.StartInit(getRandomSection);//Generate first elements
    /////----------------------/////
    $(document).keydown((e) => {

        switch (e.which) {
            case 38:
            Game.moveTop();
                break;
            case 40:
            Game.moveBottom();
                break;
            case 37:
            Game.muveLeft();
                break
            case 39:
                Game.moveRight();
                break;
        }
    })
    // StartInit(getRandomSection);
});