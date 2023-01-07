
const customLoggerMiddleWare = (req,res,next) => {
    let currentDateTime = new Date();
    let year = currentDateTime.getFullYear();
    let month = currentDateTime.getMonth() + 1;
    let date = currentDateTime.getDate();
    let hours = currentDateTime.getHours();
    let minutes = currentDateTime.getMinutes();
    let seconds = currentDateTime.getSeconds();

    let dateString = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    let method = req.method;
    let status = res.statusCode;
    let url = req.url;

    let logString = `[${dateString}] ${method}:${url} ${status}`;
    console.log(logString);

    next();
}


module.exports = customLoggerMiddleWare;