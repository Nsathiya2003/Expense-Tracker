export const formatedDate = (date,next) =>{
    const [day,month,year] = date.split('-');
    const formatedDate = new Date (`${year}-${month}-${day}`);
    return formatedDate;
}

export const sendSuccess = (res,message='Success',data=null,code=200) =>{
     return res.status(code).json({
        status:true,
        message,
        data
     })
};

export const sendError = (res,message='Something went wrong',error=null,code=500) =>{
    return res.status(code).json({
        status:false,
        message,
        error

    })
}

export const alreadyExists = (res, field = "Field", code = 400) => {
  const message = `${field} already exists`;
  return res.status(code).json({
    status: false,
    message,
    field
  });
};
