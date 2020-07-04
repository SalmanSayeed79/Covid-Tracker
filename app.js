var from=document.querySelector('#from');
let to=document.querySelector('#to');
let country=document.querySelector('#country');
let button=document.querySelector('#button');
let label_item=document.querySelector('label');
let full_container=document.querySelector('.full_container');
let graph_container=document.querySelector('.graph_container');
let input_container=document.querySelector('.input_container');




let canvas_confirmed=document.querySelector('#confirmed').getContext('2d');
let canvas_death=document.querySelector('#death').getContext('2d');



//taking all the buttons as input
let country_btn=document.querySelector('#country_btn');
let from_btn=document.querySelector('#from_btn');
let to_btn=document.querySelector('#to_btn');

console.log(country_btn);
//=====================================================================================================================================================//
//
//  PAGE ANIMATION
//
//=====================================================================================================================================================//

setTimeout(()=>{
full_container.classList.add('curtain_fall');
},1000)











//=====================================================================================================================================================//
//
//  INPUT FIELDS
//
//=====================================================================================================================================================//







//when country_btn is clicked we save the input in a variable, remove that entry field and enter the next entry field and change the label
country_btn.addEventListener('click',()=>{
    
    country.classList.add('hide');
    country_btn.classList.add('hide');

    from.classList.add('showing');
    from_btn.classList.add('showing');
    //changing the label
    label_item.innerText="From date: ";

    //chnaging the bg
    full_container.classList.toggle('change_bg');
})
//when country_btn is clicked we save the input in a variable, remove that entry field and enter the next entry field
from_btn.addEventListener('click',()=>{
    

    from.classList.remove('showing');
    from_btn.classList.remove('showing');

    to.classList.add('showing');
    to_btn.classList.add('showing');

    label_item.innerText="To date: ";

    //chnaging the bg
    full_container.classList.toggle('change_bg');
})
//when country_btn is clicked we save the input in a variable, remove that entry field and enter the next entry field
to_btn.addEventListener('click',()=>{
   
    
    to.classList.remove('showing');
    to_btn.classList.remove('showing');

    button.classList.add('showing');

    label_item.innerText="Launch!! ";

    //chnaging the bg
    full_container.classList.toggle('change_bg');
})













//=====================================================================================================================================================//
//
//
//              ON-CLICK of the button
//
//
//=====================================================================================================================================================//


button.addEventListener('click',()=>{
    //getting all the values from the entry_fields
    country_value=country.value;
    from_value=from.value;
    to_value=to.value;
    console.log(to_value);
    console.log(from_value);
    console.log(country_value);

    //hiding the button
    input_container.removeChild(input_container.childNodes[15]);
    graph_container.classList.add('show_container')

    //getting data from the api

    let url=`https://api.covid19api.com/country/${country_value}?from=${from_value}T00:00:00Z&to=${to_value}T00:00:00Z`
    fetch(url)
        .then(response =>{
            return response.json();
        })
        .then(data=>{
            console.log(data);
             //cleaning data from the fetch
        var deaths=[];
        var confirmed=[];
        var dates=[];
        for(let i=0;i<data.length;i++){
            deaths.push(data[i]["Deaths"]);
            confirmed.push(data[i]["Confirmed"]);
            dates.push(data[i]["Date"].slice(0,10));
            console.log(deaths);
            console.log(confirmed);
            console.log(dates);
            
            
               //plotting deaths in a graph
               var death_chart=new Chart(canvas_confirmed,{
                // The type of chart we want to create
            type: 'line',
            
            // The data for our dataset
            data: {
                labels: dates,
                datasets: [{
                    label: 'Confirmed Cases',
                    backgroundColor: 'rgb(16, 245, 232)',
                    borderColor: 'rgb(4, 210, 198)',
                    data: confirmed,
                }]
            },

            // Configuration options go here
            options: {
                responsive:false,
                maintainAspectRatio	:true,
            }
        });
     
            //plotting deaths in a graph
            var death_chart=new Chart(canvas_death,{
                    // The type of chart we want to create
                type: 'line',
                
                // The data for our dataset
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Deaths',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: deaths,
                        
                    }]
                },
    
                // Configuration options go here
                options: {
                    responsive:false,
                    maintainAspectRatio	:true,
                }
            });
        }
        })

                })

