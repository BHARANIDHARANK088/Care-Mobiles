// 1
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const jsdom = require("jsdom");

// 2
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(express.json());


let mobilearray = [
  {
    id : 1,
    name: "SAMSUNG Galaxy S22 5G",
    src: "images/image9.jfif",
    desc: "(Green, 128 GB) (8 GB RAM) ₹57990.00"
  },
  {
    id : 2,
    name: "Oppo A77s",
    src: "images/image10.jpg",
    desc: "(Orange, 128 GB) (8 GB RAM) ₹17999.00"
  },
  {
    id : 3,
    name: "Apple iPhone 11",
    src: "images/image11.jpg",
    desc: "(64GB ROM, 4GB RAM, MHDA3HN/A, Black) ₹41999.00"
  },
  {
    id : 4,
    name: "Oneplus 9RT",
    src: "images/image12.png",
    desc: "(8+128) Nano Silver - OnePlus ₹42999.00"
  },
  {
    id : 5,
    name: "Y21E 3GB 64GB Diamond Glow - Vivo",
    src: "images/image13.png",
    desc: "₹12000.00"
  },
  {
    id : 6,
    name: "Mi A3 (4+64) More Than White - Xiaomi",
    src: "images/image14.jpg",
    desc: "₹11365.00"
  }
]

let tabletarray = [
  {
     id: 1,
     name: "Realme Pad X ",
     src: "https://rukminim1.flixcart.com/image/416/416/xif0q/tablet/y/a/y/-original-imaggfrhvghucswf.jpeg?q=70",
     desc: "6 GB RAM 128 GB ROM 11 inch with Wi-Fi+5G Tablet (Glacier Blue)",
     price: "₹27,999"
  },
  {
    id: 2,
    name: "MOTOROLA tab g70 ",
    src: "https://rukminim1.flixcart.com/image/416/416/kyag87k0/tablet/4/n/o/g70-lte-moto-original-imagak3huz7jweyz.jpeg?q=70",
    desc: "LTE 6 GB RAM 128 GB ROM 11 inch with Wi-Fi+4G Tablet (Modernist Teal)",
    price: "₹22,999"
  },
  {
    id: 3,
    name: "SAMSUNG Galaxy Tab S7+",
    src: "https://rukminim1.flixcart.com/image/416/416/kdrpksw0/tablet/w/f/6/samsung-sm-t975nzkainu-original-imafuhg9tfydgg78.jpeg?q=70",
    desc: "With Stylus 6 GB RAM 128 GB ROM 12.4 inch with Wi-Fi Only Tablet (Mystic Black)",
    price: "₹49,999"
  },
  {
    id: 4,
    name: "Lenovo Tab M10",
    src: "https://rukminim1.flixcart.com/image/416/416/xif0q/tablet/9/z/i/za6r0019in-lenovo-original-imagkg25fwgveajj.jpeg?q=70",
    desc: "4 GB RAM 128 GB ROM 10.3 inch with Wi-Fi+4G Tablet (Platinum Grey)",
    price: "₹15,999"
  },
]

let pendrivearray = [
  {
    id: 1,
    name: "SanDisk Ultra Type C 256 GB Pen Drive  (Black)",
    src: "https://rukminim1.flixcart.com/image/416/416/kdrpksw0/tablet/w/f/6/samsung-sm-t975nzkainu-original-imafuhg9tfydgg78.jpeg?q=70",
    desc: "₹1,939",
  },
  {
    id: 2,
    name: "Sandisk Cruzer Blade 16 GB Utility Pendrive  (Red, Black)",
    src: "https://rukminim1.flixcart.com/image/416/416/jwfa5jk0/pendrive/pendrive/z/f/p/sandisk-sdcz50-128g-i35-original-imafh3xkevktvq4w.jpeg?q=70",
    desc: "₹259",
  },
  {
    id: 3,
    name: "SanDisk Ultra Dual SDDD3-128G-G46/SDDD3-128G-i35 128 GB OTG Drive  (Black, Type A to Micro USB)",
    src: "https://rukminim1.flixcart.com/image/416/416/kikluvk0-0/pendrive/type-a-to-micro-usb/p/r/6/ultra-dual-sddd3-128g-g46-sddd3-128g-i35-sandisk-original-imafyc4wsycxswzf.jpeg?q=70",
    desc: "₹939",
  },
  {
    id: 4,
    name: "SanDisk SDDDC3-064G-I35 64 GB OTG Drive  (Black, Type A to Type C)",
    src: "https://rukminim1.flixcart.com/image/416/416/k79dd3k0/pendrive/type-a-to-type-c/n/z/j/sandisk-sdddc3-064g-i35-original-imafpjhvu9yfhfdp.jpeg?q=70",
    desc: "₹699",
  }
]

// 5
const mongoose = require("mongoose");

// 9
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// 10
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

// 11
app.use(passport.initialize());
app.use(passport.session());

// 6
mongoose.connect("mongodb://localhost:27017/MobileDB", {useNewUrlParser: true});

// 7
const MobileSchema = new mongoose.Schema ({
  email: String,
  password: String
});

// 12
MobileSchema.plugin(passportLocalMongoose);

// 8
const User = new mongoose.model("User", MobileSchema);

// 13
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 4
app.get("/", function(request, response) {
    response.render("index");
})

app.get("/home", function(request, response) {
  var today = new Date();
  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }
  var day = today.toLocaleDateString('en-US',options);

  response.render("home", {kindOfDay: day});
})

app.get("/register", function(request, response) {
   response.render("register");
})

app.get("/login", function(request, response) {
   response.render("login");
})

app.get("/forgot", function(request, response, next) {
  response.render("forgot");
})

app.get("/logout", function(request, response) {
  response.render("index");
})

app.get("/mobile", function(request, response) {
  response.render("mobile", {mobilearray: mobilearray});
})

app.get("/tablet", function(request, response) {
  response.render("tablet", {tabletarray: tabletarray});
})

app.get("/pendrive", function(request, response) {
  response.render("pendrive", {pendrivearray: pendrivearray});
})

app.get("/earphone", function(request, response) {
  response.render("earphone", {mobilearray: mobilearray});
})

// 14
app.post("/register", function(request, response) {
    User.register({username: request.body.username}, request.body.password, function(err, user) {
      if ( err )
      {
        console.log(err);
        response.redirect("/register");
      }
      else
      {
        passport.authenticate("local")(request, response, function(){
          response.redirect("/home");
        })
      }
    })
})

// 15
app.post("/login", function(request, response) {
    const user = new User ({
       username: request.body.username,
       password: request.body.password
    })

    request.login(user, function(err){
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(request, response, function(){
        response.redirect("/home");
      });
    }
    })
})

// 3
app.listen(3000, function(request, response) {
    console.log("Server started");
})
