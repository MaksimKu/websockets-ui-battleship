import dataBase from "./dataBase.js";

function reg (message) {
    const userRegResponseData = {
        name: '',
        index: 0,
        error: false,
        errorText: '',
    };
    const parseMessage = JSON.parse(message);
    const parseDataMessage = JSON.parse(parseMessage.data);
    const pass = dataBase.filter(item => item.password === parseDataMessage.password);
    if (dataBase.find((user) => user.name === parseDataMessage.name)) {
        if (parseDataMessage.password !== pass[0].password) {
        userRegResponseData.error = true;
        userRegResponseData.errorText = 
        'User with this name is already in game. Choose another name';
        }
    }
    userRegResponseData.name = parseDataMessage.name;
    userRegResponseData.index = dataBase.length;
    dataBase.push(parseDataMessage);
    return {type: 'reg', data: JSON.stringify(userRegResponseData)}
}

export default reg;