//input: two api
//output: next time a satellite is viewable over any address on earth
    //users can type address and a norad
    //responsive (mobile/desktop)
    //github pages

let searchBtn = document.querySelector('#search');
// console.log(searchBtn)
let addressBox = document.querySelector('#address');

let satelliteBox = document.querySelector('#norad')
let displayInfo = document.querySelector('#display')
//search btn event listener
searchBtn.addEventListener('click', () => {
    // console.log(encoded.value)
    //fetch input location w/ api key
    fetch(encodeURI(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressBox.value}.json?access_token=${apiKey.value}`))
        .then(res => res.json())
        .then(data => {
            //get coordinates 
            fetch(`https://satellites.fly.dev/passes/${satelliteBox.value}?lat=${data.features[0].center[1]}&lon=${data.features[0].center[0]}&limit=1&days=15&visible_only=true`)
                .then(result => result.json())
                .then(info => {
                console.log(info[0].rise.utc_datetime)
                //get date/time to display
                let displayList = document.createElement('ul')
                displayList.innerHTML=`
                Rise time:<li class="list-group-item">${info[0].rise.utc_datetime}</li>
                Culmintation time:<li class="list-group-item">${info[0].culmination.utc_datetime}</li>
                Visible time:<li class="list-group-item">${info[0].set.utc_datetime}</li>
                `
                displayInfo.appendChild(displayList)
            })
        })
})

