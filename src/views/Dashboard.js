
import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import ChartView from './ChartView';
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  FormGroup,
  Label,
  Input,
  Form,
  Table,
  Row,
  Col,
  CardText,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import ChartViewer from './ChartViewer';
// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import { Modal } from "react-bootstrap";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { FormControl,InputLabel,FormHelperText,Select } from '@material-ui/core';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { set, useForm } from "react-cool-form";  
import axios from "axios";
import './DashBoard.css';
import 'react-tabs/style/react-tabs.css';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import NativeSelect from '@material-ui/core/NativeSelect';
import Tooltip from "@material-ui/core/Tooltip";
import swal from "sweetalert";
import LoadDash from "./load_dash";
import LoadDashMobile from "./loadDash_mobile";

const Field = ({ label, id, error, ...rest }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} {...rest} />
    {error && <p>{error}</p>}
  </div>
);
const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
  fab1: {
    margin: 0,
    top: 'auto',
    borderRadius:5,
    background:"green",
    color:"white",
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    height:'50px',
    width:'8.5rem'
  },
  fab2: {
    margin: 0,
    top: 'auto',
    borderRadius:5,
    right: 'auto',
    background:"red",
    color:"white",
    bottom: 20,
    left: 20,
    position: 'fixed',
    height:'50px',
    width:'8.5rem'
  },
}));
const PrettoSlider = withStyles({
  root: {
    color: '#d4a537',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);



const initialPositionValue = "fixed";

function Dashboard(props) {
  
  const [showModal, setShow] = React.useState(false);
  const [showModal2, setShow2] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
    
  });
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  const [quant,setQuant]=React.useState([]);
  const [pricee,setPrice]=React.useState([]);
  const [trade_quantity,settrade_quantity]=React.useState(0);
  const [trade_price,settrade_price]=React.useState(0);
  const [trade_symbol,settrade_symbol]=React.useState(0);
  const [trade_type,settrade_type]=React.useState(0);
  const [sell_quantity,setsell_quantity]=React.useState(0);
  const [sell_price,setsell_price]=React.useState(0);
  const [width,setwidth] = React.useState(window.innerWidth)
  const [isOpen, setIsOpen] = React.useState(false);
  const [pair,setpair] = React.useState('BTC/INRD')
  const [tradingvalue,settradingvalue] = React.useState('BTCINR');
  const [buy_limit_amount,setbuy_limit_amount] = React.useState(0);
  const [coin_limit_amount,setcoin_limit_amount]=React.useState(0);
  const [buy_limit_price,setbuy_limit_price] = React.useState(0);
  const [buy_market_amount,setbuy_market_amount] = React.useState(0);
  const [buy_market_price,setbuy_market_price] = React.useState(0);
  const [sell_limit_price,setsell_limit_price] = React.useState(0);
  const [sell_limit_amount,setsell_limit_amount] = React.useState(0);
  const [sell_market_price,setsell_market_price] = React.useState(0);
  const [sell_market_amount,setsell_market_amount] = React.useState(0);
  const [valid,setvalid] = React.useState(true)
  const [valid_s,setvalid_s] = React.useState(true)
  const [btc_u_vol,setbtc_u_vol] = React.useState(0)
  const [btc_vol,setbtc_vol] = React.useState(0)
  const [eth_u_vol,seteth_u_vol] = React.useState(0)
  const [eth_vol,set_eth_vol] = React.useState(0)
  const [bnb_u_vol,setbnb_u_vol] = React.useState(0)
  const [bnb_vol,setbnb_vol] = React.useState(0)
  const [ant_u_vol,setant_u_vol] = React.useState(0)
  const [loadin_cont,setloadin_cont] = React.useState(false)
  const [ant_vol,setant_vol] = React.useState(0)
  const [live_vol,setlivevol] = React.useState(0)
  const [liveprice_BTC,setlive_BTC] = React.useState(0)
  const [liveprice_BTC_u,setlive_BTC_u] = React.useState(0)
  const [liveprice_BNB_u,setlive_BNB_u] = React.useState(0)
  const [liveprice_BNB,setlive_BNB] = React.useState(0)
  const [liveprice_ETH,setlive_ETH] = React.useState(0)
  const [liveprice_ETH_u,setlive_ETH_u] = React.useState(0)
  const [liveprice_ANTEAG,setlive_ANTEAG] = React.useState(0)
  const [liveprice_ANTEAG_u,setlive_ANTEAG_u] = React.useState(0)
  const [liveprice,setlive] = React.useState(0)
  const [conversion,setconversion] = React.useState(0);
  const [myorders,setmyorder] = React.useState([]);
  const [book,setbook] = React.useState([]);
  const [book_s,setbook_s] = React.useState([]);
  const [c_order,setc_order] = React.useState([]);
  const toggle = () => setIsOpen(!isOpen);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const toggle1 = () => setDropdownOpen(prevState => !prevState);
  const { form, use } = useForm({
    // (Strongly advise) Provide the default values just like we use React state
    defaultValues: { username: "", email: "", password: "" },
    // The event only triggered when the form is valid
    onSubmit: (values) => alert(JSON.stringify(values, undefined, 2))
  });
  // We can enable the "errorWithTouched" option to filter the error of an un-blurred field
  // Which helps the user focus on typing without being annoyed by the error message
  const errors = use("errors", { errorWithTouched: true });
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  const handleWindowSizeChange = () => {
    setwidth(window.innerWidth)
  };
  useEffect(()=>{
    
    window.addEventListener('resize', handleWindowSizeChange());
    setloadin_cont(true)
    setInterval(()=>{
      
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=BTC/INRD`
      }).then(res=>{
        if(res.data[0]){
          setlive_BTC(res.data[0].price)
        }
        
      })
      axios({
        method:"get",
        url: "https://api.exchangerate.host/convert?from=USD&to=INR"
      }).then(res=>{
        console.log(res.data.info.rate)
        setconversion(res.data.info.rate)
      })
      axios({
        method : 'get',
        url :`https://api.anteagle.tech/volume?pair=BTC/USDT`
      }).then(res=>{
        if(res.data.volume){
          setbtc_u_vol(res.data.volume)
        }
      })
      axios({
        method : 'get',
        url :`https://api.anteagle.tech/volume?pair=BTC/INRD`
      }).then(res=>{
        if(res.data.volume){
          setbtc_vol(res.data.volume)
        }
      })
      axios({
        method : 'get',
        url :`https://api.anteagle.tech/volume?pair=BNB/USDT`
      }).then(res=>{
        if(res.data.volume){
          setbnb_u_vol(res.data.volume)
        }
      })
      axios({
        method : 'get',
        url :`https://api.anteagle.tech/volume?pair=BNB/INRD`
      }).then(res=>{
        if(res.data.volume){
          setbnb_vol(res.data.volume)
        }
      })
      axios({
        method : 'get',
        url :`https://api.anteagle.tech/volume?pair=ANTEAG/USDT`
      }).then(res=>{
        if(res.data.volume){
          setant_u_vol(res.data.volume)
        }
      })
      axios({
        method : 'get',
        url :`https://api.anteagle.tech/volume?pair=ANTEAG/INRD`
      }).then(res=>{
        if(res.data.volume){
          setant_vol(res.data.volume)
        }
      })
      axios({
        method:'get',
        url :  `https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT` //`https://api.anteagle.tech/liveprice?pair=BTC/USDT`
      }).then(res=>{
        if(res.data){
          
          setlive_BTC_u(parseFloat(res.data.price).toFixed(3))
        }
        
      })
      axios({
        method:'get',
        url : `https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT`//`https://api.anteagle.tech/liveprice?pair=ETH/USDT`
      }).then(res=>{
        if(res.data){
          setlive_ETH_u(parseFloat(res.data.price).toFixed(3))
        }
        
      })
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=ETH/INRD`
      }).then(res=>{
        if(res.data[0]){
          setlive_ETH(res.data[0].price)
        }
        
      })
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=BNB/INRD`
      }).then(res=>{
        if(res.data[0]){
          setlive_BNB(res.data[0].price)
        }
        
      })
      axios({
        method:'get',
        url : `https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT`    //`https://api.anteagle.tech/liveprice?pair=BNB/USDT`
      }).then(res=>{
        if(res.data){
          setlive_BNB_u(parseFloat(res.data.price).toFixed(3))
        }
        
      })
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=ANTEAG/INRD`
      }).then(res=>{
        if(res.data[0]){
          setlive_ANTEAG(res.data[0].price)
        }
      })
      axios({
        method:'get',
        url : `https://api.anteagle.tech/liveprice?pair=ANTEAG/USDT`
      }).then(res=>{
        if(res.data[0]){
          setlive_ANTEAG_u(res.data[0].price)
        }
        
      })

      axios({
        method : 'get',
        url : `https://api.anteagle.tech/orderbook?pair=${localStorage.getItem("pair")}`
      }).then(res2=>{
        var ans2 = []
        var ans3 = []
        for(let i =0;i<res2.data.length;i++){
          var temp = []
          var temp2 = []
          if(res2.data[i].side == 'BUY'){
            temp.push(res2.data[i].price)
            temp.push(res2.data[i].Amount)
            temp.push(res2.data[i].price*res2.data[i].Amount)
            temp.push(res2.data[i].pair)
            ans2.push(temp)
          }
          else{
            temp2.push(res2.data[i].price)
            temp2.push(res2.data[i].Amount)
            temp2.push(res2.data[i].price*res2.data[i].Amount)
            temp2.push(res2.data[i].pair)
            ans3.push(temp2)
          }
          
        }
        setbook(ans2)
        setbook_s(ans3)
      })
    axios({
        method:"post",
        url : `https://api.anteagle.tech/getorder?userid=${localStorage.getItem("userid")}&pair=${localStorage.getItem("pair")}`,
        headers:{
          'Accept' : 'application/json',
          Authtoken : "jkdhfjkdf"
        }
      }).then(({data})=>{
        console.log(data)
        var ans = []
        for(let i=0;i<data.data.length;i++){
          var temp = []
          temp.push(data.data[i].date)
          temp.push(data.data[i].pair)
          temp.push(data.data[i].type)
          temp.push(data.data[i].side)
          temp.push(data.data[i].price)
          temp.push(data.data[i].Amount)
          temp.push(data.data[i].filled)
          temp.push(data.data[i].total)
          temp.push(data.data[i].status)
          ans.push(temp)
        } 
        setmyorder(ans)
      })
      // setc_order(data.data)
     
      axios({
        method : "get",
        url : `https://api.anteagle.tech/allwallet?userid=${localStorage.getItem("userid")}`,
        headers : {
          'Accept' : "application/json"
        }
      }).then(res1=>{
        localStorage.setItem("BTC_Coins",res1.data.data.BTC_Coins)
      localStorage.setItem("BNB_Coins",res1.data.data.BNB_Coins)
      localStorage.setItem("ETH_Coins",res1.data.data.ETH_Coins)
      localStorage.setItem("ANTEAG_Coins",res1.data.data.ANT_Coins)
      localStorage.setItem("USDT_Coins",res1.data.data.USDT_Coins)
      localStorage.setItem("INRD_Coins",res1.data.data.INRD_Coins)
      })
      setloadin_cont(false)
       
    },1000)
    
   
  
  },[])
  
  const isMobile = width <= 900;
  if (isMobile) {
    return ( 
      

      <div className="content" style={{marginLeft:"0.8rem"}}>
        {loadin_cont ? <LoadDashMobile /> : <>
        <Row style={{marginBottom:"0.6rem",height:"7rem"}}>
        <div>
      <Navbar color="dark" light expand="md" style={{width:"100%"}}>
       
        <NavbarToggler style={{margin:"auto"}} onClick={toggle}>
        <span style={{fontSize:"2rem",color:"white",borderColor:"white"}}> {pair.substr(0,pair.indexOf("/"))} : {localStorage.getItem(`${pair.substr(0,pair.indexOf("/"))}_Coins`)} </span>
        <span style={{fontSize:"2rem",color:"white",borderColor:"white"}}> {pair.substr(pair.indexOf("/")+1,pair.length)} : {localStorage.getItem(`${pair.substr(pair.indexOf("/")+1,pair.length)}_Coins`)}  </span>

        
          
        </NavbarToggler>

       

          <Nav className="mr-auto" navbar>
            <NavItem style={{marginLeft:"1rem"}}> 
            
            <UncontrolledDropdown setActiveFromChild>
            
          <DropdownToggle tag="a" style={{fontSize:"1rem",borderRadius:"10px",borderWidth:'1px',borderColor:"white"}}  caret>
            {pair}   
          </DropdownToggle>
         
          <DropdownMenu>
            <DropdownItem style={{color:"red"}}  onClick={()=>{setpair('BTC/USDT');localStorage.setItem("pair",'BTC/USDT');settradingvalue('BTCUSDT');setlive(liveprice_BTC_u);setlivevol(btc_u_vol)}}>BTC/USDT</DropdownItem>
            <DropdownItem style={{color:"red"}} onClick={()=>{setpair('BTC/INRD');localStorage.setItem("pair",'BTC/INRD');settradingvalue('BTCINR');setlive(liveprice_BTC);setlivevol(btc_vol)}}>BTC/INRD</DropdownItem>
            <DropdownItem style={{color:"red"}} onClick={()=>{setpair('ETH/USDT');localStorage.setItem("pair",'ETH/USDT');settradingvalue('ETHUSDT');setlive(liveprice_ETH_u);setlivevol(eth_u_vol)}}>ETH/USDT</DropdownItem>
            <DropdownItem style={{color:"red"}} onClick={()=>{setpair('ETH/INRD');localStorage.setItem("pair",'ETH/INRD');settradingvalue('ETHINR');setlive(liveprice_ETH);setlivevol(eth_vol)}}>ETH/INRD</DropdownItem>
            <DropdownItem style={{color:"red"}} onClick={()=>{setpair('BNB/USDT');localStorage.setItem("pair",'BNB/USDT');settradingvalue('BNBUSDT');setlive(liveprice_BNB_u);setlivevol(bnb_u_vol)}}>BNB/USDT</DropdownItem>
            <DropdownItem style={{color:"red"}} onClick={()=>{setpair('BNB/INRD');localStorage.setItem("pair",'BNB/INRD');settradingvalue('BNBINR');setlive(liveprice_BNB);setlivevol(bnb_vol)}}>BNB/INR</DropdownItem>
            <DropdownItem style={{color:"red"}} onClick={()=>{setpair('ANTEAG/USDT');localStorage.setItem("pair",'ANTEAG/USDT');settradingvalue('ANTEAGUSDT');setlive(liveprice_ANTEAG_u);setlivevol(ant_u_vol)}}>ANTEAG/USDT</DropdownItem>
            <DropdownItem style={{color:"red"}}  onClick={()=>{setpair('ANTEAG/INRD');localStorage.setItem("pair",'ANTEAG/INRD');settradingvalue('ANTEAGINR');setlive(liveprice_ANTEAG);setlivevol(ant_vol)}}>ANTEAG/INRD</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
            </NavItem>
            <Collapse isOpen={isOpen} navbar>      
            <NavItem style={{marginLeft:"1rem"}}>
              <CardText>Current {pair.substr(0,pair.indexOf('/'))} Price</CardText><CardText style={{color:"green",fontWeight:"bold"}}>{liveprice} {pair.substr(pair.indexOf('/')+1,pair.length)}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
              <CardText>24 hour {pair.substr(0,pair.indexOf('/'))} Volume</CardText><CardText style={{color:"green",fontWeight:"bold"}}>{live_vol} {pair.substr(pair.indexOf('/')+1,pair.length)}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>BTC Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("BTC_Coins")}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>BNB Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("BNB_Coins")}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>ETH Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("ETH_Coins")}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>USDT Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("USDT_Coins")}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>ANTEAG Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("ANTEAG_Coins")}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>INRD Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("INRD_Coins")}</CardText>
            </NavItem>


