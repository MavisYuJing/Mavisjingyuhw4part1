/**
 * USER NAME: Jing Yu
 * CONTACT:jingu@bu.edu
 */
// show some message to user interface 
function customAlert(msg,time = false){
    let dom = document.getElementsByClassName("alert_slot")
    if(dom.length > 0){
        dom[0].innerHTML = msg
    }
    if(!time)
    setTimeout(function(){
        dom[0].innerHTML ="" 
    },1000)
}
// render and show table base on four pointshttps://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
function render(one, two, three, four){
    let dom = document.getElementById("table_slot")
    let {scrollTop: top, scrollLeft: left} = dom
   
    let html = ""
    let head = ""
    for(let y = three ; y <= four ; y++){

        html += `<tr>`
        for(let x = one; x <= two ; x ++ ){

            if(y === three){
                if(x === one){
                    head +=  `<tr><th style='z-index: 88;position:relative;top: ${top}px'></th><th style='z-index: 88;position:relative;top: ${top}px'>${x}</th>`
                }else{
                    head +=  `<th style='z-index: 88;position:relative;top: ${top}px'>${x}</th>`
                }
            }
            
            if(x === one){
                html += `<td style='z-index: 8;position:relative;left: ${left}px'>${y}</div></td><td>${parseInt(x*y)}</td>`
            }else{
                html += `<td>${parseInt(x*y)}</td>`
            }
        }
        html += `</tr>`
        //appends last tab
        if(y === three){
            head += "</tr>"
        }
    }
    
    // template HTML for render function https://vuejs.org/v2/guide/render-function.html
    dom.innerHTML = `
        <table class="tb" cellspacing="0" cellpadding="10"  border="1">
            <thead>
                ${head}
            </thead>
            <tbody>
                ${html}
            </tbody>
        </table>`
    customAlert("DONE!!!")
}

$.validator.addMethod("oneCheck", function(value, element){
    let two =  parseInt($('#two').val().trim()) 
    if(!isNaN(value) && !isNaN(two)) {
        
        if(!isNaN(two)){
            return this.optional(element) || (parseInt(value) < two); 
        }else{
            return this.optional(element);
        }
        
    } else {
        return this.optional(element)||true;
    }
}, "the start point must lower than the colunm end point, please try another one");

$.validator.addMethod("threeCheck", function(value, element){
    let four =  parseInt($('#four').val().trim()) 
    if(!isNaN(value) && !isNaN(four)) {
        
        console.log(four)
        if(!isNaN(four)){
            return this.optional(element) || (parseInt(value) < four); 
        }else{
            return this.optional(element);
        }
        
    } else {
        return this.optional(element)||true;
    }
}, "the start point must lower than the row end point, please try another one");

$.validator.setDefaults({
    submitHandler: function(res) {
        //handle submit button click event https://jqueryvalidation.org/validate/
        let one = parseInt(document.getElementById("one").value)
        let two =  parseInt(document.getElementById("two").value)
        let three =  parseInt(document.getElementById("three").value)
        let four =  parseInt(document.getElementById("four").value)
        render(one, two, three, four)
    }
});


//wait the document ready https://www.w3schools.com/js/js_htmldom_document.asp
$(function(){
    document.getElementById("table_slot").addEventListener("scroll",function(e){
        console.log(e)
        let {scrollLeft:left,scrollTop:top} = e.target
        let trs = document.getElementsByTagName("tr")

        for(let i=0; i<trs.length; i++){
            trs.item(i).firstElementChild.setAttribute("style",`z-index: 8;position:relative;left: ${left}px`)
            if(i===0){
                for(let j = 0 ; j<trs[i].children.length; j++){
                    trs.item(i).children.item(j).setAttribute("style",`z-index: 88;position:relative;top: ${top}px`)
                }
            }
           
        }
    })
    $("#input_slot").validate({
        rules: {
            one: {
                required: true,
                range:[-50, 50],
                number: true,
                oneCheck: true
            },
            two: {
                required: true,
                range:[-50, 50],
                number: true,
            },
            three: {
                required: true,
                range:[-50, 50],
                number: true,
                threeCheck: true
            },
            four: {
                required: true,
                range:[-50, 50],
                number: true,
            },
           
        },
        messages: {
            one: {
                required: "please provide a valid digit",
                range: "Please enter a number in the range of - 50 to 50",
                digits:"please enter digital data"
            },
            two: {
                required: "please provide a valid digit",
                range: "Please enter a number in the range of - 50 to 50",
                digits:"please enter digital data"
            },
            three: {
                required: "please provide a valid digit",
                range: "Please enter a number in the range of - 50 to 50",
                digits:"please enter digital data"
            },
            four: {
                required: "please provide a valid digit",
                range: "Please enter a number in the range of - 50 to 50",
                digits:"please enter digital data"
            }
        }
    });
 
})