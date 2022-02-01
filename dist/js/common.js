	const rangeInputs = document.querySelectorAll('input[type="range"]')

	function handleInputChange(e) {
		let target = e.target
		if (e.target.type !== 'range') {
			target = document.getElementById('range')
		} 
		const min = target.min
		const max = target.max
		const val = target.value
		
		target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
	}

	rangeInputs.forEach(input => {
		input.addEventListener('input', handleInputChange)
	})
	
	
	let timerId;
	let timerStarted = true;
	
	function GetData(URL){
		return new Promise(function(resolve, reject) {
			var request = new XMLHttpRequest();
			
			request.open('GET', URL, true);
			
			request.onload = function() {
				if	(request.status == 200)
					resolve(request.responseText);
				else
					reject();
			}
			
			request.onerror = function() {
				reject();
			};
			
			request.send();
		});
	}
	
	function OutResult(Str){
		if (timerStarted) {clearTimeout(timerId); timerStarted = false;}
		document.getElementById('time-title').innerHTML = 'Сгенерировано:';
		let num_count = document.getElementById('set-count-num').value;
		document.getElementById('count').value = num_count;
		document.getElementById('max-count').innerHTML = num_count;
			
		if (num_count == 1)
			document.getElementById('numbers').style.fontSize = '110px';
		else if (num_count <= 50)
			document.getElementById('numbers').style.fontSize = '40px';
		else
			document.getElementById('numbers').style.fontSize = '30px';
		
		if (Str.indexOf('|') == -1) {
			document.getElementById('numbers').innerHTML = Str;
		} else {
			let Results = Str.split('|');
			if (Results[0] != '') {
				document.getElementById('numbers').innerHTML = Results[0];
				if (document.getElementById('winner-numbers').innerHTML == '-') {
					document.getElementById('winner-list').style.display = 'flex';
					document.getElementById('winner-numbers').innerHTML = Results[0];
				}
				else
					document.getElementById('winner-numbers').innerHTML += Results[0] + ' ';
			}
			else
				document.getElementById('numbers').innerHTML = '0';
			document.getElementById('date').innerHTML = Results[1];
			LastDate = Results[1];
		}
		if (document.getElementById('count').value == 1)
			document.getElementById('numbers').setAttribute('class', 'numbers-anim');
		else
			document.getElementById('numbers').setAttribute('class', 'numbers-anim2');
	}
	
	function Gen(){
		//document.getElementById('share-links').style.display='block';
		//document.getElementById('share-spoiler').style.display='none';
		document.getElementById('numbers').setAttribute('class', '');
		
		//alert(1);
		let num_count = document.getElementById('set-count-num').value;
		document.getElementById('count').value = num_count;
		document.getElementById('max-count').innerHTML = num_count;
		let min = document.getElementById('number-start').value;
		let max = document.getElementById('number-end').value;
		
		if (min.trim() != '' && max.trim() == '')
			max = min;
		if (max.trim() != '' && min.trim() == '')
			min = max;
		if (min.trim() == '')
			min = '0';		
		if (max.trim() == '')
			max = '0';
		
		let numbers = document.getElementById('number-list').value;
		numbers = numbers.trim();
		numbers = numbers.replaceAll(' ', ',');
		//alert(numbers);
		
		if (num_count == 1)
			document.getElementById('my-title').innerHTML = 'Случайное число:';
		else
			document.getElementById('my-title').innerHTML = 'Случайные числа:';
		
		let uniqueActivate = '';
		if (document.getElementById('unique_r').checked)
			uniqueActivate = '&unique=1';
		
		let sortActivate = '';
		if (document.getElementById('sort_cb').checked)
			sortActivate = '&sort=1';
		
		if (document.getElementById('diap').checked)
			GetData('/modules/api.php?count=' + num_count + '&min=' + min + '&max=' + max + uniqueActivate + sortActivate).then(function(responseText) {
				OutResult(responseText);
			
			}).catch(function() {
				document.getElementById('numbers').innerHTML = 'API недоступен';
			});
			
		if (document.getElementById('listr').checked)
			GetData('/modules/api.php?count=' + num_count + '&numbers=' + numbers + uniqueActivate + sortActivate).then(function(responseText) {
				OutResult(responseText);
			}).catch(function() {
				document.getElementById('numbers').innerHTML = 'API недоступен';
			});
			
		if (document.getElementById('listr2').checked) {
			if (numbers == '') {
				GetData('/modules/api.php?count=' + num_count + '&min=' + min + '&max=' + max + uniqueActivate + sortActivate).then(function(responseText) {
					OutResult(responseText);
					//ToList()
				}).catch(function() {
					document.getElementById('numbers').innerHTML = 'API недоступен';
				});
			} else {
				GetData('/modules/api.php?count=' + num_count + '&numbers=' + numbers + uniqueActivate + sortActivate).then(function(responseText) {
					OutResult(responseText);
					//ToList();
				}).catch(function() {
					document.getElementById('numbers').innerHTML = 'API недоступен';
				});
			}
		}
		
		document.getElementById('numbers').style.display='flex';
	}
	
	/*function ToList(){
		if (document.getElementById('listr2').checked == false)
			document.getElementById('listr').click();
		document.getElementById('number-list').value = document.getElementById('numbers').innerHTML;
	}*/
	
	function countChange(){
		document.getElementById('max-count').innerHTML = document.getElementById('count').value;
		document.getElementById('set-count-num').value = document.getElementById('count').value;
		if (document.getElementById('count').value == 1)
			document.getElementById('exclude').style.display='flex';
		else
			document.getElementById('exclude').style.display='flex';
	}
	
	function spoilers(){
		//document.getElementById('my-button2').style.display='';
		//document.getElementById('winner-numbers').innerHTML = '-';
		if (document.getElementById('diap').checked) {
			document.getElementsByTagName('label')[0].style.textDecoration = 'underline';
			document.getElementsByTagName('label')[1].style.textDecoration = 'none';
			document.getElementsByTagName('label')[2].style.textDecoration = 'none';
			document.getElementById('diap-spoiler').style.display='flex';
			document.getElementById('list-spoiler').style.display='none';
			document.getElementById('number-list').value = '';
			if (document.getElementById('count').value == 1)
				document.getElementById('exclude').style.display='flex';
			else
				document.getElementById('exclude').style.display='flex';
		} else if (document.getElementById('listr').checked) {
			document.getElementsByTagName('label')[0].style.textDecoration = 'none';
			document.getElementsByTagName('label')[1].style.textDecoration = 'underline';
			document.getElementsByTagName('label')[2].style.textDecoration = 'none';
			document.getElementById('diap-spoiler').style.display='none';
			document.getElementById('list-spoiler').style.display='block';	
			document.getElementById('exclude').style.display='flex';		
		} else {
			document.getElementById('number-list').value = document.getElementById('numbers').innerHTML;
			document.getElementById('my-button2').style.display='none';		
			document.getElementsByTagName('label')[0].style.textDecoration = 'none';
			document.getElementsByTagName('label')[1].style.textDecoration = 'none';
			document.getElementsByTagName('label')[2].style.textDecoration = 'underline';
			document.getElementById('diap-spoiler').style.display='none';
			document.getElementById('list-spoiler').style.display='block';	
			document.getElementById('exclude').style.display='flex';	
		}
	}
	
	/*function SaveNumbers(){
		let num_count = document.getElementById('set-count-num').value;
		document.getElementById('count').value = num_count;
		document.getElementById('max-count').innerHTML = num_count;
		let min = document.getElementById('number-start').value;
		let max = document.getElementById('number-end').value;
		let numbersList = document.getElementById('number-list').value;
		numbersList = numbersList.trim();
		numbersList = numbersList.replaceAll(' ', ',');
		let UrlStr = '';
		if (document.getElementById('unique_r').checked)
			UrlStr = '&unique=1';
		
		let numbers = document.getElementById('numbers').innerHTML.trim();
		let date = document.getElementById('date').innerHTML;
		
		if (document.getElementById('diap').checked)
			UrlStr += '&type=1';
		if (document.getElementById('listr').checked) {
			UrlStr += '&type=2';
			UrlStr += '&list=' + numbersList;
		}
		if (document.getElementById('listr2').checked) {
			UrlStr += '&type=3';
			UrlStr += '&list=' + numbersList;
		}
			
		GetData('/modules/api.php?save=1&numbers=' + numbers + '&d=' + date + '&min=' + min + '&max=' + max + '&count=' + num_count + UrlStr ).then(function(responseText) {
				if (responseText != '') {
					document.getElementById('link-show').innerHTML=window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?rid=' + responseText;
					document.getElementById('share-links').style.display='none';
					document.getElementById('share-spoiler').style.display='block';
				}
				else
					document.getElementById('link-show').innerHTML='API недоступен';
			}).catch(function() {
				document.getElementById('link-show').innerHTML='API недоступен';
			});		
	}*/
	
	function OutResult2(Str){
		if (timerStarted) {clearTimeout(timerId); timerStarted = false;}
		document.getElementById('time-title').innerHTML = 'Сгенерировано:';
		if (Str.indexOf('|') == -1) {
			document.getElementById('numbers').innerHTML = Str;
		} else {
			let Results = Str.split('|');
			document.getElementById('my-title').innerHTML = 'Сохраненный результат №' + Results[0];
			document.getElementById('numbers').innerHTML = Results[1];
			document.getElementById('max-count').innerHTML = Results[4];
			document.getElementById('number-start').value = Results[2];
			document.getElementById('number-end').value = Results[3];
			
			if (Results[4] == 1)
				document.getElementById('numbers').style.fontSize = '110px';
			else if (Results[4] <= 50)
				document.getElementById('numbers').style.fontSize = '40px';
			else
				document.getElementById('numbers').style.fontSize = '30px';
			
			if (Results[5] == 1) document.getElementById('diap').click();
			if (Results[5] == 2) document.getElementById('listr').click();
			if (Results[5] == 3) document.getElementById('listr2').click();
			
			if (Results[7] == 1) document.getElementById('unique_r').checked = false; else document.getElementById('unique_r').checked = false;
				
			document.getElementById('number-list').value = Results[6].replaceAll(',', ' ');
			document.getElementById('date').innerHTML = Results[8];
			
			if (document.getElementById('diap').checked) {
				document.getElementsByTagName('label')[0].style.textDecoration = 'underline';
				document.getElementsByTagName('label')[1].style.textDecoration = 'none';
			} else {
				document.getElementsByTagName('label')[0].style.textDecoration = 'none';
				document.getElementsByTagName('label')[1].style.textDecoration = 'underline';
			}
		}
		if (document.getElementById('count').value == 1)
			document.getElementById('numbers').setAttribute('class', 'numbers-anim');
		else
			document.getElementById('numbers').setAttribute('class', 'numbers-anim2');
	}
	
	
	function copyLink(){
		var copyText = document.getElementById('link-show');
		copyText.select();
		document.execCommand("copy");
		document.getElementById('share-spoiler').style.display='none';
		document.getElementById('share-links').style.display='block';
		alert('Ссылка скопирована в буфер обмена!');
	}

	function getImg(){
		let numbers = document.getElementById('numbers').innerHTML.trim().replaceAll(' ', ',');
		let date = document.getElementById('date').innerHTML.replaceAll(' ', '%20').replace('+', '%2b');
		document.location.href='/modules/genimg/gen_img.php?date=' + encodeURI(date) + '&numbers=' + numbers;
	}
	
	function SetNumCountManual(){
		document.getElementById('count').value = document.getElementById('set-count-num').value;
		document.getElementById('max-count').innerHTML = document.getElementById('set-count-num').value;
		if (document.getElementById('set-count-num').value == 1)
			document.getElementById('exclude').style.display='flex';
		else
			document.getElementById('exclude').style.display='flex';
	}
	
	document.addEventListener("DOMContentLoaded", function(){
		let searchParams = new URLSearchParams(location.search);
		let RID = searchParams.get('rid');
		document.getElementById('count').value = 1;
		document.getElementById('set-count-num').value = 1;
		document.getElementById('exclude').style.display='flex';
		document.getElementById('diap').checked = true;
		document.getElementById('unique_r').checked = true;
		document.getElementById('sort_cb').checked = false;
		document.getElementsByTagName('label')[0].style.textDecoration = 'underline';
		document.getElementsByTagName('label')[1].style.textDecoration = 'none';
	
	if (RID === null) {
		GetData('/modules/api.php?start=1').then(function(responseText) {
			document.getElementById('numbers').innerHTML = '0';
			document.getElementById('numbers').style.fontSize = '110px';
			//document.getElementById('time-title').innerHTML = 'Сейчас:';

			timerId = setInterval(function(){
				let now = new Date;
				let curHour = (now.getHours() < 10) ? '0' + now.getHours() : '' + now.getHours();
				let curMin = (now.getMinutes() < 10) ? '0' + now.getMinutes() : '' + now.getMinutes();
				let curSec = (now.getSeconds() < 10) ? '0' + now.getSeconds() : '' + now.getSeconds();
				let GMTHour = now.getTimezoneOffset() / -60;
				let GMT = GMTHour;
				if (GMTHour < 0) GMT = '-' + GMT;
				if (GMTHour > 0) GMT = '+' + GMT;
				document.getElementById('date').innerHTML = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear() + ', ' + curHour + ':' + curMin + ':' + curSec + ', GMT ' + GMT;
			}, 1000);
			
			//console.log('started');
			//document.getElementById('my-button').click();
			GetData('/modules/api.php?count=1&min=1&max=1').then(function(responseText) {
				//
			}).catch(function() {
				document.getElementById('numbers').innerHTML = 'API недоступен часы';
			});
			
		}).catch(function() {
			//console.log('error');
		});
	} else {
		GetData('/modules/api.php?rid=' + RID).then(function(responseText) {
			document.getElementById('btns').style.display = 'none';
			document.getElementById('count').style.display = 'none';
			document.getElementById('share-links').style.display = 'none';
			document.getElementById('set-count-div').style.display = 'none';
			document.getElementById('sort-div').style.display = 'none';
			OutResult2(responseText);
			document.getElementById('exclude').style.display='flex';
		}).catch(function() {
			//console.log('error');
		});
	}
	
});