</Collapse>          
       
</Nav>
         
        
      </Navbar>
    </div>
        </Row>
       
{pair == 'ANTEAG/USDT' || pair == 'ANTEAG/INRD' ? <ChartViewer  className="apexcharts-tooltip"/>: 
<TradingViewWidget
    symbol={tradingvalue}
    theme={Themes.DARK}
    locale="en"
    width="100%"
    height="800vh"
  />}


      
        <Row>
         
          <Col className="mr-auto ml-auto" lg="6">

          </Col>
          <Col lg="6">
           
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
             <h3> Order Book (BUY)</h3>
              </CardHeader>
              <CardBody>
   
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>Total</th>
                      <th>pair</th>
                    </tr>
                  </thead>
                  <tbody>
                    {book.map((ans1,i)=>{
                      return(
                        <tr>
                          {ans1.map((res1,i)=>{
                            return(
                              <td>{res1}</td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
               
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
             <h3> Order Book (SELL)</h3>
              </CardHeader>
              <CardBody>
   
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                  {book_s.map((ans1,i)=>{
                      return(
                        <tr>
                          {ans1.map((res1,i)=>{
                            return(
                              <td>{res1}</td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
               
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Col xs="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
               <Tabs>
                <TabList>
                  <Tab>Open Orders({myorders.length})</Tab>
                  <Tab>Order History</Tab>
                  <Tab>Trade History</Tab>
                </TabList>
                <TabPanel>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Date</th>
                      <th>Pair</th>
                      <th>type</th>
                      <th>Side</th>
                      <th>Price</th>
                      <th> Amount</th>
                      <th>Filled</th>
                      <th>Total</th>
                      <th>status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                
                 {myorders.map((ans,i)=>{
                   return(
                    <tr>
                      {  ans.map((res,i)=>{
                    return(
                      <td>{res}</td>
                    )
                   })}
                  <td><Button title="Cancel" onClick={()=>{
                    axios({
                      method:'post',
                      url : `https://api.anteagle.tech/cancel?userid=${localStorage.getItem("userid")}`,
                      headers:{
                        "Accept": "application/json, text/plain, */*",
                        'Content-type' : "application/json"
                      },
                      data : JSON.stringify({
                        date : ans[0],
                        pair : ans[1],
                        type : ans[2],
                        side : ans[3],
                        price : ans[4],
                        Amount : ans[5],
                        filled : ans[6],
                        total : ans[7],
                        status : ans[8],
                        
                      })
                    }).then(res=>{
                      console.log(res.data)
                      swal("Canceled","Your order Canceled Successfully","success")
                    })
                  }}>Cancel</Button></td>
                       </tr>
                   )
                 
                      
                 })}
               
                    
                  </tbody>
                </Table>
                </TabPanel>
               </Tabs>
              </CardBody>
            </Card>
          </Col>
          <Modal show={showModal} onHide={handleClose}>
        
        
        <Card className="card-chart">
              <CardHeader>
                
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  BUY
                </CardTitle>
              </CardHeader>
              <CardBody>
              <Tabs>
    <TabList>
      <Tab>Limit</Tab>
      <Tab>Market</Tab>
    </TabList>

    <TabPanel>
    <Form >
    <Label>Price</Label>
    <Input  onChange={(event)=>{
      setbuy_limit_price(parseFloat(event.target.value) )

    }} placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`}></Input>
    <Label>Amount</Label>
   
    
    <Input invalid={!valid} placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={buy_limit_amount} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
     if(parseFloat(event.target.value*buy_limit_price)>parseFloat(localStorage.getItem(curr))){
      setvalid(false)
     }
     else{
      setvalid(true)
      setbuy_limit_amount(parseFloat(event.target.value))
     }
      
    }}></Input>

      <Label>Total</Label>
   <Input invalid={!valid} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
      console.log()
     if(parseFloat(event.target.value)>parseFloat(localStorage.getItem(curr))){
      setvalid(false)
     }
     else{
      setvalid(true)
      console.log()
      setbuy_limit_amount(parseFloat(parseFloat(event.target.value) /parseFloat(buy_limit_price)) )
     }
      
    }}></Input>

    <Button disabled={!valid} onClick={()=>{
      axios({
        method:"POST",
        url:"https://api.anteagle.tech/neworder",
        headers:{
          "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
          "Content-Type": "application/json",
          Authtoken:"sfsfsff"
        },
        data: JSON.stringify({
          userid : localStorage.getItem("userid"),
          date: "2021-06-21",
          pair: pair,
          type : "Market",
          side : "BUY",
          price : buy_limit_price,
          Amount : buy_limit_amount,
          filled : "0.0",
          total : buy_limit_price * buy_limit_amount
        }),
      }).then(res=>{console.log(res.data)})
    
      if(pair[pair.length-1] == 'T'){
        axios({
          method:"POST",
          url:"https://api.anteagle.tech/neworder",
          headers:{
            "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
            "Content-Type": "application/json",
            Authtoken:"sfsfsff"
          },
          data: JSON.stringify({
            userid : localStorage.getItem("userid"),
            date: "2021-06-21",
            pair: pair.replace("USDT","INRD"),
            type : "Market",
            side : "BUY",
            price : buy_limit_price*conversion,
            Amount : buy_limit_amount,
            filled : "0.0",
            total : buy_limit_price*conversion*buy_limit_amount
          }),
        }).then(res=>{console.log(res.data)})
      }
      else{
        axios({
          method:"POST",
          url:"https://api.anteagle.tech/neworder",
          headers:{
            "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
            "Content-Type": "application/json",
            Authtoken:"sfsfsff"
          },
          data: JSON.stringify({
            userid : localStorage.getItem("userid"),
            date: "2021-06-21",
            pair: pair.replace("INRD","USDT"),
            type : "Market",
            side : "BUY",
            price : buy_limit_price/conversion,
            Amount : buy_limit_amount,
            filled : "0.0",
            total : (buy_limit_price/conversion)*buy_limit_amount
          }),
        }).then(res=>{console.log(res.data)})
      }

      
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}`
      console.log(localStorage.getItem(`${curr}_Coins`) - buy_limit_price*buy_limit_amount)
      const end = parseFloat(localStorage.getItem(`${curr}_Coins`)) - buy_limit_price*buy_limit_amount;
      const range=-9999;                                     //add range
      if( end < 0 && end > range){
        alert("Are you sure that you want to proceed further?");
        var te = parseFloat(localStorage.getItem(`${curr}_Debt`));
        if(te === null){
          te = 0;
        }

        localStorage.setItem(`${curr}_Debt `,end+te);        //set debt
      }
       
      if(end<range) alert("Cannot go beyond this range"); 
      localStorage.setItem(`${curr}_Coins`,end)
      axios({
        method:"post",
        url : `https://api.anteagle.tech/get${curr.toLowerCase()}?coins=${end}&userid=${localStorage.getItem("userid")}`,
        headers:{
          "Accept": "application/json",
        }
      }).then(res=>{
        console.log(res.data)
      })
    }}>Submit</Button>
    </Form>
    </TabPanel>
    <TabPanel>
    <Form >
    <Label>Price</Label>
    <Input placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      setbuy_market_price(event.target.value)
    }}></Input>
    <Label>Amount</Label>
    <Input placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={buy_market_amount} onChange={(event)=>{
      setbuy_market_amount(event.target.value)
    }}  placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`}></Input>

      <Label>Total</Label>
   <Input invalid={!valid} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
   
     if(parseFloat(event.target.value*buy_limit_price)>localStorage.getItem(curr)){
      
      setvalid(false)
     }
     else{
      setvalid(true)
      setbuy_limit_amount(event.target.value)
     }
      
    }}></Input>
    <Button onClick={()=>{
      axios({
        method:"POST",
        url:"https://api.anteagle.tech/neworder",
        headers:{
          "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
          "Content-Type": "application/json",
          Authtoken:"sfsfsff"
        },
        data: JSON.stringify({
          userid : localStorage.getItem("userid"),
          date: "2021-06-21",
          pair: pair,
          type : "Market",
          side : "BUY",
          price : buy_market_price,
          Amount : buy_market_amount,
          filled : "0.0",
          total : buy_market_price*buy_market_amount
        }),
      }).then(res=>{console.log(res.data)})
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}`
      console.log(localStorage.getItem(`${curr}_Coins`) - buy_limit_price*buy_limit_amount)
      const end = localStorage.getItem(`${curr}_Coins`) - buy_limit_price*buy_limit_amount;
      
      localStorage.setItem(`${curr}_Coins`)
      axios({
        method:"post",
        url : `https://api.anteagle.tech/get${curr.toLowerCase()}?coins=${end}&userid=${localStorage.getItem("userid")}`,
        headers:{
          "Accept": "application/json",
        }
      }).then(res=>{
        console.log(res.data)
      })
    }}>Submit</Button>
    </Form>
    </TabPanel>
  </Tabs>
              </CardBody>
            </Card>
      </Modal>

      <Modal show={showModal2} onHide={handleClose2}>
        <Card className="card-chart">
              <CardHeader>
                
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> SELL
                </CardTitle>
              </CardHeader>
              <CardBody>
              <Tabs>
    <TabList>
      <Tab>Limit</Tab>
      <Tab>Market</Tab>
    </TabList>

    <TabPanel>
    <Form >
    <Label>Price</Label>
    <Input placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      setsell_limit_price(parseFloat(event.target.value))
    }}></Input>
    <Label>Amount</Label>
    <Input invalid={!valid_s} placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={sell_limit_amount} onChange={(event)=>{
      if(parseFloat(event.target.value) > parseFloat(localStorage.getItem("BTC_Coins"))){
        setvalid_s(false)
      }
      else{
        setvalid_s(true)
        setsell_limit_amount(parseFloat(event.target.value))
      }
      
    }} ></Input>

     
      <Label>Total</Label>
   <Input invalid={!valid_s} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(0,pair.indexOf('/'))}_Coins`
     if(parseFloat(event.target.value)/parseFloat(sell_limit_price)>parseFloat(localStorage.getItem(curr))){
      setvalid_s(false)
     }
     else{
      setvalid_s(true)
      setsell_limit_amount(parseFloat(event.target.value)/parseFloat(sell_limit_price))
     }
      
    }}></Input>
    <Button disabled={!valid_s} onClick={()=>{
      axios({
        method:"POST",
        url:"https://api.anteagle.tech/neworder",
        headers:{
          "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
          "Content-Type": "application/json",
          Authtoken:"sfsfsff"
        },
        data: JSON.stringify({
          userid : localStorage.getItem("userid"),
          date: "2021-06-21",
          pair: pair,
          type : "Market",
          side : "SELL",
          price : parseFloat(sell_limit_price),
          Amount : sell_limit_amount,
          filled : "0.0",
          total : sell_limit_price*sell_limit_amount
        }),
      }).then(res=>{console.log(res.data)})
      const curr = `${pair.substr(0,pair.indexOf('/'))}`
      console.log(localStorage.getItem(`${curr}_Coins`) - sell_limit_amount)
      const end = localStorage.getItem(`${curr}_Coins`) - sell_limit_amount;
      localStorage.setItem(`${curr}_Coins`,end)
      axios({
        method:"post",
        url : `https://api.anteagle.tech/get${curr.toLowerCase()}?coins=${end}&userid=${localStorage.getItem("userid")}`,
        headers:{
          "Accept": "application/json",
        }
      }).then(res=>{
        console.log(res.data)
      })
    }}>Submit</Button>
    </Form>
    </TabPanel>
    <TabPanel>
    <Form > 
    <Label>Price</Label>
    <Input placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      setsell_market_amount(parseFloat(event.target.value))
    }} ></Input>
    <Label>Amount</Label>
    <Input placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={sell_market_amount} onChange={(event)=>{
      setsell_market_amount(parseFloat(event.target.value))
    }} ></Input>

     
      <Label>Total</Label>
   <Input invalid={!valid_s} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
     if((parseFloat(event.target.value)/parseFloat(sell_market_price))>localStorage.getItem(curr)){
      setvalid_s(false)
     }
     else{
      setvalid_s(true)
      setsell_market_amount(parseFloat(event.target.value)/parseFloat(sell_market_price))
     }
      
    }}></Input>
    <Button onClick={()=>{
      axios({
        method:"POST",
        url:"https://api.anteagle.tech/neworder",
        headers:{
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authtoken:"sfsfsff"
        },
        data: JSON.stringify({
          userid : localStorage.getItem("userid"),
          date: "2021-06-21",
          pair: pair,
          type : "Market",
          side : "SELL",
          price : parseFloat(sell_market_price),
          Amount : parseFloat(sell_market_amount),
          filled : "0.0",
          total : parseFloat(sell_market_price*sell_market_amount),
        }),
      }).then(res=>{console.log(res.data)})
      axios({
        method:"post",
        url : `http://103.155.73.35/get${pair.substr(0,pair.indexOf('/')).toLowerCase()}?coins=${parseFloat(localStorage.getItem(`${pair.substr(0,pair.indexOf('/'))}_Coins`))-parseFloat(sell_market_amount)}`,
        headers:{
          "Accept": "application/json"
        }
      }).then(res=>{
        console.log(res.data)
      })
    }}>Submit</Button>
    </Form>
    </TabPanel>
  </Tabs>
              </CardBody>
            </Card>
      </Modal>

      <Fab 
