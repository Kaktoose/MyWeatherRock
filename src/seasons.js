
function getSeason(lat){
    let month = new Date().getMonth()
    

    let spring = [2,3,4]
    let summer = [5, 6, 7] 
    let fall = [8, 9, 10]
    let winter = [11, 0, 1]
    
    if(spring.includes(month)){
        return lat >  0 ? "Spring" : "Fall"
        
    } else if (summer.includes(month)){
        return lat > 0 ? "Summer" : "Winter"
    } else if (fall.includes(month)){
        return lat > 0 ? "Fall" : "Spring"
    } else if (winter.includes(month)){
        return lat > 0 ? "Winter": "Summer"
        
    } 
}

export default getSeason