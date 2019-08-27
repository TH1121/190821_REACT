import React,{Component} from "react";
import {Redirect} from 'react-router-dom'
import memoryUtils from "../../utils/memoryUtils";
import { Layout } from "antd";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
/*
后台管理的路由组件
 */

const {Footer,Sider,Content} = Layout

export default  class Biaoqianzu extends Component {
    render(){
        const user = memoryUtils.user
        if (!user||!user._id){
            //自动跳转至登录页面
            return <Redirect to ='/login'/>
        }
        return(
           <Layout style={{ height:'100%'}}>
               <Sider>
                   <LeftNav/>
               </Sider>
               <Layout>
                   <Header>Sider</Header>
                   <Content style={{ backgroundColor:'#ffffff'}}>Sider</Content>
                   <Footer style={{ textAlign:'center',color:'#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
               </Layout>
           </Layout>
        )
    }
}