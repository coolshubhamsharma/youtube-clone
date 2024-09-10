export const API_KEY = 'AIzaSyCzZjZ6LigpydHvcRcGL4bjFR-zKCBp808'

export const valu_converter = (value)=>{
    if(value>=1000000){
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"K";
    }
}
