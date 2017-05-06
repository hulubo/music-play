


var e = function(selector) {
	return document.querySelector(selector)
}

var bindEvent = function(element, eventName, callback) {
	element.addEventListener(eventName, callback)
}

var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var toggleClass = function(element, className) {
	if (element.classList.contains(className)) {
		element.classList.remove(className)
	} else {
		element.classList.add(className)
	}
}


var a = e('#id-audio-player')


//播放暂停&&图标变换
var toggleChange =function (element,p1,p2="pause.png") {
	var img = 'images/'+ element.src.split("/").pop()
	var img1 = `images/${p1}`
	var img2 = `images/${p2}`
	if(img == img1) {
		element.src = img2
		a.play()
	}
	else {
		element.src = img1
		a.pause()
	}
}

//图片切换
var imgChange =function (element,p1,p2="pause.png") {
	var img = 'images/'+ element.src.split("/").pop()
	var img1 = `images/${p1}`
	var img2 = `images/${p2}`
	if(img == img1) {
		element.src = img2
	}
	else {
		element.src = img1
	}
	//console.log('element.src',element.src)
}

var coverChange = function (nextIndex) {
	var img1 = e(".cover-img")
	var img2 = e ('.center-song')
	var nameSelector = e ('.musicName')
	var playerSelector = e ('.musicPlayer')
	var img = music[nextIndex].img
	var name = music[nextIndex].name
	var player = music[nextIndex].player
	img1.src = img
	img2.src = img
	nameSelector.innerHTML = name
	playerSelector.innerHTML = player
}

//分秒
var rjust = function(str,delimeter='0') {
	var result = str
	while(result.length < 2) {
		result = delimeter + result
	}
	return result
}
//标准时间
var formatTime = function(sum) {
	var m = String(Math.floor(sum % 3600 / 60))
	var s = String(Math.floor(sum % 60))
	var time = `${rjust(m)}:${rjust(s)}`
	return time
}

var showTime = function() {
	bindEvent(a,'canplay',function() {
		var time = formatTime(a.duration)
		console.log(time)
		var over = e('#time-over')
		over.innerHTML = time
	})
	//监听currentTime
	bindEvent(a,'timeupdate',function() {
		var start = e ('#time-start')
		var currentTime = formatTime(a.currentTime)
		start.innerHTML = currentTime

		input = a.currentTime / a.duration * 100
		//console.log('input',typeof input,input)
		if (Boolean(input) == true) {
			e('.range').value = input
		}
	})
}

//监听input.value
var bindRange = function() {
	var range = e('.range')
	bindEvent(range,'input',function() {
		var v = this.value
		// console.log('v', v)
		a.currentTime = a.duration * v / 100
	})
}


var bindPlay = function() {
	a.loop ='loop'
	var toggle = e('.footer-play')
	bindEvent (toggle,'click',function() {
		console.log("click")
		toggleChange(toggle,"play.png")
	})
}

//下一首
var bindnext = function () {
	var next = e('.footer-next')
	bindEvent(next,'click',function() {
		var nowPlay = Number(a.dataset.active)
		var muscisOfNumber = music.length
		var index = (nowPlay + 1 + muscisOfNumber) % muscisOfNumber
		console.log('index ',index)
		a.src = music[index].src
		go(index)
	})
}

//上一首
var bindPrev = function () {
	var prev = e('.footer-prev')
	bindEvent(prev,'click',function() {
		var nowPlay = Number(a.dataset.active)
		var muscisOfNumber = music.length
		var index = (nowPlay - 1 + muscisOfNumber) % muscisOfNumber
		console.log('index ',index)
		a.src = music[index].src
		go(index)
	})
}

var go = function(nextIndex) {
	bindEvent(a,'canplay',function() {
		a.play()
		imgChange(e('.footer-play'),"pause.png")
		coverChange(nextIndex)
	})
	a.dataset.active = nextIndex
}


var music = [
	{
		src:"mp3/0.mp3",
		name:"成都",
		img:"images/0.jpg",
		player:'赵磊',
		index:"0",
	},
	{
		src:"mp3/1.mp3",
		name:"理想",
		img:"images/1.jpg",
		player:'赵磊',
		index:"1",
	},
	{
		src:"mp3/2.mp3",
		name:"姑娘",
		img:"images/2.jpg",
		player:'赵磊',
		index:"2",
	},
	{
		src:"mp3/3.mp3",
		name:"明天我要难过一天",
		img:"images/3.jpg",
		player:'刘喆',
		index:"3",
	}

]



var __main = function() {
	bindPlay()
	bindPrev()
	bindnext()
	bindRange()
	showTime()
}

__main()
