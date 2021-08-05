// import React from "react";
// import loginImg from "../../../assets/FInalCryptologo.png"
// import axios from "axios";
// import SweetAlert from 'react-bootstrap-sweetalert';
// import swal from 'sweetalert';
// import {Button,Input,Image,CardText,Card,Label,CardTitle} from 'reactstrap';



// export class Login extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   state = {
//     username : [],
//     password : []
//   }
//   render() {
//     return (
//       <div className="base-container" ref={this.props.containerRef}>
//         <CardTitle style={{fontSize:"3rem",marginTop:"8rem"}}>Login</CardTitle>
//         <div className="content">
//           <div className="image">
//             <img src={loginImg} />
//           </div>
//           <div className="form">
//             <div className="form-group">
//               <Label style={{color:"black"}} >Username</Label>
//               <Input style={{color:"black"}} onChange={(e)=>this.setState({username:e.target.value})} placeholder="username" />
//             </div>
//             <div className="form-group">
//               <Label  style={{color:"black"}}>Password</Label>
//               <Input style={{color:"black"}} onChange={(e)=>this.setState({password:e.target.value})} placeholder="password" />
//             </div>
//           </div>
//         </div>
//         <div className="footer">
//           <Button type="button" style={{marginTop:"-10rem"}} onClick={()=>{
//             axios({
//               url : `https://api.anteagle.tech/login?username=${this.state.username}&password=${this.state.password}`,
//               headers:{
//                 'Accept' : "aaplication/json"
//               },
//               method : "post"
//             }).then(res=>{
//               if(res.data.success){
//                 swal("Login Successfull","Proceeding to Home Page","success")
//                 localStorage.setItem("jwt","test")
//                 localStorage.setItem("BTC_Coins",res.data.BTC_Coins)
//                 localStorage.setItem("ETH_Coins",res.data.ETH_Coins)
//                 localStorage.setItem("BNB_Coins",res.data.BNB_Coins)
//                 localStorage.setItem("ANTEAG_Coins",res.data.ANT_Coins)
//                 localStorage.setItem("USDT_Coins",res.data.USDT_Coins)
//                 localStorage.setItem("INRD_Coins",res.data.INRD_Coins)
//                 localStorage.setItem("userid",res.data.userid)
//                 this.props.props.history.push('/admin/dashboard')
//               }
//               else{
//                 swal("Error","Invalid username or Password please try agin","error")
//               }
//             })
//           }}>
//             Login
//           </Button>
//         </div>
//       </div>
//     );
//   }
// }




import React from 'react';
import './login.scss';
import logo from '../../../assets/FInalCryptologo.png';
import swal from 'sweetalert'
import axios from 'axios';
import {Btc} from 'react-cryptocoins'
export class Login extends React.Component{
    state = {
        login: true,
        signUpForm: {
            name: "",
            email: "",
            password: ""
        },
        signInForm: {
            email: "",
            password: ""
        }
    };

