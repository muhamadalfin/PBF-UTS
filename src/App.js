import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Produk from "./Produk/Produk";
import ListKeranjang from "./Keranjang/Keranjang";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function NestingAuth() {

  
    return(
    
      <Router>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <AuthButton />
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" style={{marginLeft:'70px'}}>
              <a class="nav-link">
                  <Link to="/home">Home</Link>
                  <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item" style={{marginLeft:'10px'}}>
              <a class="nav-link">
                  <Link to="/listProduk">Products</Link>
                  <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item" style={{marginLeft:'10px'}}>
              <a class="nav-link">
                  <Link to="/about">About</Link>
                  <span class="sr-only">(current)</span>
              </a>
            </li>
            <a class="navbar-brand" style={{marginLeft:'300px', fontFamily:'Lucida Handwriting'}}>Ektronikcom</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <li class="nav-item" style={{marginLeft:'350px'}}>
              <a class="nav-link">
                  <Link to="/keranjang">🛒Cart</Link>
                  <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item" style={{marginLeft:'30px'}}>
              <a class="nav-link">
                  <Link to="/private">Login</Link>
                  <span class="sr-only">(current)</span>
              </a>
            </li>
      
          </ul>
        </div>
        </nav>
          <hr/>
          
            <Switch>
              <Route exact path="/home">
                <Home/>
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/listProduk">
                <ListProduk />
              </Route>
              <Route path="/keranjang">
                <Keranjang />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <PrivateRoute path="/private">
                <ProtectedPage />
              </PrivateRoute>
            </Switch>
      </Router>

  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};
const settings = {
  dots: true,
  autoplay: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1
};
const settings1 = {
  dots: true,
  autoplay: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1
};
function AuthButton() {
  let history = useHistory();
  return fakeAuth.isAuthenticated ? (

    <p style={{marginTop:'2000px'}}>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p></p>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function ProtectedPage(){
  return (   
    <div>
      <h3 style={{textAlign:'center',marginTop:'40px'}}>Info Account</h3>
      <div class="card" style={{width: '50rem',marginLeft:'300px',marginTop:'70px' ,border:'0'}}>
        <table class="table">
          <thead>
            <tr>
              <th>Nama :</th>
              <th>Muhamad Alfin</th>
            </tr>
            <tr>
              <th>Tempat/Tgl Lahir :</th>
              <th>Malang</th>
            </tr>
            <tr>
              <th>Metode Pembayaran </th>
              <th>Bank</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
         
      </div>
    </div>

  )
}

function LoginPage(){
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || {from : {pathname: "/"}};
  let login = () =>{
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return(
    <div>
      <h2 style={{textAlign:'center', fontSize:'45px', fontFamily:'Lucida Calligraphy'}}>Sign In</h2>
      <p style={{textAlign:'center'}}>You Must log in to view the page at {from.pathname}</p>
      <div class="card" style={{width: '300px',marginLeft:'450px',marginTop:'70px' ,border:'0'}}>
        <div class="card-box">
          <table class="table">
            <thead>
              <tr>
                <th style={{border:'none'}}>Username :</th>
                <th style={{border:'none'}}><input type="text" style={{border:'none', borderBottom:'1px solid #2979ff',width:'300px'}}/></th>
              </tr>
              <tr>
                <th style={{border:'none'}}>Password :</th>
                <th style={{border:'none'}}><input type="password" style={{border:'none', borderBottom:'1px solid #2979ff',width:'300px'}}/></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
      <button type="button" class="btn btn-info" onClick={login} style={{marginLeft:'600px',width:'200px', marginTop:'40px'}}>Log in</button>
    </div>
  )
}

function Home() {
  const isLoggedIn = fakeAuth.isAuthenticated;
    return(
      <div>
        <h2 style={{textAlign:'center', fontSize:'45px', fontFamily:'Lucida Handwriting'}}>Welcome to Ektronikacom</h2>
        <p style={{textAlign:'center', fontSize:'25px', fontFamily:'Lucida Calligraphy'}}>Cintailah Produk Indonesia</p>
        <div className="container">
          <Slider {...settings}>
            <div><img name="gambar" src={'./img/gambar1.jpg'} /></div>
            <div><img name="gambar" src={'./img/gambar2.jpg'} /></div>
            <div><img name="gambar" src={'./img/gambar3.jpg'} /></div>
            <div><img name="gambar" src={'./img/gambar1.jpg'} /></div>
            <div><img name="gambar" src={'./img/gambar2.jpg'} /></div>
            <div><img name="gambar" src={'./img/gambar3.jpg'} /></div>
          </Slider>
        </div>
        
        <div className="container" style={{marginTop:'100px'}}>
        <p style={{textAlign:'center', fontSize:'25px', fontFamily:'fantasy'}}>Rice Cooker Philips </p>
          <Slider {...settings1}>
            <div>
              <img name="gambar" src={'./img/gambar1.jpg'} style={{height: '300px',width: '300px'}}/>
              <p style={{textAlign:'left'}}>Philips Rice Cooker Hd-3132 Merah</p>
            </div>
            <div>
              <img name="gambar" src={'./img/gambar2.jpg'} style={{height: '300px',width: '300px'}}/>
              <p style={{textAlign:'left'}}>Magic Com Rice Cooker Philips Hd-311830 </p>
            </div>
            <div>
              <img name="gambar" src={'./img/gambar3.jpg'} style={{height: '300px',width: '300px'}}/>
              <p style={{textAlign:'left'}}>Rice Cooker Philips Hd3128  </p>
            </div>
            <div>
              <img name="gambar" src={'./img/gambar1.jpg'} style={{height: '300px',width: '300px'}}/>
              <p style={{textAlign:'left'}}>Philips Rice Cooker Hd-3132 Merah</p>
            </div>
            <div>
              <img name="gambar" src={'./img/gambar2.jpg'} style={{height: '300px',width: '300px'}}/>
              <p style={{textAlign:'left'}}>Magic Com Rice Cooker Philips Hd-311830 </p>
            </div>
            <div>
              <img name="gambar" src={'./img/gambar3.jpg'} style={{height: '300px',width: '300px'}}/>
              <p style={{textAlign:'left'}}>Rice Cooker Philips Hd3128  </p>
            </div>
          </Slider>
        </div>
      </div>
      );
  }

function ListProduk() {
  let {path,url} = useRouteMatch();
  const isLoggedIn = fakeAuth.isAuthenticated;

  if (isLoggedIn == true) {
    return(
      <div>
        <center>
        <h2 style={{textAlign:'center', fontSize:'45px', fontFamily:'Lucida Calligraphy'}}>Products</h2>
        <div class="card" style={{width: '50rem',border:'0'}}>
         <Produk />
          </div>
          <Switch>
              <Route exact path="{path}">
                <h3>Please Choose Your Goods!</h3>
              </Route>
  
              <Route path={`${path}/:barangId`}>
                <Barang/>
              </Route>
  
          </Switch>
          <div className="container" style={{marginTop:'100px'}}>
            <p style={{textAlign:'center', fontSize:'25px', fontFamily:'fantasy'}}>Rice Cooker Philips </p>
            <Slider {...settings1}>
                <div>
                  <img name="gambar" src={'./img/gambar1.jpg'} style={{height: '300px',width: '300px'}}/>
                  <p style={{textAlign:'left'}}>Philips Rice Cooker Hd-3132 Merah</p>
                </div>
                <div>
                  <img name="gambar" src={'./img/gambar2.jpg'} style={{height: '300px',width: '300px'}}/>
                  <p style={{textAlign:'left'}}>Magic Com Rice Cooker Philips Hd-311830 </p>
                </div>
                <div>
                  <img name="gambar" src={'./img/gambar3.jpg'} style={{height: '300px',width: '300px'}}/>
                  <p style={{textAlign:'left'}}>Rice Cooker Philips Hd3128  </p>
                </div>
                <div>
                  <img name="gambar" src={'./img/gambar1.jpg'} style={{height: '300px',width: '300px'}}/>
                  <p style={{textAlign:'left'}}>Philips Rice Cooker Hd-3132 Merah</p>
                </div>
                <div>
                  <img name="gambar" src={'./img/gambar2.jpg'} style={{height: '300px',width: '300px'}}/>
                  <p style={{textAlign:'left'}}>Magic Com Rice Cooker Philips Hd-311830 </p>
                </div>
                <div>
                  <img name="gambar" src={'./img/gambar3.jpg'} style={{height: '300px',width: '300px'}}/>
                  <p style={{textAlign:'left'}}>Rice Cooker Philips Hd3128  </p>
                </div>
            </Slider>
            </div>
          </center>
      </div>
    );   
  }
    return(
    <div>
      <center>
      <h2 style={{textAlign:'center', fontSize:'45px', fontFamily:'Lucida Calligraphy'}}>Products</h2>
      <p style={{textAlign:'center', marginTop:'50px'}}>You are not logged in</p>
  
          <Switch>
              <Route exact path="{path}">
                <h3>Please Choose Your Goods!</h3>
              </Route>
  
              <Route path={`${path}/:barangId`}>
                <Barang/>
              </Route>
  
          </Switch>
            <div className="container" style={{marginTop:'100px'}}>
              <p style={{textAlign:'center', fontSize:'25px', fontFamily:'fantasy'}}>Rice Cooker Philips </p>
              <Slider {...settings1}>
                  <div>
                    <img name="gambar" src={'./img/gambar1.jpg'} style={{height: '300px',width: '300px'}}/>
                    <p style={{textAlign:'left'}}>Philips Rice Cooker Hd-3132 Merah</p>
                  </div>
                  <div>
                    <img name="gambar" src={'./img/gambar2.jpg'} style={{height: '300px',width: '300px'}}/>
                    <p style={{textAlign:'left'}}>Magic Com Rice Cooker Philips Hd-311830 </p>
                  </div>
                  <div>
                    <img name="gambar" src={'./img/gambar3.jpg'} style={{height: '300px',width: '300px'}}/>
                    <p style={{textAlign:'left'}}>Rice Cooker Philips Hd3128  </p>
                  </div>
                  <div>
                    <img name="gambar" src={'./img/gambar1.jpg'} style={{height: '300px',width: '300px'}}/>
                    <p style={{textAlign:'left'}}>Philips Rice Cooker Hd-3132 Merah</p>
                  </div>
                  <div>
                    <img name="gambar" src={'./img/gambar2.jpg'} style={{height: '300px',width: '300px'}}/>
                    <p style={{textAlign:'left'}}>Magic Com Rice Cooker Philips Hd-311830 </p>
                  </div>
                  <div>
                    <img name="gambar" src={'./img/gambar3.jpg'} style={{height: '300px',width: '300px'}}/>
                    <p style={{textAlign:'left'}}>Rice Cooker Philips Hd3128  </p>
                  </div>
              </Slider>
            </div>
      </center>
    </div>
    ); 
}

function Keranjang() {
  let {path,url} = useRouteMatch();
  const isLoggedIn = fakeAuth.isAuthenticated;

  if (isLoggedIn == true) {
    return(
      <div>
        <center>
        <h2 style={{textAlign:'center', fontSize:'45px', fontFamily:'Lucida Calligraphy'}}>🛒Cart</h2>
        <p style={{textAlign:'center'}}>Keranjang Belanja</p>
        <div class="card" style={{width: '50rem'}}>
        <table class="table">
         
          <tbody>
            <ListKeranjang />
          </tbody>
        </table>
         
          </div>
  
          <Switch>
              <Route exact path="{path}">
                <h3>Please Choose Your Goods!</h3>
              </Route>
  
              <Route path={`${path}/:barangId`}>
                <Barang/>
              </Route>
  
          </Switch>
          </center>
      </div>
    );   
  }
    return(
    <div>
      <center>
        <h2 style={{textAlign:'center', fontSize:'45px', fontFamily:'Lucida Calligraphy'}}>🛒Cart</h2>
        <p style={{textAlign:'center'}}>Keranjang Belanja</p>

        <p style={{textAlign:'center', marginTop:'100px'}}>You are not logged in</p>
  
          <Switch>
              <Route exact path="{path}">
                <h3>Please Choose Your Goods!</h3>
              </Route>
  
              <Route path={`${path}/:barangId`}>
                <Barang/>
              </Route>
  
          </Switch>
      </center>
    </div>
    ); 
  }

  function About() {
    const isLoggedIn = fakeAuth.isAuthenticated;
      return(
        <div>
          <h2 style={{textAlign:'center', fontSize:'45px', fontFamily:'Lucida Calligraphy'}}>About Me</h2>
          <h6 style={{textAlign:'center', fontSize:'20px', fontFamily:'Lucida Calligraphy'}}>Online Shop Rice Cooker</h6>
          <div class="about" style={{width: '700px',marginLeft:'350px',marginTop:'20px' ,border:'1'}}>
            <table class="table">
              <thead>
                <tr>
                  <th style={{border:'1'}}>Nama </th>
                  <th style={{border:'1'}}>Kelas</th>
                  <th style={{border:'1'}}>NIM</th>
                  <th style={{border:'1'}}>Absen</th>
                </tr>
                <tr>
                  <td style={{border:'1'}}>Muhamad Alfin </td>
                  <td style={{border:'1'}}>TI-3F</td>
                  <td style={{border:'1'}}>1841720068</td>
                  <td style={{border:'1'}}>20</td>
                </tr>
                <tr>
                  <td style={{border:'1'}}>UTS </td>
                  <td style={{border:'1'}}>PEMROGRAMAN</td>
                  <td style={{border:'1'}}>BERBASIS</td>
                  <td style={{border:'1'}}>FRAMEWORK</td>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
        );
    }

function Barang() {
  let{barangId} = useParams();

  return(
    <div>
      <h3>{barangId}</h3>
    </div>
  );
}