/**
 * Created by dengfuming on 2018/8/24.
 */
export default class Util{
    static md5(data){
        var md5 = require('md5');
        return md5(data);
    }
}

