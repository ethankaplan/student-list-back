if(process.env.ON_HEROKU!==1){
module.exports = {
    db: 'mongodb://localhost:27017/reactdb'
    
  };
}else{
  module.exports = {
    db: `mongodb+srv://1:${process.env.BE_PW}@cluster0.1m3su.mongodb.net/students?retryWrites=true&w=majority`
  };
}