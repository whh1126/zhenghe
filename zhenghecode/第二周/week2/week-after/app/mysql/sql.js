module.exports = {
    //增加
    ADD_SELECT: "insert into list(user,pwd,email,weixin,weibo,tenxun) values(?,?,?,?,?,?)",
    //查找
    SELECT: 'select * from list where user=?',
    //修改
    UPDATE: 'update list set user=? where id=?',
    //删除
    DELETED: 'delete from list where id=?'

}