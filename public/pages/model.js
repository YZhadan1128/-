
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({ //定义数据模型
    name: String,
    pwd: String

});
mongoose.model('u2', UserSchema);
