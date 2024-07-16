export const basicTextStyleBold = {
    alignContent: 'center',
    color: 'white',
    textShadow: '0px 0px 3px #000000',
    fontFamily: '"Cardo", serif',
    fontWeight: 700
}

export const titleTextStyleBold = {
    alignContent: 'center',
    color: 'white',
    textShadow: '0px 0px 6px #000000',
    fontFamily: '"Cardo", serif',
    fontWeight: 700,
    fontSize: 70
}

export const logoTextStyle = {
    alignContent: 'center',
    color: 'khaki',
    textShadow: '0px 0px 15px #8B0000',
    fontFamily: '"Cardo", serif',
    fontWeight: 700,
    fontSize: 80,
}

export const basicTextStyle = {
    alignContent: 'center',
    color: 'white',
    textShadow: '0px 0px 3px #000000',
    fontFamily: '"Cardo", serif',
    fontWeight: 400
}

export const flexHeader = (flex) => {
    return {
        alignContent: 'center',
        flex: flex,  
        textTransform: 'capitalize',
        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.3))'
    }
}

export const flexFeat = (flex, color) => {
    return {
        alignContent: 'center',
        flex: flex,  
        border: "1px solid black",
        textTransform: 'capitalize',
        backgroundColor: color
    }
}