variant="extended"
className={classes.fab1}
onClick={handleShow}
>
        Buy
      </Fab>  
      <Fab 
      variant="extended"
         
          className={classes.fab2}
onClick={handleShow2}
      >
        Sell
      </Fab>
       </> 
        }
      </div>
    );
  
  } else {
   
  return (
    
    <>
          
      <div className="content" style={{marginLeft:"0.8rem"}}>
      {loadin_cont ? <LoadDash /> : <>

        <Row style={{marginBottom:"0.6rem",height:"7rem"}}>
        <div>
      <Navbar color="dark" light expand="md" style={{width:"100%",marginLeft:"0.5rem",borderRadius:"10px",paddingLeft:"2rem"}}>
       
        <NavbarToggler style={{margin:"auto"}} onClick={toggle}>
        <span style={{fontSize:"2rem",color:"white",borderColor:"white"}}> {pair.substr(0,pair.indexOf("/"))} : {localStorage.getItem(`${pair.substr(0,pair.indexOf("/"))}_Coins`)} </span>
        <span style={{fontSize:"2rem",color:"white",borderColor:"white"}}> {pair.substr(pair.indexOf("/")+1,pair.length)} : {localStorage.getItem(`${pair.substr(pair.indexOf("/")+1,pair.length)}_Coins`)}  </span>

        
          
        </NavbarToggler>

       

          <Nav className="mr-auto" navbar>
            <NavItem style={{marginLeft:"1rem"}}> 
            
            <UncontrolledDropdown setActiveFromChild>
            
          <DropdownToggle tag="a" style={{fontSize:"1rem",borderRadius:"10px",borderWidth:'1px',borderColor:"white"}}  caret>
            {pair}   
          </DropdownToggle>
         
          <DropdownMenu>
            <DropdownItem style={{color:"red"}}  onClick={()=>{setpair('BTC/USDT');localStorage.setItem("pair",'BTC/USDT');settradingvalue('BTCUSDT');setlive(liveprice_BTC_u);setlivevol(btc_u_vol)}}>BTC/USDT</DropdownItem>
            <DropdownItem style={{color:"red"}} onClick={()=>{setpair('BTC/INRD');localStorage.setItem("pair",'BTC/INRD');settradingvalue('BTCINR');setlive(liveprice_BTC);setlivevol(btc_vol)}}>BTC/INRD</DropdownItem>
            <DropdownItem style={{color:"red"}} onClick={()=>{setpair('ETH/USDT');localStorage.setItem("pair",'ETH/USDT');settradingvalue('ETHUSDT');setlive(liveprice_ETH_u);setlivevol(eth_u_vol)}}>ETH/USDT</DropdownItem>
            <DropdownItem style={{color:"red"}} onClick={()=>{setpair('ETH/INRD');localStorage.setItem("pair",'ETH/INRD');settradingvalue('ETHINR');setlive(liveprice_ETH);setlivevol(eth_vol)}}>ETH/INRD</DropdownItem>
            <DropdownItem style={{color:"red"}} onClick={()=>{setpair('BNB/USDT');localStorage.setItem("pair",'BNB/USDT');settradingvalue('BNBUSDT');setlive(liveprice_BNB_u);setlivevol(bnb_u_vol)}}>BNB/USDT</DropdownItem>
            <DropdownItem style={{color:"red"}} onClick={()=>{setpair('BNB/INRD');localStorage.setItem("pair",'BNB/INRD');settradingvalue('BNBINR');setlive(liveprice_BNB);setlivevol(bnb_vol)}}>BNB/INR</DropdownItem>
            <DropdownItem style={{color:"red"}} onClick={()=>{setpair('ANTEAG/USDT');localStorage.setItem("pair",'ANTEAG/USDT');settradingvalue('ANTEAGUSDT');setlive(liveprice_ANTEAG_u);setlivevol(ant_u_vol)}}>ANTEAG/USDT</DropdownItem>
            <DropdownItem style={{color:"red"}}  onClick={()=>{setpair('ANTEAG/INRD');localStorage.setItem("pair",'ANTEAG/INRD');settradingvalue('ANTEAGINR');setlive(liveprice_ANTEAG);setlivevol(ant_vol)}}>ANTEAG/INRD</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
            </NavItem>
            <Collapse isOpen={isOpen} navbar>      
            <NavItem style={{marginLeft:"1rem"}}>
              <CardText>Current {pair.substr(0,pair.indexOf('/'))} Price</CardText><CardText style={{color:"green",fontWeight:"bold"}}>{liveprice} {pair.substr(pair.indexOf('/')+1,pair.length)}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
              <CardText>24 hour {pair.substr(0,pair.indexOf('/'))} Volume</CardText><CardText style={{color:"green",fontWeight:"bold"}}>{live_vol} {pair.substr(pair.indexOf('/')+1,pair.length)}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>BTC Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("BTC_Coins")}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>BNB Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("BNB_Coins")}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>ETH Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("ETH_Coins")}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>USDT Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("USDT_Coins")}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>ANTEAG Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("ANTEAG_Coins")}</CardText>
            </NavItem>
            <NavItem style={{marginLeft:"1rem"}}>
            <CardText>INRD Wallet</CardText><CardText style={{color:"yellow"}} >{localStorage.getItem("INRD_Coins")}</CardText>
            </NavItem>