    render() {
        return (
            <div className="login">
                <div className={`login__colored-container ${this.state.login ? 'login__colored-container--left' : 'login__colored-container--right'}`}></div>
                <div className={`login__welcome-back ${this.state.login ? 'login__welcome-back--active' : 'login__welcome-back--inactive'}`}>
                    <div className="login__welcome-back__logo-container">
                        <img className="login__welcome-back__logo-container--image" style={{background:"white",borderRadius:"100px"}} src={logo} alt="ANTEAGLE" />
                        ANTEAGLE    
                    </div>
                    <div className="login__welcome-back__main-container">
                        <div className="login__welcome-back__main-container__text-container">
                            <span className="login__welcome-back__main-container__text-container--title">
                                Welcome Back!
                            </span>
                            <span className="login__welcome-back__main-container__text-container--secondary">
                                Earning must go on, please log in.
                            </span>
                        </div>
                        <div onClick={() => {
                            this.setState({
                                login: !this.state.login
                            });
                        }} className="login__welcome-back__main-container__button-container">
                            Sign In
                        </div>
                    </div>
                </div>
                <div className={`login__create-container ${this.state.login ? 'login__create-container--active' : 'login__create-container--inactive'}`}>
                    Create Account
                    <div className="login__create-container__social-container">
                        {/* <img className="login__create-container__social-container--facebook-icon" src={facebook} alt="" /> */}
                        {/* <img className="login__create-container__social-container--google-icon" src={google} alt="" /> */}
                        {/* <img className="login__create-container__social-container--linkedin-icon" src={linkedin} alt="" /> */}
                    </div>
                    <span className="login__create-container--info-text">Use email for your registration</span>
                    <div className="login__create-container__form-container">
                        <form className="login__create-container__form-container__form" onSubmit={(e) => {
                            e.preventDefault();
                            this.signUp();
                        }}>
                            <input
                                className="login__create-container__form-container__form--name"
                                type="text"
                                placeholder="username"
                                value={this.state.signUpForm.name}
                                onChange={(value) => this.setState({
                                    signUpForm: {
                                        name: value.target.value,
                                        email: this.state.signUpForm.email,
                                        password: this.state.signUpForm.password
                                    }
                                })}
                                required />
                            <input
                                className="login__create-container__form-container__form--email"
                                type="email"
                                placeholder="Email"
                                value={this.state.signUpForm.email}
                                onChange={(value) => this.setState({
                                    signUpForm: {
                                        email: value.target.value,
                                        name: this.state.signUpForm.name,
                                        password: this.state.signUpForm.password
                                    }
                                })}
                                required />
                            <input
                                className="login__create-container__form-container__form--password"
                                type="password"
                                placeholder="Password"
                                value={this.state.signUpForm.password}
                                onChange={(value) => this.setState({
                                    signUpForm: {
                                        password: value.target.value,
                                        name: this.state.signUpForm.name,
                                        email: this.state.signUpForm.email
                                    }
                                })}
                                required />
                            <button
                                className="login__create-container__form-container__form--submit">
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
                <div className={`login__login-container ${!this.state.login ? 'login__login-container--active' : 'login__login-container--inactive'}`}>
                    <div className="login__login-container__logo-container">
                        <img className="login__login-container__logo-container--image" src={logo} alt="ANTEAGLE" />
                        ANTEAGLE
                    </div>
                    <div className="login__login-container__main-container">
                        <div className="login__login-container__main-container__social-container">
                            {/* <img className="login__login-container__main-container__social-container--facebook-icon" src={facebook} alt="" />
                            <img className="login__login-container__main-container__social-container--google-icon" src={google} alt="" />
                            <img className="login__login-container__main-container__social-container--linkedin-icon" src={linkedin} alt="" /> */}
                        </div>
                        <span className="login__login-container__main-container--info-text">Use email for your login</span>
                        <div className="login__login-container__main-container__form-container">
                            <form className="login__login-container__main-container__form-container__form" onSubmit={(e) => {
                                e.preventDefault();
                                this.signIn();
                            }}>
                                <input
                                    className="login__login-container__main-container__form-container__form--email"
                                    type="email"
                                    placeholder="Email"
                                    value={this.state.signInForm.email}
                                    onChange={(value) => this.setState({
                                        signInForm: {
                                            email: value.target.value,
                                            password: this.state.signInForm.password
                                        }
                                    })}
                                    required />
                                <input
                                    className="login__login-container__main-container__form-container__form--password"
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.signInForm.password}
                                    onChange={(value) => this.setState({
                                        signInForm: {
                                            password: value.target.value,
                                            email: this.state.signInForm.email
                                        }
                                    })}
                                    required />
                                <button
                                    className="login__login-container__main-container__form-container__form--submit">
                                    Sign In
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={`login__hello-container ${!this.state.login ? 'login__hello-container--active' : 'login__hello-container--inactive'}`}>
                    <div className="login__welcome-back__main-container__text-container">
                        <span className="login__welcome-back__main-container__text-container--title">
                            Hello, stranger!
                            </span>
                        <span className="login__welcome-back__main-container__text-container--secondary">
                            Enter your personal details and start your own portfolio!
                        </span>
                    </div>
                    <div onClick={() => {
                        this.setState({
                            login: !this.state.login
                        });
                    }} className="login__welcome-back__main-container__button-container">
                        Sign Up
                    </div>
                </div>
            </div>
        );
    }

    signUp() {
        this.setState({
            signUpForm: {
                name: "",
                password: "",
                email: ""
            }
        });
        
    }

    signIn() {
        this.props.history.push("/dashboard");
        this.props.setUserType(this.state.signInForm.email);
       

        axios({
          url : `https://api.anteagle.tech/login?username=${this.state.signInForm.email}&password=${this.state.signInForm.password}`,
          headers:{
            'Accept' : "aaplication/json"
          },
          method : "post"
        }).then(res=>{
          if(res.data.success){
            swal("Login Successfull","Proceeding to Home Page","success")
            localStorage.setItem("jwt","test")
            localStorage.setItem("BTC_Coins",res.data.BTC_Coins)
            localStorage.setItem("ETH_Coins",res.data.ETH_Coins)
            localStorage.setItem("BNB_Coins",res.data.BNB_Coins)
            localStorage.setItem("ANTEAG_Coins",res.data.ANT_Coins)
            localStorage.setItem("USDT_Coins",res.data.USDT_Coins)
            localStorage.setItem("INRD_Coins",res.data.INRD_Coins)
            localStorage.setItem("userid",res.data.userid)
            this.props.props.history.push('/admin/dashboard')
          }
          else{
            swal("Error","Invalid username or Password please try agin","error")
          }
        })
        this.setState({
          signInForm: {
              password: "",
              email: ""
          }
      });
    }
}



