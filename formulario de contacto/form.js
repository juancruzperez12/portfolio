var inputs = document.getElementsByClassName('input-form');
for (var i =0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', function(){
        if(this.value.length>=1) {
            this.nextElementSibling.classList.add('pinup');
        } else {
            this.nextElementSibling.classList.remove('pinup');
        }
    });
}