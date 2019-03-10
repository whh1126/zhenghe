define(['mui', 'utils'], function(mui, utils) {
    function getUser(uid) {
        console.log(uid);
        var ls = window.localStorage;
        if (ls.getItem('yonghu')) {
            return ls.getItem('yonghu');
        } else {
            ls.setItem('yonghu', uid)

        }
        return getUser

    }

    function getParms() {
        var parms = location.search;
        //如果传不到则不执行return
        if (!parms) {
            return
        }
        parms = parms.slice(1); //截取?后面的
        return '{' + parms.replace(/&/g, '",').replace(/=/g, '":') + '}'
    }
    return {
        getParms: getParms,
        getUser: getUser
    }

})