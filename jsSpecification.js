/**
 * Created by gerry.zhong on 2016/10/11.
 */
var gerry =
(function(){
    //创建一个独立的对象，注入所有的方法，包括你想抛出去和不想抛出去的
    var tool = {
        AAAA:function(){},
        BBBB:function(){
            console.log("我只想内部使用，不想给别人用");
        }
    };

    /*
    * 该对象承载所有需要抛出去的对象
    *   1.该对象中的方法可以自己写
    *   2.该对象中的方法可以注入（例子中的tempObj.tool.AA）
    *   3.该对象也可以选择性抛出给使用者需要的方法，也可以隐藏（tool.BBBB）
    * */
    var tempObj ={
        //reader为一些初始化需要的操作，有时候会有注册事件等，或者一些预操作
        reader:function(){
        },
        //注入所有的选择器，方便选择器变化，直接修改该对象中的选择器，而不需要全局去更改
        selector:{
            mySelector:"#mySelector",  //原密码
        },
        //注入所有的接口地址，方便接口变化可以进行，快速变更，不需要全局找引用的对象
        interface:{
            loginUrl:"",
        },
        //注入page中所有的事件，统一管理，建议命名规范：事件_命名，例 click_login
        registerEle:{
            click_login:function(){
                //注册单击事件
            }
        },
        //注入所有ajax请求，页面所有请求，将在这里统一管理，建议命名规范：ajax_命名，例 ajax_login
        /*
        * 该请求中有2种方案,看需求使用
        *  1.不公用一个请求方案
        *  2.公用一个请求，但是回调处理不一样
        * */
        ajaxRequest:{
            //不公用一个请求方案
            ajax_login:function(){
                $.post("","",function(data){
                    tempObj.callback.call_login(data);
                });
            },
            //会有多个业务公用这个请求
            ajax_login_T:function(callback){
                //所有接口地址从interface中获取，callback中tempObj.callback中处理
                $.post("","",callback);
            },
        },
        //处理所有回调函数，针对一个请求，处理一个回调
        callback:{
            //不共用请求处理回调
            call_login:function(data){
                //处理回调
            },
            //公用请求处理回调
            call_login_T:function(){
                var temp = function(){

                };
                tempObj.ajaxRequest.ajax_login_T(temp);
            }
        },
        //所有使用的工具类，如果每个项目都单独的unit.js或者common.js等存放一些公共方法的，这里可以不使用
        // PS:这里存放的只是仅针对于这个页面处理的一些tool，一般没必要抛出去，不过看业务而定
        tool:{
            A:function(){
                console.log("我是自己写的方法");
            },
            AA:tool.AAAA,    //这是我想抛出去给别人用的东西
        },
        //临时缓存存放区域，仅针对本页面，如果跨页面请存放cookie或者localstorage等
        //主要解决有时候会使用页面控件display来缓存当前页面的一些数据
        temp:{

        },
        /*
        * 业务使用区域，针对每个特别的业务去串上面所有的一个个原子
        *   因为上面所有的方法，只是做一件事，这边可以根据业务进行串服务，很简单的
        * */
        firm:{

        }
    };
    /*
    * 闭包抛出去的方法
    * */
    var outputObj =function(){
        //首先执行reader方法，初始化一些操作，比如注册事件啥啥啥的
        tempObj.reader();
        /*
        * 抛出给别人使用的对象
        *   想给别人看和使用的东西，可以注入tempObj对象，就像tool中的AA的方式
        *   不想给别人看和使用的东西，就像内部tool对象中的BBBB方法，你内部可以使用，外部是无法引用的
        * */
        return tempObj;
    }

    //抛出你希望抛出去的对象，因为你掌控了所有，哈哈。
    return new outputObj();
})();