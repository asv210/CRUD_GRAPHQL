export const createResult = ({ data, message, status, token }) => {
    const newData=token?{
        status,
        message,
        data:data|| "",
        token
    }:{
        status,message,
        data:data||""
    }
    return newData
};
