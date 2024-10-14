// document.querySelector('#app').innerHTML = `
//       <div id="search-box" class="text-center">
//         <h1 class="text-center">Get the weather forecast.</h1>
//         <input id="location-search" type="text" placeholder="type city name">
//         <button>Get weather</button>
//         <p>or</p> 
//         <button>Use My Current Location</button>
//       </div>
// `

const goBack = () => document.location.href = '/';

document.querySelector('#back-btn').addEventListener('click', goBack)