</Collapse>          
       
</Nav>
         
        
      </Navbar>
    </div>
        </Row>
       
          
{pair == 'ANTEAG/USDT' || pair == 'ANTEAG/INRD' ? <ChartViewer  className="apexcharts-tooltip"/>: 
<TradingViewWidget
    symbol={tradingvalue}
    theme={Themes.DARK}
    locale="en"
    width="100%"
    height="800vh"
  />}

<Row>
 <Tabs> 
    <TabList>
      <Tab>Single Trade</Tab>
      <Tab>Full Trade</Tab>
    </TabList>
    <TabPanel>
<Row>
         
         <Col className="mr-auto ml-auto" lg="6">
           <Card className="card-chart">
             <CardHeader>
               
               <CardTitle tag="h3">
                 <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                 BUY
               </CardTitle>
             </CardHeader>
             <CardBody>
            
              <Tabs>
    <TabList>
      <Tab>Limit</Tab>
      <Tab>Market</Tab>
    </TabList>

    <TabPanel>
    <Form >
    <Label>Price</Label>
    <Input  onChange={(event)=>{
      setbuy_limit_price(parseFloat(event.target.value) )

    }} placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`}></Input>
    <Label>Amount</Label>
   
    
    <Input invalid={!valid} placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={buy_limit_amount} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
     if(parseFloat(event.target.value*buy_limit_price)>parseFloat(localStorage.getItem(curr))){
      setvalid(false)
     }
     else{
      setvalid(true)
      setbuy_limit_amount(parseFloat(event.target.value))
     }
      
    }}></Input>

      <Label>Total</Label>
   <Input invalid={!valid} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
      console.log()
     if(parseFloat(event.target.value)>parseFloat(localStorage.getItem(curr))){
        setvalid(false)
     }
     else{
      setvalid(true)
      console.log()
      setbuy_limit_amount(parseFloat(parseFloat(event.target.value) /parseFloat(buy_limit_price)) )
     }
      
    }}></Input>

    <Button disabled={!valid} onClick={()=>{
      axios({
        method:"POST",
        url:"https://api.anteagle.tech/neworder",    
        headers:{
          "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
          "Content-Type": "application/json",
          Authtoken:"sfsfsff"
        },
        data: JSON.stringify({
          userid : localStorage.getItem("userid"),
          date: "2021-06-21",
          pair: pair,
          type : "Market",
          side : "BUY",
          price : buy_limit_price,
          Amount : buy_limit_amount,
          filled : "0.0",
          total : buy_limit_price * buy_limit_amount
        }),
      }).then(res=>{console.log(res.data)})
    
      if(pair[pair.length-1] == 'T'){
        axios({
          method:"POST",
          url:"https://api.anteagle.tech/neworder",
          headers:{
            "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
            "Content-Type": "application/json",
            Authtoken:"sfsfsff"
          },
          data: JSON.stringify({
            userid : localStorage.getItem("userid"),
            date: "2021-06-21",
            pair: pair.replace("USDT","INRD"),
            type : "Market",
            side : "BUY",
            price : buy_limit_price*conversion,
            Amount : buy_limit_amount,
            filled : "0.0",
            total : buy_limit_price*conversion*buy_limit_amount
          }),
        }).then(res=>{console.log(res.data)})
      }
      else{
        axios({
          method:"POST",
          url:"https://api.anteagle.tech/neworder",
          headers:{
            "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
            "Content-Type": "application/json",
            Authtoken:"sfsfsff"
          },
          data: JSON.stringify({
            userid : localStorage.getItem("userid"),
            date: "2021-06-21",
            pair: pair.replace("INRD","USDT"),
            type : "Market",
            side : "BUY",
            price : buy_limit_price/conversion,
            Amount : buy_limit_amount,
            filled : "0.0",
            total : (buy_limit_price/conversion)*buy_limit_amount
          }),
        }).then(res=>{console.log(res.data)})
      }

      
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}`
      console.log(parseFloat(localStorage.getItem(`${curr}_Coins`)) - buy_limit_price*buy_limit_amount)
      const end = parseFloat(localStorage.getItem(`${curr}_Coins`)) - buy_limit_price*buy_limit_amount;
      const range=-9999;                                     //add range
      if( end < 0 && end > range){
        alert("Are you sure that you want to proceed further?");
        var te = parseFloat(localStorage.getItem(`${curr}_Debt`));
        if(te === null){
          te = 0;
        }
        localStorage.setItem(`${curr}_Coins`,end);
        localStorage.setItem(`${curr}_Debt `,end+te);        //set debt
        console.log("The debt is "+end+te);
      }
       
      else if(end<range) alert("Cannot go beyond this range"); 
      else{
        localStorage.setItem(`${curr}_Coins`,end)
        
      }

      axios({
        method:"post",
        url : `https://api.anteagle.tech/get${curr.toLowerCase()}?coins=${end}&userid=${localStorage.getItem("userid")}`,
        headers:{
          "Accept": "application/json",
        }
      }).then(res=>{
        console.log(res.data)
      })
    }}>Submit</Button>
    </Form>
    </TabPanel>
    <TabPanel>
    <Form >
    <Label>Price</Label>
    <Input placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      setbuy_market_price(event.target.value)
    }}></Input>
    <Label>Amount</Label>
    <Input placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={buy_market_amount} onChange={(event)=>{
      setbuy_market_amount(event.target.value)
    }} placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`}></Input>

      <Label>Total</Label>
   <Input invalid={!valid} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`

     if(parseFloat(event.target.value*buy_limit_price)>localStorage.getItem(curr)){
      setvalid(false)
     }
     else{
      setvalid(true)
      setbuy_limit_amount(event.target.value)
     }
      
    }}></Input>
    <Button onClick={()=>{
      axios({
        method:"POST",
        url:"https://api.anteagle.tech/neworder",
        headers:{
          "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
          "Content-Type": "application/json",
          Authtoken:"sfsfsff"
        },
        data: JSON.stringify({
          userid : localStorage.getItem("userid"),
          date: "2021-06-21",
          pair: pair,
          type : "Market",
          side : "BUY",
          price : buy_market_price,
          Amount : buy_market_amount,
          filled : "0.0",
          total : buy_market_price*buy_market_amount
        }),
      }).then(res=>{console.log(res.data)})
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}`
      console.log(parseFloat(localStorage.getItem(`${curr}_Coins`)) - buy_limit_price*buy_limit_amount)
      const end = parseFloat(localStorage.getItem(`${curr}_Coins`)) - buy_limit_price*buy_limit_amount;
      const range=-9999;
      if( end < 0 && end > range){
        alert("Are you sure that you want to proceed further?");
        var te = parseFloat(localStorage.getItem(`${curr}_Debt`));
        if(te === null){
          te = 0;
        }

        localStorage.setItem(`${curr}_Debt `,end+te);        //set debt
        console.log( "The debt is "+end+te);
      }
       
      if(end<range) alert("Cannot go beyond this range"); 
      localStorage.setItem(`${curr}_Coins`,end)
      axios({
        method:"post",
        url : `https://api.anteagle.tech/get${curr.toLowerCase()}?coins=${end}&userid=${localStorage.getItem("userid")}`,
        headers:{
          "Accept": "application/json",
        }
      }).then(res=>{
        console.log(res.data)
      })
    }}>Submit</Button>
    </Form>
    </TabPanel>
  </Tabs>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> SELL
                </CardTitle>
              </CardHeader>
              <CardBody>
              <Tabs>
    <TabList>
      <Tab>Limit</Tab>
      <Tab>Market</Tab>
    </TabList>

    <TabPanel>
    <Form >
    <Label>Price</Label>
    <Input placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      setsell_limit_price(parseFloat(event.target.value))
    }}></Input>
    <Label>Amount</Label>
    <Input invalid={!valid_s} placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={sell_limit_amount} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
      if(parseFloat(event.target.value) > parseFloat(localStorage.getItem(curr))){
        setvalid_s(false)
      }
      else{
        setvalid_s(true)
        setsell_limit_amount(parseFloat(event.target.value))
      }
      
    }} ></Input>

     
      <Label>Total</Label>
   <Input invalid={!valid_s} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf("/")+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(0,pair.indexOf('/'))}_Coins`
      const curdebt = `${pair.substr(0,pair.indexOf('/'))}_Debt`
      

     if(parseFloat(parseFloat(event.target.value)/parseFloat(sell_limit_price))>parseFloat(localStorage.getItem(curr))){
        // alert("do you want to transact");
       const debt=parseFloat(localStorage.getItem(curr) )- parseFloat(event.target.value*buy_limit_price);
       if(localStorage.getItem(curdebt) +debt > -9999  )
        localStorage.setItem( curdebt,localStorage.getItem(curdebt) +debt );
        console.log(localStorage.getItem(curdebt) +debt);
        
      // setvalid_s(false)
     }
     else{
      setvalid_s(true)
      setsell_limit_amount(parseFloat(event.target.value)/parseFloat(sell_limit_price))
     }
      
    }}></Input>
    <Button disabled={!valid_s} onClick={()=>{
      axios({
        method:"POST",
        url:"https://api.anteagle.tech/neworder",
        headers:{
          "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
          "Content-Type": "application/json",
          Authtoken:"sfsfsff"
        },
        data: JSON.stringify({
          userid : localStorage.getItem("userid"),
          date: "2021-06-21",
          pair: pair,
          type : "Market",
          side : "SELL",
          price : parseFloat(sell_limit_price),
          Amount : sell_limit_amount,
          filled : "0.0",
          total : sell_limit_price*sell_limit_amount
        }),
      }).then(res=>{console.log(res.data)})
      const curr = `${pair.substr(0,pair.indexOf('/'))}`
      console.log(localStorage.getItem(`${curr}_Coins`) - sell_limit_amount)
      const end = localStorage.getItem(`${curr}_Coins`) - sell_limit_amount;
      localStorage.setItem(`${curr}_Coins`,end)
      axios({
        method:"post",
        url : `https://api.anteagle.tech/get${curr.toLowerCase()}?coins=${end}&userid=${localStorage.getItem("userid")}`,
        headers:{
          "Accept": "application/json",
        }
      }).then(res=>{
        console.log(res.data)
      })
    }}>Submit</Button>
    </Form>
    </TabPanel>
    <TabPanel>
    <Form > 
    <Label>Price</Label>
    <Input placeholder={`ENTER PRICE in ${pair.substr(pair.indexOf('/')+1,pair.length)}`} onChange={(event)=>{
      setsell_market_amount(parseFloat(event.target.value))
    }} ></Input>
    <Label>Amount</Label>
    <Input placeholder={`ENTER AMOUNT in ${pair.substr(0,pair.indexOf('/'))}`} value={sell_market_amount} onChange={(event)=>{
      setsell_market_amount(parseFloat(event.target.value))
    }} ></Input>

     
      <Label>Total</Label>
   <Input invalid={!valid_s} placeholder={`TOTAL AMOUNT in ${pair.substr(pair.indexOf("/")+1,pair.length)}`} onChange={(event)=>{
      const curr = `${pair.substr(pair.indexOf('/')+1,pair.length)}_Coins`
      const curdebt = `${pair.substr(0,pair.indexOf('/'))}_Debt`
     if((parseFloat(event.target.value)/parseFloat(sell_market_price))>localStorage.getItem(curr)){
       const debt=parseFloat(localStorage.getItem(curr) )- parseFloat(event.target.value*buy_limit_price);
       if(localStorage.getItem(curdebt) +debt > -9999  )
        localStorage.setItem( curdebt,localStorage.getItem(curdebt) +debt );
       else
        alert("Transaction out of range");
      setvalid_s(false)
     }
     else{
      setvalid_s(true)
      setsell_market_amount(parseFloat(event.target.value)/parseFloat(sell_market_price))
     }
      
    }}></Input>
    <Button onClick={()=>{
      axios({
        method:"POST",
        url:"https://api.anteagle.tech/neworder",
        headers:{
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authtoken:"sfsfsff"
        },
        data: JSON.stringify({
          userid : localStorage.getItem("userid"),
          date: "2021-06-21",
          pair: pair,
          type : "Market",
          side : "SELL",
          price : parseFloat(sell_market_price),
          Amount : parseFloat(sell_market_amount),
          filled : "0.0",
          total : parseFloat(sell_market_price*sell_market_amount),
        }),
      }).then(res=>{console.log(res.data)})
      axios({
        method:"post",
        url : `http://103.155.73.35/get${pair.substr(0,pair.indexOf('/')).toLowerCase()}?coins=${parseFloat(localStorage.getItem(`${pair.substr(0,pair.indexOf('/'))}_Coins`))-parseFloat(sell_market_amount)}`,
        headers:{
          "Accept": "application/json"
        }
      }).then(res=>{
        console.log(res.data)
      })
    }}>Submit</Button>
    </Form>
    </TabPanel>
    
  </Tabs>
  
              </CardBody>
            </Card>
          </Col>
        </Row>
    </TabPanel>
    <TabPanel>
    <Row > {/* fulltrade */}
    <Col className="mr-auto ml-auto" lg="6">
           <Card className="card-chart">
             <CardHeader>
               
               <CardTitle tag="h3">
                 <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                 BUY
               </CardTitle>
             </CardHeader>
             <CardBody>
            
              <Tabs>
              
              <Form >
   <Label>Quantity</Label>
   <Input  required type="number" step="any" name="quantity"  onChange={(event)=>{
      const tempQuant=quant;
      tempQuant.push(event.target.value);
      setQuant(tempQuant);
      // settrade_quantity(parseFloat(event.target.value) )

    }}> </Input>
   <Label>Price</Label>
   <Input  type="number" step="any" onChange={(event)=>{
      const tempPrice=pricee;
      tempPrice.push(event.target.value);
      setPrice(tempPrice);
      // settrade_price(parseFloat(event.target.value) )

    }} ></Input>
   <Label>Symbol</Label>
   <Input required name="pair" onChange={(event)=>{
      settrade_symbol((event.target.value) )

    }}></Input> 
   
   <Label>Type</Label>
   <Input required name="type" onChange={(event)=>{
      settrade_type((event.target.value) )

    }}></Input>
  
   <Button type="reset" disabled={!valid_s} onClick={()=>{
     axios({
       method:"POST",
       url:"http://localhost:5000/order",
       headers:{
         "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
         "Content-Type": "application/json",
         Authtoken:"sfsfsff"
       },
       data: JSON.stringify({
        
        quantity:quant[quant.length-1],  //trade_quantity,
        price: pricee[pricee.length-1],     //trade_price,
        pair:trade_symbol,
        type:trade_type,
        mode:"buy"

       }),
      
     }).then(res=>{console.log(res.data);
     localStorage.setItem("assigned_no",res.data.assigned_no)
     localStorage.setItem("order_id",res.data.order_id)
     localStorage.setItem("purchased_quantity",res.data.purchased_quantity)
     })
     setQuant([])
     setPrice([])
   }}>Submit</Button>
   </Form>
   

   </Tabs>
              </CardBody>
            </Card>
          </Col>

          <Col className="mr-auto ml-auto" lg="6">
           <Card className="card-chart">
             <CardHeader>
               
               <CardTitle tag="h3">
                 <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                 Sell
               </CardTitle>
             </CardHeader>
             <CardBody>
            
              <Tabs>
              
              <Form >
   <Label>Selling Quantity</Label>
   <Input  required type="number" step="any" name="quantity" onChange={(event)=>{
      if(parseFloat(localStorage.getItem("purchased_quantity"))-event.target.value <0 )
        alert("Cannot sell more than you buy");
      else{
        localStorage.setItem("purchased_quantity",parseFloat(localStorage.getItem("purchased_quantity"))-event.target.value)
        const tempQuant=quant;
        tempQuant.push(event.target.value)
        setQuant(tempQuant)
      }
        // setsell_quantity(parseFloat(event.target.value) )

    }}> </Input>
   <Label>Selling Price</Label>
   <Input  type="number" step="any" name="price" onChange={(event)=>{
      const tempPrice=pricee;
      tempPrice.push(event.target.value)
      setPrice(tempPrice)
      // setsell_price(parseFloat(event.target.value) )

    }}></Input>
  
   
    
     
   <Button type="reset" disabled={!valid_s} onClick={()=>{
     axios({
       method:"POST",
       url:"http://localhost:5000/fulltrade",
       headers:{
         "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
         "Content-Type": "application/json",
         Authtoken:"sfsfsff"
       },
       data: JSON.stringify({
          quantity:quant[quant.length-1], //sell_quantity,
          price: pricee[pricee.length-1],//sell_price,
          pair:trade_symbol,
          type:trade_type,
          mode:"sell",
          assigned_no : localStorage.getItem("assigned_no"),
          order_id:localStorage.getItem("order_id"),
          purchased_quantity:localStorage.getItem("purchased_quantity")

       }),
     }).then(res=>{console.log(res.data)})

    
   }}>Continue Selling</Button>

