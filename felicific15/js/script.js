function myFunc () {
	var slides = document.getElementsByClassName('step');
	console.log("asdffffff");
	
	for (index = 0; index < slides.length; ++index) {
	    console.log(slides[index].style);
	    if (slides[index].classList.contains('future')) 
		{
		    slides[index].style.visibility='hidden';
		}
		
		if(slides[index].classList.contains('present')){
			slides[index].style.visibility='visible';
		}
	}
}