$(document).ready(function(){

var obj = JSON.parse('[{"id":1,"firstName":"Paul","surname":"Crowe","age":28,"gender":"male","friends":[2]},{"id":2,"firstName":"Rob","surname":"Fitz","age":23,"gender":"male","friends":[1,3]},{"id":3,"firstName":"Ben","surname":"OCarolan","age":null,"gender":"male","friends":[2,4,5,7]},{"id":4,"firstName":"Victor","surname":"","age":28,"gender":"male","friends":[3]},{"id":5,"firstName":"Peter","surname":"Mac","age":29,"gender":"male","friends":[3,6,11,10,7]},{"id":6,"firstName":"John","surname":"Barry","age":18,"gender":"male","friends":[5]},{"id":7,"firstName":"Sarah","surname":"Lane","age":30,"gender":"female","friends":[3,5,20,12,8]},{"id":8,"firstName":"Susan","surname":"Downe","age":28,"gender":"female","friends":[7]},{"id":9,"firstName":"Jack","surname":"Stam","age":28,"gender":"male","friends":[12]},{"id":10,"firstName":"Amy","surname":"Lane","age":24,"gender":"female","friends":[5,11]},{"id":11,"firstName":"Sandra","surname":"Phelan","age":28,"gender":"female","friends":[5,10,19,20]},{"id":12,"firstName":"Laura","surname":"Murphy","age":33,"gender":"female","friends":[7,9,13,20]},{"id":13,"firstName":"Lisa","surname":"Daly","age":28,"gender":"female","friends":[12,14,20]},{"id":14,"firstName":"Mark","surname":"Johnson","age":28,"gender":"male","friends":[13,15]},{"id":15,"firstName":"Seamus","surname":"Crowe","age":24,"gender":"male","friends":[14]},{"id":16,"firstName":"Daren","surname":"Slater","age":28,"gender":"male","friends":[18,20]},{"id":17,"firstName":"Dara","surname":"Zoltan","age":48,"gender":"male","friends":[18,20]},{"id":18,"firstName":"Marie","surname":"D","age":28,"gender":"female","friends":[17]},{"id":19,"firstName":"Catriona","surname":"Long","age":28,"gender":"female","friends":[11,20]},{"id":20,"firstName":"Katy","surname":"Couch","age":28,"gender":"female","friends":[7,11,12,13,16,17,19]}]');

// Creating list of people
for(i=1; i<obj.length; i++){

	var source = "";
	if(obj[i].gender == "male"){
		source = "img/male.png";
	} else {
		source = "img/female.png";
	};

	var persons = '<li>'+
		'<img src=' + source + '>'+
		'<a href="javascript:void(0);" class="person"><p id="' + (i+1) +'"></p></a><br>'+
		'<ul class="dropdown">'+
			'<li>'+
				'<a href="javascript:void(0);" class="friends"><p style="font-size: 20px"></p></a>'+
				'<ul class="friends" id="friends' + (i+1) +'"></ul>'+
			'</li>'+
			'<li>'+
				'<a href="javascript:void(0);" class="friends"><p>friends of friends</p></a>'+
				'<ul class="friends" id="FoF' + (i+1) +'"></ul>'+
			'</li>'+
			'<li>'+
				'<a href="javascript:void(0);" class="friends"><p>suggestions</p></a>'+
				'<ul class="friends" id="sugg' + (i+1) +'"></ul>'+
			'</li>'+
		'</ul>'+
		'</li>';

	$('#people').append(persons).find('p#' + (i+1)).html(obj[i].firstName + " " + obj[i].surname + ", " + obj[i].age);
}

// Creating list of: FRIENDS
for(i=0; i<obj.length; i++){
	var len = obj[i].friends;
	for(n=0; n<len.length; n++){
		var friendList = '<li><p>' + obj[len[n] - 1].firstName + ' ' + obj[len[n] - 1].surname + ', ' + obj[len[n] - 1].age + '</p></li>';
		$('ul#friends' + (i+1)).append(friendList);

		// FRIENDS OF FRIENDS
		var fof = obj[len[n] - 1].friends;
		for(j=0; j<fof.length; j++){
			if(obj[i].id !== fof[j]){
				var fofList = '<li><p>' + obj[fof[j] - 1].firstName + ' ' + obj[fof[j] - 1].surname + ', ' + obj[fof[j] - 1].age + '</p></li>';
				$('ul#FoF' + (i+1)).append(fofList);
			}
		}
	}

	//Number of friends
	if (len.length === 1){
		var text = '1 friend';
	} else {
		var text = len.length + ' friends';
	}
	$('ul#people>li:eq('+i+')').find('p:eq(1)').html(text);
}

//SUGGESTIONS
for(i=0; i<obj.length; i++){
	var sugg = [];
	for(n=0; n<obj.length; n++){
		var lenI = obj[i].friends;
		var result = 0;
		for(j=0; j<lenI.length; j++){
			var lenN = obj[n].friends;
			for(k=0; k<lenN.length; k++){
				if(i !== n && lenI[j] === lenN[k] && lenI[k] !== obj[n].id){
					result++;
				}
			}
		}
		if(result > 1){
			sugg.push(obj[n].id);
		}
	}
	for(x=0; x<sugg.length; x++){
		var suggList = '<li><p>' + obj[sugg[x] - 1].firstName + ' ' + obj[sugg[x] - 1].surname + ', ' + obj[sugg[x] - 1].age + '</p></li>';
		$('ul#sugg' + (i+1)).append(suggList);
	}
}


$('a.person').on('click',function(){
	$(this).siblings().toggleClass('active');
	$(this).toggleClass('selected');
});

$('a.friends').on('click',function(){
	$(this).siblings().toggleClass('active');
});

});