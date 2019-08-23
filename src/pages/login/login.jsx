import React,{Component} from "react";
import './login.less';
import logo from "./images/logo.png"
import {Form,Icon,Input,Button,message} from 'antd'
import {reqlogin} from'../../api'
const Item = Form.Item
/*
登录的路由组件
 */

class login extends Component {

    handleSubmit = (event) => {

        event.preventDefault()

        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {username,password} = values
                    const response = await reqlogin(username,password)
                    console.log('请求成功',response.data)
                const result = response.data
                if (result.status===0){
                    message.success('登录成功')
                    this.props.history.replace('/')
                }else {
                    message.error(result.msg)
                }
            }else{
                console.log('校验失败！')
            }
        });

        // const form =this.props.form
        // const values = form.getFieldsValue()
        // console.log('handleSubmit() ',values)
    }

    validatePwd = (rule,value,callback) => {
        console.log('validatePwd()',rule.value)
        if (!value){
            callback("密码必须输入")
        }else if (value.length<4){
            callback("密码长度不能小于4位")
        }else if (value.length>12){
            callback("密码长度不能超过12位")
        }else if (!/^[a-zA-Z0-9_]+$/.test(value)){
            callback("密码必须是英文、数字或下划线组成")
        }else {
            callback()
        }
    }
    render(){

        const form = this.props.form
        const {getFieldDecorator} = form;

        return(
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>xx项目后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true,whitespace: true, message: '账号必须输入' },
                                    { min: 4, message: '用户名长度不能小于4位' },
                                    { max: 12, message: '用户名长度不能超过12位' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                                    ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入账号"
                                />,
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        validator: this.validatePwd
                                    }

                                    ],
                            })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入密码"
                            />
                            )}
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}

const WrapLogin = Form.create()(login)
export default WrapLogin




