<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        body,html{
            margin: 0;
            padding: 0;
        }
        #boxA{
            width: 30px;
            height:30px;
            background-color: deeppink;
            position: absolute;
            z-index: 2;
        }
        #boxB{
            width: 100px;
            height:100px;
            background-color: deepskyblue;
            position: relative;
            left: 50px;
            top: 50px;
            z-index: 1;
        }
        .wrap{
            /*position: relative;*/
            padding: 20px;
        }
    </style>
</head>
<body>
<div class="wrap" id = "wrap">
    <div id="boxA"></div>
    <div id="boxB"></div>
</div>

</body>
<script>
    window.onload=function () {
        var elementA = document.getElementById("boxA");
        var elementB = document.getElementById("boxB");
//        clientWidth和clientHeight: 该属性指的是元素的可视部分宽度和高度，即padding+content，
        //保留A的原始位置，在A如果未被拖进去B的时候将其还原回到原来的位置
        var initialPositionA={
            left:elementA.offsetLeft,
            top:elementA.offsetTop
        }
        //B的位置
        var positionB = {
            xL: elementB.offsetLeft,
            xR: elementB.offsetLeft + elementB.clientWidth,
            yT: elementB.offsetTop,
            yB: elementB.offsetLeft + elementB.clientHeight
        }
        var flag = false;//检测onmousedown事件
        var inB = false;//检测元素A是否在元素B中
        elementA.onmousedown = function () {
            flag = true;
        }
        document.onmousemove = function (event) {
            if(flag){
                var positionA = {
                    x: event.pageX,
                    y: event.pageY
                }
                elementA.style.left =  (positionA.x - elementA.clientWidth) +"px";
                elementA.style.top =  (positionA.y - elementA.clientHeight)+"px";
                elementA.style.opacity = "0.5"
                inB=false;　//只是经过但是未放置，所以再次置为false
                if( positionB.xL<=positionA.x && positionA.x<= positionB.xR && positionB.yT<=positionA.y&& positionA.y<= positionB.yB){
                    inB=true;//放置在B中
                }
            }
        }
        document.onmouseup = function (event) {
            if(inB){
                //在B中将B变色
                elementA.style.opacity = "1";
                elementB.style.backgroundColor = "green"
            }
            else{
                //不在B中将A还原回到原来的位置
                elementA.style.left = initialPositionA.left +"px";
                elementA.style.top =  initialPositionA.top +"px";
                elementA.style.opacity = "1"
            }
            inB = false;
            flag = false;
        }
    }
</script>
</html>
