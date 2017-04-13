/*******************************************************************************
 * Model 
******************************************************************************/
/*******************************************************************************
 * context,session,util,algorithm,oop,info,person
 * 
 * 
 *  
 * 
 * 
 ******************************************************************************/
var app=app || {};
app.context=(function(){
	var init=function(context){
		app.session.init(context);
		onCreate();
	};
	var onCreate=function(){
		setContentView();
		app.component.init();
		app.algorithm.init();
		app.oop.init();
		app.person.init();
	};
	var setContentView=function(){
	};
	
	return {
		init : init,
		setContentView : setContentView,
		onCreate : onCreate
		
	};
	
})();
app.session=(function(){
	var init=function(context){
		sessionStorage.setItem('context',context);
		sessionStorage.setItem('js',context+'/resources/js');
		sessionStorage.setItem('css',context+'/resources/css');
		sessionStorage.setItem('img',context+'/resources/img');
	};
	var getContextPath=function(){return sessionStorage.getItem('context');};
	var getJavascriptPath=function(){return sessionStorage.getItem('js');};
	var getStylePath=function(){return sessionStorage.getItem('css');};
	var getImagePath=function(){return sessionStorage.getItem('img');};
	return {
		init : init,
		getContextPath : getContextPath,
		getJavascriptPath : getJavascriptPath,
		getStylePath : getStylePath,
		getImagePath : getImagePath
	};
})();
app.util=(function(){})();
app.algorithm=(function(){
/* 알고리즘수열 */	
	var wrapper,ctx,img,js,css;
	var init=function(){
		wrapper=app.component.getWrapper();
		ctx=app.session.getContextPath();
		img=app.session.getImagePath();
		js=app.session.getJavascriptPath();
		css=app.session.getStylePath();
		onCreate();
	};
	var onCreate=function(){
		setContentView();
		series();
		arr();
		matrix();
		math();
		appl();
	};
	var setContentView=function(){};
	var series=function(){
		$('#series').on('click',function(){
			wrapper.empty();
			wrapper.append(app.algorithm.TABLE);
			$('#tableLeft').html(app.algorithm.SERIES_MENU);
			var tableRight=$('#tableRight');
			aSeries();
			$('#aSeries').on('click',function(){aSeries();});
			$('#swSeries').on('click',function(){
				tableRight.empty();
				app.component.inputText('inputText').attr('placeholder','한계값입력(100 -> -50)').appendTo(tableRight);
				app.component.aButton('aButton','btn-success').html('스위치수열의 합').appendTo(tableRight)
					.css('margin','10px auto')
					.on('click',function(){
					var limit=$('#inputText').val();
					app.component.divAlert('alert-success').html('1부터'+limit+'까지 스위치수열의 합은'+swSeries(limit)+'입니다.').appendTo(tableRight);
				});
			});
			$('#dSeries').on('click',function(){
				tableRight.empty();
				app.component.inputText('inputText').attr('placeholder','한계값입력(5 -> 25)').appendTo(tableRight);
				app.component.aButton('aButton','btn-info').html('계차수열의 합').appendTo(tableRight)
					.css('margin','10px auto')
					.on('click',function(){
					var limit=$('#inputText').val();
					app.component.divAlert('alert-info').html('1부터'+limit+'계차수열의 합은'+dSeries(limit)+'입니다.').appendTo(tableRight);
				});
			});
			$('#factorial').on('click',function(){
				tableRight.empty();
				app.component.inputText('inputText').attr('placeholder','한계값입력(5 -> 153)').appendTo(tableRight);
				app.component.aButton('aButton','btn-warning').html('팩토리얼수열의 합').appendTo(tableRight)
					.css('margin','10px auto')
					.on('click',function(){
					var limit=$('#inputText').val();
					app.component.divAlert('alert-warning').html('1부터'+limit+'팩토리얼수열의 합은'+factorial(limit)+'입니다.').appendTo(tableRight);
				});
			});
			$('#fibonacci').on('click',function(){
				tableRight.empty();
				app.component.inputText('inputText').attr('placeholder','한계값입력((5 -> 12))').appendTo(tableRight);
				app.component.aButton('aButton','btn-danger').html('피보나치수열의 합').appendTo(tableRight)
					.css('margin','10px auto')
					.on('click',function(){
					var limit=$('#inputText').val();
					app.component.divAlert('alert-danger').html('1부터'+limit+'피보나치수열의 합은'+fibonacci(limit)+'입니다.').appendTo(tableRight);
				});
			});
			
		});
	};
	var aSeries = function(){
		$('#tableRight').empty();
		app.component.inputText('inputText').attr('placeholder','시작값 한계값 공차(공백으로 구분)입력').appendTo(tableRight);
		app.component.aButton('aButton','btn-primary').html('등차수열의 합').appendTo(tableRight)
			.css('margin','10px auto')
			.on('click',function(){
				
				var inputVal=$('#inputText').val();
				console.log('inputVal:'+inputVal);
				var arr=inputVal.split(' ');
				var start=arr[0];
				var limit=arr[1];
				var diff=arr[2];
				console.log('start:'+start+',limit:'+limit+',diff:'+diff);
				var start=start*1,limit=limit*1,diff=diff*1;
				var sum=0;
				var rs="";
				var i=start;
				while(i<=limit){
					rs+=(i+diff>limit)?i+"=":i+"+";
					sum+=i;
					i+=diff;
				}
				
				app.component.divAlert('alert-danger').html(rs+sum).appendTo(tableRight);
		});
	
	};
	var swSeries = function(limit){
		//1,-2,3,-4,5,-6
		var sum = 0;
		 var flag=-1;
		 for(i=0;i<=limit;i++){
			sum += flag*i;
			flag = -1*flag;
		 }
		return sum;
	};
	var dSeries = function(limit){
		//1,2,4,7,11
		var sum = 1,total=0;
		var total = 0;
		for(i=0;i<limit;i++){
			sum += i;
			total += sum ;
		}
		return total;
	};
	var factorial = function(limit){
		//1!,1!+2!,1!+2!+3!,1!+2!+3!+4!,1!+2!+3!+4!+5!
		 var sum = 1, total = 0;
		 for(i=1;i<=limit;i++){
			 sum = sum*i;
			 total += sum;
		 }
		 if(limit == 0){total = 0;}else if(limit == 1){total = 1;}
		return total;
	};
	var fibonacci = function(limit){
		//1,1,2,3,5,8,13,21,
		 var sum = 2,a = 1,b = 1,c = 0;
		 for(i=3;i<=limit;i++){
			 c=a+b;
			 sum+=c;
			 a=b;
			 b=c;
		 }
		 if(limit == 0){sum = 0;}else if(limit == 1){sum = 1;}else if(limit == 2){sum = 2;} 
		return sum;
	};

	var arr=function(){
		$('#arr').on('click',function(){
			wrapper.empty();
			wrapper.append(app.algorithm.TABLE);
			var arr=[{id:'selectSort',txt:'선택정렬'},
				{id:'bubbleSort',txt:'버블정렬'},
				{id:'insertSort',txt:'삽입정렬'},
				{id:'ranking',txt:'석차구하기'},
				{id:'binSearch',txt:'이분검색'},
				{id:'merge',txt:'병합'},
				{id:'stack',txt:'스택'}];
			var str='';
			$.each(arr,function(i,j){
				str+='<li id="'+j.id+'" class="list-group-item"><a href="#">'+j.txt+'</a></li>';
			});
			$('#tableLeft').html(str);
			$('#selectSort').on('click',function(){
				var i=0,j=0,temp=0;
				var arr=randomGen();
				for(i=0;i<arr.length;i++){
					for(j=i;j<arr.length;j++){
						if(arr[i]>arr[j+1]){
							temp = arr[i];
							arr[i] = arr[j+1];
							arr[j+1] = temp;
						}
					}
				}
				
				$('#tableRight').html(app.component.horList(arr,'default'));	
			});
			$('#bubbleSort').on('click',function(){
				
				var arr=randomGen();
				var num=0,i=0,j=0;
				for(i=0;i<arr.length;i++){
					for(j=0;j<arr.length;j++){
						if(arr[j]>arr[j+1]){
							num=arr[j];
							arr[j]=arr[j+1];
							arr[j+1]=num;
						}
					}
				}
				$('#tableRight').html(app.component.horList(arr,'default'));	
			});
			$('#insertSort').on('click',function(){
				var arr=randomGen();
				var i=0,j=0;
				
				
				$('#tableRight').html(app.component.horList(arr,'default'));	
			});
			$('#ranking').on('click',function(){
				var arr=randomGen();
				var rank=[1,1,1,1,1,1];
				for(var i=0;i<arr.length;i++){
					for(var k=0;k<arr.length;k++){
						if(arr[i]<arr[k]){
							rank[i]++;
						}
					}
				}
				$('#tableRight').html(app.component.horList(arr,'default'));
				$('#tableRight').append(app.component.horList(rank,'default'));
			});
			
		});
	};
	var randomGen=function(){
		var i=0,k=0;
		var arr=[];
		for(;i<6;i++){
			arr[i]=Math.floor(Math.random() * 45) + 1;
			for(k=i;k>0;k--){
				if(arr[i]==arr[k-1]){
					i--;
				}
			}
		}
		return arr;
	};
/* 알고리즘행열 */	
	var matrix=function(){
		$('#matrix').on('click',function(){
			var wrapper=app.component.getWrapper();
			wrapper.empty();
			wrapper.append(app.algorithm.TABLE);
			var arr=[{id:'basic',txt:'기본5X5'},
				{id:'ziazag',txt:'지그재그'},
				{id:'diamond',txt:'다이아몬드'},
				{id:'sandGlass',txt:'모래시계'},
				{id:'snail',txt:'달팽이'},
				{id:'magicSquare',txt:'마방진'}];
			var str='';
			$.each(arr,function(i,j){
				str+='<li id="'+j.id+'" class="list-group-item"><a href="#">'+j.txt+'</a></li>';
			});
			$('#tableLeft').html(str);	
			basic();
		});
		
	};
	var basic=function(){
		$('#basic').on('click',function(){
			var mtx = new Array(new Array(5), new Array(5),new Array(5), new Array(5),new Array(5));
			var jason=[
		        {
		            a : 1,
		            b : 2,
		            c : 3,
		            d : 4,
		            e : 5
		        },
		        {
		        	a : 6,
		            b : 7,
		            c : 8,
		            d : 9,
		            e : 10
		        },
		        {
		        	a : 11,
		            b : 12,
		            c : 13,
		            d : 14,
		            e : 15
		        },
		        {
		        	a : 16,
		            b : 17,
		            c : 18,
		            d : 19,
		            e : 20
		        },
		        {
		        	a : 21,
		            b : 22,
		            c : 23,
		            d : 24,
		            e : 25
		        }
		    ];
			$('#tableRight').html(app.component.panelTable(jason,'Basic','default'));
		});
		
	};
/* 알고리즘수학 */	
	var math=function(){
		var wrapper=app.component.getWrapper();
		$('#math').on('click',function(){
			wrapper.empty();
			wrapper.append(app.algorithm.TABLE);
			var arr=[{id:'determinePrime',txt:'소수판별'},
				{id:'primeSum',txt:'소수의합'},
				{id:'primeCount',txt:'소수의개수'},
				{id:'lcmGcd',txt:'최대최소공배수'},
				{id:'euclid',txt:'유클리드 호제법'},
				{id:'fatorization',txt:'약수구하기'},
				{id:'primeFactor',txt:'소인수분해'},
				{id:'multiSum',txt:'배수의 합'},
				{id:'approx',txt:'근사값 구하기'}];
			var str='';
			$.each(arr,function(i,j){
				str+='<li id="'+j.id+'" class="list-group-item"><a href="#">'+j.txt+'</a></li>';
			});
			$('#tableLeft').html(str);
			determinePrime();
		});
		
	};
	var determinePrime=function(){
		$('#determinePrime').on('click',function(){
			alert('determinePrime click');
		});
	};
/* 알고리즘응용 */	
	var appl=function(){
		$('#appl').on('click',function(){
			alert('appl click');
		});
	};	
	return {
		init : init,
		series : series,
		aSeries : aSeries,
		swSeries : swSeries,
		dSeries : dSeries,
		factorial : factorial,
		fibonacci : fibonacci,
		arr : arr,
		randomGen : randomGen,
		matrix : matrix,
		basic : basic,
		math : math,
		determinePrime : determinePrime,
		appl : appl
	};
})();
app.oop=(function(){
	var init=function(){
		onCreate();
	};
	var onCreate=function(){
		setContentView();
		encap();
		inherit();
	};
	var setContentView=function(){};
	var encap=function(){
		$('#encap').on('click',function(){
			var wrapper=app.component.getWrapper();
			wrapper.empty()
			.append(app.algorithm.TABLE);
			$('#tableLeft').html(app.oop.OOP_MENU);
			var tableRight=$('#tableRight');
			app.component.inputText('inputText').attr('placeholder','이름 나이 성별 직업(공백으로 구분)입력').appendTo(tableRight);
			app.component.aButton('aButton','btn-primary').html('스펙보기').appendTo(tableRight)
				.css('margin','10px auto')
				.on('click',function(){
					var inputVal=$('#inputText').val();
					var arr=inputVal.split(' ');
					console.log(inputVal);
					var doctor=new app.Person();
					doctor.setId(arr[0]);
					doctor.setPass(arr[1]);
					doctor.setName(arr[2]);
					doctor.setGen(arr[3]);
					console.log(doctor);
					var spec='<h5>'+doctor.toString()+'</h5>';
					app.component.divAlert('alert-danger').html(spec).appendTo(tableRight);
			});
		});
	};
	var inherit=function(){
		$('#inherit').on('click',function(){
			var wrapper=app.component.getWrapper();
			wrapper.empty()
			.append(app.algorithm.TABLE);
			$('#tableLeft').html(app.oop.OOP_MENU);
			var tableRight=$('#tableRight');
			app.component.inputText('inputText').attr('placeholder','이름 나이 성별 직업(공백으로 구분)입력').appendTo(tableRight);
			app.component.aButton('aButton','btn-primary').html('스펙보기').appendTo(tableRight)
				.css('margin','10px auto')
				.on('click',function(){
					var inputVal=$('#inputText').val();
					var arr=inputVal.split(' ');
					console.log(inputVal);
					var doctor=new app.Person();
					doctor.setId(arr[0]);
					doctor.setPass(arr[1]);
					doctor.setName(arr[2]);
					doctor.setGen(arr[3]);
			
					var spec='<h5>'+doctor.toString()+'</h5>';
					app.component.divAlert('alert-primary').html(spec).appendTo(tableRight);
			});
		});
	};
	return {
		init : init,
		encap : encap,
		inherit : inherit,
		poly : function(){}
	};
})();
/*
 * 알고리즘 클래스
 */
