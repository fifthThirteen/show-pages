
window.onload=function(){
	document.body.style.width = window.screen.width;
	var span_lis = document.getElementById("main_list").getElementsByTagName("span");
	for (var i = 0,sl=span_lis.length; i < sl;i++) {
		span_lis[i].onclick = function() {
			var ii = this.children[0];
			if (ii.classList == '') {
				ii.classList.add('on');
			} else {
				ii.classList.remove('on');
			}
			// console.log(this.children[0].classList);
			var ul = this.nextElementSibling;
			if (ul.getAttribute('class').indexOf('hidden') != -1) {
				ul.setAttribute('class','visited');
			} else if (ul.className == 'visited') {
				ul.className = 'hidden';
			}
		}
	}
}
// 兼容性解决方法 querySelectorAll 
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

// var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
$(window).scroll(function(){
    // if ($(window).scrollTop()>100){
    //     $("#go_to_top").slideDown(500);
    // }else{
    //     $("#go_to_top").slideUp(500);
    // }
    $(window).scrollTop()>100 && $("#go_to_top").slideDown(500) || $("#go_to_top").slideUp(500);
});
//当点击跳转链接后，回到页面顶部位置
$("#go_to_top").click(function(){
    $('body,html').animate({scrollTop:0},500);
    return false;
});
