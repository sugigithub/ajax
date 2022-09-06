const successcallback = (position) =>{
    console.log(position);
    
    console.log(`https://google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`);
}
const errorcallback = (err) =>{
    console.log(err)
}

navigator.geolocation.getCurrentPosition(successcallback,errorcallback);