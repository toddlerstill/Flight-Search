$(document).ready(function(){
	
$('.TabSection #tabs li').on('click',function(){
	
		$('.TabSection #tabs li').removeClass('active');
		$(this).addClass('active');
		
		
	
});


	
$('.TabSection #tabs li:last-child').on('click',function(){
	
	
		$('#return-date').focus();
	
});	

  $( "#departure-date" ).datepicker({
	  dateFormat: 'dd-mm-yy',
    defaultDate: "+1d",
    changeMonth: false,
    numberOfMonths: 1,
    minDate: 0,
    onClose: function(selectedDate) {
        $( "#return-date" ).datepicker( "option", "minDate", selectedDate );
        $( "#return-date" ).datepicker( "option", "maxDate", new_date(selectedDate, 30) );
    }
});


$( "#return-date" ).datepicker({
	dateFormat: 'dd-mm-yy',
    defaultDate: "+1w",
    changeMonth: false,
    numberOfMonths: 1
});


function new_date(old_date, days_after) {
    var month = parseInt(old_date.substring(0, 2))-1;
    var day = parseInt(old_date.substring(3, 5));
    var year = parseInt(old_date.substring(6, 10));
    var myDate = new Date(year, month, day);
    myDate.setDate(myDate.getDate() + days_after);
    var newMonth = myDate.getMonth()+1;
    var newDay = myDate.getDate();
    var newYear = myDate.getFullYear();
    var output = newMonth + "/" + newDay + "/" + newYear;  
    return output;
}

/* Passenger Selection*/

const increment = document.querySelectorAll('.Inc');
[...increment].map(inc=>inc.addEventListener('click',function(event){
	let inputval = parseInt(event.target.nextSibling.value);
	inputval++;
	event.target.nextSibling.value = inputval;
	var adult = parseInt(increment[0].nextSibling.value)
	var child = parseInt(increment[1].nextSibling.value)
	
	let TotalPassengers = parseInt(adult + child);
	if(TotalPassengers >9){
		
		alert("Cannot select More than 9 passengers")
		
	}
	if(inputval<=0){
		event.target.nextSibling.value = 0;
	}
	
}))

const decrement = document.querySelectorAll('.Dec');
[...decrement].map(inc=>inc.addEventListener('click',function(event){
	let inputval = parseInt(event.target.previousSibling.value);
	
	inputval--;
	event.target.previousSibling.value = inputval;
	if(inputval<=0){
		event.target.previousSibling.value = 0;
		
	}
	
}))
	/* Passenger Selection End*/
	
	
	/*JSON*/
	
	
	var url = "js/fligthData.json";
	fetch(url)
	.then(response=>{
		
		return response.json()
		
	}).then(data=>{
		var ResultData = data.FlightData;
	
		$('#Origin').keyup(function(){
			
			var Orgval = document.getElementById("Origin").value;
				
			  for(var i=0;i<ResultData.length;i++){
				  
				  if(ResultData[i].From.indexOf(Orgval) > -1)  {
					  $('#OriginValue').append('<option value="'+ResultData[i].From+'">'+ResultData[i].From+'</option>')
					  var code = {};
						$("#OriginValue > option").each(function () {
						if(code[this.text]) {
							$(this).remove();
						} else {
							code[this.text] = this.value;
						}
						});
					}
					
			  }

		
			
		});
		
		
		$('#Destination').keyup(function(){
				var Destval = document.getElementById("Destination").value;
				
			  for(var i=0;i<ResultData.length;i++){
				  
				  if(ResultData[i].To.indexOf(Destval) > -1)  {
					  $('#DestinationValue').append('<option value="'+ResultData[i].To+'">'+ResultData[i].To+'</option>')
					    var code = {};
						$("#DestinationValue > option").each(function () {
						if(code[this.text]) {
							$(this).remove();
						} else {
							code[this.text] = this.value;
						}
						});
					  
					}
			  }

		});
		
		
		$("#return-date").on('focus',function(){
			
			$('#tabs li').removeClass('active');
			$('#tabs li:last-child').addClass('active');
			
		});
		

		
		/*Search Validation*/
		
		$("#SearchBtn").on('click',function(){
			$('.OutPutBox .OpView').html('');
			var InpBx1 =  $('#Origin').val();
			var InpBx2 = $('#Destination').val(); 
			var DepartureBx = $('#departure-date').val();  
			var ReturnBx = $('#return-date').val();  
			var AdultVal = parseInt($('.Adult input').val());
			var ChildVal = parseInt($('.Children input').val());	
			var TotalVal = parseInt(ChildVal + AdultVal);			
			var form = document.getElementById('FlightForm');
			
		
		

	var ValidFn = ()=>{
		
		if(InpBx2 != ''){
			
			var ToArr = [];
			
			for(var i=0;i<ResultData.length;i++){
				ToArr.push(ResultData[i].To);
			}
			var ToCurrVal = ToArr.includes(InpBx2);
			
				if(ToCurrVal == true){
					$('#SearchBtn').focus();
					var FinalArr = ResultData.filter(function(Toval){
						if(ReturnBx==''){
						 return Toval.From == InpBx1 && Toval.To == InpBx2 && Toval.Date == DepartureBx; 
						 
							
						}
						
						if(ReturnBx !=''){
							 return Toval.From == InpBx1 && Toval.To == InpBx2 && Toval.Date == DepartureBx || Toval.From == InpBx2 && Toval.To == InpBx1 && Toval.Date == DepartureBx; 
							
						}
						
					
							
					
					});
					
					if(TotalVal >9){
								
							alert("Cannot select More than 9 passengers")
							return false;
					}
					
					
					
						
						if(FinalArr == ''){$('.OutPutBox .OpView').append('<div class="Error">No Flights Avilable</div>');form.reset();}
						else{
					for(var i=0;i<FinalArr.length;i++){
							$('.OutPutBox .OpView').append('<div class="FlData"><div class="Price">&#8377; '+FinalArr[i].Price+' <p>Book This Flight</p></div><div class="FlDetails"><div class="CodeRtrn"><p>'+FinalArr[i].Code+'</p><p>'+FinalArr[i].From+' > '+FinalArr[i].To+'</p></div> <div class="ArriveDepart"><p><strong>Arrival:</strong> '+FinalArr[i].Arrive+'</p><p><strong>Departure:</strong> '+FinalArr[i].Depart+'</p></div></div></div>')
						}		
					}	
					
					$('.Price p').on('click',function(){
	
	
	alert("Booked");
	
});	
					
					return true;
						
				}
				alert("Please enter a valid Destination");
				$('#Destination').focus();
				return false;
				}
		
	}
	
		if(InpBx1 == ''){
			alert("Enter a source");
			$('#Origin').focus();
			return false;	
			}
			
		else if(InpBx2 == ''){alert("Please enter a Destination");$('#Destination').focus();return false;}	
		
		else if(DepartureBx == ''){alert("Please enter a valid departure date");$('#departure-date').focus(); return false;}
		
			
		/*else */	
			
			else {
				
				if($('.TabSection #tabs li:last-child').hasClass('active')){
						
						if(ReturnBx == ''){alert("Please enter a valid Return date");$('#return-date').focus(); return false;}
					
				}
				
			if(InpBx1 != ''){
			
			var OrgArr = [];
			
			for(var i=0;i<ResultData.length;i++){
				OrgArr.push(ResultData[i].From);
			}
			var CurrVal = OrgArr.includes(InpBx1);
			
				if(CurrVal == true){
					ValidFn();
					return true;
					
				}
				else{
				alert("Please enter a valid Source");
				$('#Origin').focus();
				return false;
				}
				}
				
				
				
			}
			
		});
		
		/*Search Validation End*/
		
		
	})
		
	
	
	
	
	
	
	/*JSON End*/
	
});