
window.onload=function(){
	document.body.style.width = window.screen.width;
	var parent_lis = getClassName("parent_li");
	for (var i = 0,pl=parent_lis.length; i < pl;i++) {
		parent_lis[i].onclick = function(){
			// console.log(this.children[1])
			 if (this.children[1].getAttribute("class").indexOf("hidden") != -1) {
			 	this.children[1].setAttribute("class","visited");
			 } else if (this.children[1].getAttribute("class").indexOf("visited") != -1) {
			 	this.children[1].setAttribute("class","hidden");
			 }
		}
	}
}
// 兼容性解决方法
	function getClassName(abc){
		if (!document.getElementsByClassName) {
			var list=document.getElementsByTagName('*');
			var arr=[];
			for (var i = 0; i < list.length; i++) {
				if(list[i].className == abc){
					//在浏览器版本不支持该方法时使用className属性
					arr.push(list[i]);
				}
			}
			return arr;
		} else {
			return document.getElementsByClassName(abc);
		}
	}