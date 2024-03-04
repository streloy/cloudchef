exports.failedOutput = (res, msg) =>{
    res.status(200).json({
        success: 0, 
        message: msg
    });
}

exports.failedOutput = (res, msg, data) =>{
    res.status(200).json({
        success: 0, 
        message: msg, 
        data: data
    });
}

exports.successOutput = (res, msg) => {
    res.status(200).json({
        success: 1, 
        message: msg,
    })
}

exports.successOutput = (res, msg, data) => {
    res.status(200).json({
        success: 1, 
        message: msg,
        data: data
    })
}

exports.loginSuccessOutput = (res, msg, token, data) => {
    res.status(200).json({
        success: 1, 
        message: msg,
        token: token,
        data: data
    })
}

exports.failedOutputToken = (res, msg, data) =>{
    res.status(498).json({
        success: 0, 
        message: msg, 
        data: data
    });
}