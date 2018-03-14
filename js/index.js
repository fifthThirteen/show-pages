
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

 function insertAfter(newElement,targetElement) {
	  var parent = targetElement.parentNode;
	  if (parent.lastChild == targetElement) {
	    parent.appendChild(newElement);
	  } else {
	    parent.insertBefore(newElement,targetElement.nextSibling);
	  }
}

// 渲染数据
 var scriptElement = document.createElement('script');
 scriptElement.src = 'data/index_json.js';
 var s = document.getElementsByTagName('script')[0];
 insertAfter(scriptElement,s);

 function jsonCallback(data) {
 	var main_list = document.getElementById('main_list');
 	for (var i = 0; i < data.length; i++) {
   		var temp = data[i];
   		var hasChild = temp.submenu;
   		if (!hasChild) {
   			var li = "<li><a href='"+data[i].url+"'>"+(i+1)+'.&nbsp;&nbsp;&nbsp;'+data[i].name+"</a>";
   		} else {
   			var li = "<li class='parent_li'>"+'<span><i></i>'+(i+1)+'.&nbsp;&nbsp;&nbsp;'+data[i].name+"</span>";
   			li += "<ul class='hidden'>";
   			for (var j=0;j<hasChild.length;j++) {
   				// debugger
   				var liChild = hasChild[j].submenu;	   				
   				var li1;
   				if (!liChild) {
   					li1 = "<li><a href='"+hasChild[j].url+"'>"+hasChild[j].name+"</a></li>";
   				} else {
   					li1 = "<li class='parent_li'>"+'<span><i></i>'+'&nbsp;&nbsp;&nbsp;'+hasChild[j].name+"</span>";
   					li1 += "<ul class='hidden'>";
   					for (var k = 0; k < liChild.length;k++) {
   						var li2 = "<li><a href='"+liChild[k].url+"'>"+liChild[k].name+"</a></li>";
   						li1 += li2;
   					}
   					li1 += "</ul></li>";
   				}
   				li += li1;
   			}
   			li += "</ul>";
   		}
   		var liEnd = "</li>";
   		main_list.innerHTML += (li+liEnd);
 	}
 	
 }

// canvas


$(function(){
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.lineWidth = .3;
  ctx.strokeStyle = (new Color(150)).style;
  document.body.appendChild(canvas);

  var mousePosition = {
    x: 30 * canvas.width / 100,
    y: 30 * canvas.height / 100
  };

  var dots = {
    nb: 750,
    distance: 50,
    d_radius: 100,
    array: []
  };

  function colorValue(min) {
    return Math.floor(Math.random() * 255 + min);
  }
  
  function createColorStyle(r,g,b) {
    return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
  }
  
  function mixComponents(comp1, weight1, comp2, weight2) {
    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
  }
  
  function averageColorStyles(dot1, dot2) {
    var color1 = dot1.color,
        color2 = dot2.color;
    
    var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
        g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
        b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
    return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
  }
  
  function Color(min) {
    min = min || 0;
    this.r = colorValue(min);
    this.g = colorValue(min);
    this.b = colorValue(min);
    this.style = createColorStyle(this.r, this.g, this.b);
  }

  function Dot(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();

    this.radius = Math.random() * 2;

    this.color = new Color();
    // console.log(this);
  }

  Dot.prototype = {
    draw: function(){
      ctx.beginPath();
      ctx.fillStyle = this.color.style;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    }
  };

  function createDots(){
    for(i = 0; i < dots.nb; i++){
      dots.array.push(new Dot());
    }
  }

  function moveDots() {
    for(i = 0; i < dots.nb; i++){

      var dot = dots.array[i];

      if(dot.y < 0 || dot.y > canvas.height){
        dot.vx = dot.vx;
        dot.vy = - dot.vy;
      }
      else if(dot.x < 0 || dot.x > canvas.width){
        dot.vx = - dot.vx;
        dot.vy = dot.vy;
      }
      dot.x += dot.vx;
      dot.y += dot.vy;
    }
  }

  function connectDots() {
    for(i = 0; i < dots.nb; i++){
      for(j = 0; j < dots.nb; j++){
        i_dot = dots.array[i];
        j_dot = dots.array[j];

        if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
          if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
            ctx.beginPath();
            ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
            ctx.moveTo(i_dot.x, i_dot.y);
            ctx.lineTo(j_dot.x, j_dot.y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }
  }

  function drawDots() {
    for(i = 0; i < dots.nb; i++){
      var dot = dots.array[i];
      dot.draw();
    }
  }

  function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveDots();
    connectDots();
    drawDots();

    requestAnimationFrame(animateDots);	
  }

  $('canvas').on('mousemove', function(e){
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;
  });

  $('canvas').on('mouseleave', function(e){
    mousePosition.x = canvas.width / 2;
    mousePosition.y = canvas.height / 2;
  });

  createDots();
  requestAnimationFrame(animateDots);	
});