// id,pass,name,gen,phone,email;
app.info=function() { 
	var _id,_pass,_name,_gen,_phone,_email;
	return {
		setId : function(id){this._id=id;},getName : function(){return this._id;},
		setPass : function(pass){this._pass=pass;},getPass : function(){return this._pass;},
		setName : function(name){this._name=name;},getName : function(){return this._name;},
		setGen : function(gen){this._gen=gen;},getGen : function(){return this._gen;},
		setPhone : function(phone){this._phone=phone;},getPhone : function(){this._phone;},
		setEmail : function(email){this._email=email;},setEmail : function(){this._email;},
		toString : function() { 
			 return this._id+','+this._pass+','+this._name+','+this._gen+','+this._phone+','+this._email; 
		}
	};
};

app.Info2=(function(){
    var Constructor = function(id,pass,name,gen,phone,email){
        this.id = id || 0;
    };

    Constructor.prototype = {
        value: null,
        add: function(numToAdd) {
            this.value += numToAdd;
        }
    };

    return Constructor;
})();
//var Y = new app.Info(13);
//Y.add(1);
//Y.value;
app.person=(function(){
	var wrapper,ctx,img,js,css;
	var init = function(){
		wrapper=app.component.getWrapper();
		ctx=app.session.getContextPath();
		img=app.session.getImagePath();
		js=app.session.getJavascriptPath();
		css=app.session.getStylePath();
		$('#brand').on('click',function(){
			alert('brand click!!');
		});
		$('#wrapper').load(ctx+'/login/form');
		login();
	};
	var login=function() {
		$('#login-submit').on('click',function(){
			alert('login-submit click!!');
		});
	    $('#login-form-link').on('click',function(e) {
	    	alert('login-form-link click');
			$("#login-form").delay(100).fadeIn(100);
	 		$("#register-form").fadeOut(100);
			$('#register-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});
		$('#register-form-link').on('click',function(e) {
			alert('register-form-link');
			$("#register-form").delay(100).fadeIn(100);
	 		$("#login-form").fadeOut(100);
			$('#login-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});

	};
	return {
		init : init,
		login : login
	};
})();

/*******************************************************************************
 * View 
 ******************************************************************************/
app.component=(function(){
	var _body,_wrapper;
	var setBody=function(body){this._body=body;}
	var getBody=function(){return this._body;}
	var setWrapper=function(wrapper){this._wrapper=wrapper;}
	var getWrapper=function(){return this._wrapper;}
	var init=function(){onCreate();};
	var onCreate=function(){
		setContentView();
	};
	var setContentView=function(){
		app.component.setWrapper($('#wrapper'));
		app.component.setBody($('body'));
	};
	return {
		init : init,
		getWrapper : getWrapper,
		setWrapper : setWrapper,
		getBody : getBody,
		setBody : setBody,
		div : function(id){
			return $(id);
		},
		aButton : function(id,type){
			return $('<a href="#" id="'+id+'" class="btn '+type+'" role="button">example</a>');
		},
		bButton : function(){
			return $('<button id="bButton" type="button" class="btn btn-default">example</button>');
		},
		inputText : function(id){
			return $('<input id="'+id+'" type="text" class="form-control" placeholder="example" aria-describedby="basic-addon1">');
		},
		divAlert : function(type){ // alert-danger
			return $('<div class="alert '+type+'" role="alert">example</div>');
		},
		horList : function(arr,type){
			var list='<div class="btn-group" role="group" aria-label="...">';
			$.each(arr,function(i,j){
				list+='<button id="list-button-"'+i+' type="button" class="btn btn-'+type+'">'+arr[i]+'</button>';
			});
			list+='</div>';
			return list;
		},
		panelTable : function(jason,txt,type){
			
		    var table = 
				'<div class="panel panel-'+type+'">'
				+'<div class="panel-heading">행렬</div>'
				+'<table id="table">'
				+'<tr style="width:250px">'
				+'<th colspan="5">'+txt+'</th>'
				+'</tr>'
				+'<tbody>';
				$.each(jason, function(i,j){
					table +=
						'<tr>'
						+'<td style="width:20%">'+j.a+'</td>'
						+'<td style="width:20%">'+j.b+'</td>'
						+'<td style="width:20%">'+j.c+'</td>'
						+'<td style="width:20%">'+j.d+'</td>'
						+'<td style="width:20%">'+j.e+'</td>'
						+'</tr>';
				});
				
				table += '</tbody></table>'
		    
			return table;
		},
		Border : function(){
			
		}
		
	};
})();
app.style=(function(){
	var tableBorder=function(){
		
	};
	return {
		tableBorder : tableBorder
	};
})();
app.login=(function(){
	
})();
app.navi=(function(){})();
app.patient=(function(){})();
app.algorithm.TABLE=
	'<table id="table" style="width:800px;height:300px;border-collapse: collapse;border: 1px solid black;margin:0 auto">'
	+	'<tr style="border: 1px solid black;">'
	+		'<td id="tableLeft" style="width: 50%;border: 1px solid black;"></td>'
	+		'<td id="tableRight" style="width: 50%;border: 1px solid black;"></td>'
	+	'</tr>'
	+'</table>';
app.algorithm.SERIES_MENU=
	'<ul class="list-group">'
	+	'<li id="aSeries" class="list-group-item"><a href="#">등차수열 합</a></li>'
	+	'<li id="swSeries" class="list-group-item"><a href="#">스위치수열 합</a></li>'
	+	'<li id="dSeries" class="list-group-item"><a href="#">계차수열 합</a></li>'
	+	'<li id="factorial" class="list-group-item"><a href="#">팩토리얼수열 합</a></li>'
	+	'<li id="fibonacci" class="list-group-item"><a href="#">피보나치수열 합</a></li>'
	+'</ul>';
app.oop.OOP_MENU=
	'<ul class="list-group">'
	+	'<li id="encap" class="list-group-item"><a href="#">캡슐화</a></li>'
	+	'<li id="inherit" class="list-group-item"><a href="#">상 속</a></li>'
	+	'<li id="poly" class="list-group-item"><a href="#">다형성</a></li>'
	+'</ul>';
app.algorithm.ARR_TABLE=
	'<div class="row">'
    +'<div class="col-sm-12">'
    +'<div class="panel colourable">'
    +'<div class="panel-heading">'
    +'<span class="panel-title">IDC 2D Map</span>'
    +'</div>'
    +'<div class="panel-body">'
    +    '<div class="init-table">'
    +        '<span>Make Map</span>'
    +        '<input type="text" id="mRow" placeholder="가로 행">'
    +        '<input type="text" id="mCol" placeholder="세로 열">'
    +        '<button type="submit" class="tc-btn btn btn-default">Create</button>'
    +    '</div>'
    +    '<div class="control-box" style="display: none;">'
    +        '<span class="btn mRow-add">가로 행 추가 <i class="fa fa-plus"></i></span>'
    +        '<span class="btn mRow-del">가로 행 제거 <i class="fa fa-minus"></i></span>'
    +        '<span class="btn mCol-add">세로 열 추가 <i class="fa fa-plus"></i></span>'
    +        '<span class="btn mCol-del">세로 열 제거 <i class="fa fa-minus"></i></span>'
    +    '</div>'
    +    '<div class="show-map text-center" style="padding-top: 15px;"><span>Not exist map. first, create map.</span></div>'
    +'</div>'
    +'</div>'
    +'</div>'
    +'</div>';


/*******************************************************************************
 * Controller
 ******************************************************************************/
app.controller=(function(){})();