<Button type="reset" disabled={!valid_s} onClick={()=>{
     axios({
       method:"POST",
       url:"http://localhost:5000/submitorder",
       headers:{
         "Accept": "application/json, text/plain, */*", // It can be used to overcome cors errors
         "Content-Type": "application/json",
         Authtoken:"sfsfsff"
       },
       data: JSON.stringify({
          quantity:quant[quant.length-1], //sell_quantity,
          price: pricee[pricee.length-1],//sell_price,
          pair:trade_symbol,
          type:trade_type,
          mode:"sell",
          assigned_no : localStorage.getItem("assigned_no"),
          purchased_quantity:localStorage.getItem("purchased_quantity")

       }),
     }).then(res=>{console.log(res.data)})
    
    
   }}>Submit</Button>
   </Form>
   

</Tabs>
           </CardBody>
         </Card>
       </Col>
   </Row>  {/*fulltrade */} 
   </TabPanel>
</Tabs>  
</Row>   
        <Row>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
             <h3> Order Book (BUY)</h3>
              </CardHeader>
              <CardBody>
   
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>Total</th>
                      <th>pair</th>
                    </tr>
                  </thead>
                  <tbody>
                    {book.map((ans1,i)=>{
                      return(
                        <tr>
                          {ans1.map((res1,i)=>{
                            return(
                              <td>{res1}</td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
               
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
             <h3> Order Book (SELL)</h3>
              </CardHeader>
              <CardBody>
   
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                  {book_s.map((ans1,i)=>{
                      return(
                        <tr>
                          {ans1.map((res1,i)=>{
                            return(
                              <td>{res1}</td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
               
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Col xs="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
               <Tabs>
                <TabList>
                  <Tab>Open Orders({myorders.length})</Tab>
                  <Tab>Order History</Tab>
                  <Tab>Trade History</Tab>
                </TabList>
                <TabPanel>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Date</th>
                      <th>Pair</th>
                      <th>type</th>
                      <th>Side</th>
                      <th>Price</th>
                      <th> Amount</th>
                      <th>Filled</th>
                      <th>Total</th>
                      <th>status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                
                 {myorders.map((ans,i)=>{
                   return(
                    <tr>
                      {  ans.map((res,i)=>{
                    return(
                      <td>{res}</td>
                    )
                   })}
                  <td><Button title="Cancel" onClick={()=>{
                    axios({
                      method:'post',
                      url : `https://api.anteagle.tech/cancel?userid=${localStorage.getItem("userid")}`,
                      headers:{
                        "Accept": "application/json, text/plain, */*",
                        'Content-type' : "application/json"
                      },
                      data : JSON.stringify({
                        date : ans[0],
                        pair : ans[1],
                        type : ans[2],
                        side : ans[3],
                        price : ans[4],
                        Amount : ans[5],
                        filled : ans[6],
                        total : ans[7],
                        status : ans[8],
                        
                      })
                    }).then(res=>{
                      console.log(res.data)
                      swal("Canceled","Your order Canceled Successfully","success")
                    })
                  }}>Cancel</Button></td>
                       </tr>
                   )
                 
                      
                 })}
               
                    
                  </tbody>
                </Table>
                </TabPanel>
               </Tabs>
              </CardBody>
            </Card>
          </Col>
          </>        
          }
      </div>
          
    </>
  );
}
}
export default Dashboard;
