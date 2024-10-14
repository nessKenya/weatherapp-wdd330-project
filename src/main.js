document.querySelector('#app').innerHTML = `
      <div id="search-box" class="text-center">
        <img src="/cloudy.ico" alt="logo" height=100 width=100 />
        <h1 class="text-center">Get the weather forecast.</h1>
        <input id="location-search" type="text" placeholder="type city name">
        <button>Get weather</button>
        <p>or</p> 
        <button>Use My Current Location</button>
      </div>
`

const showPosition = (pos) => console.log(pos)  

navigator.geolocation.getCurrentPosition(showPosition)
