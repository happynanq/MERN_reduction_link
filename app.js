const expess = require("express")
const config  = require("config")
const path = require("path")
const {connect} = require("mongoose")
const app = expess()

const PORT = config.get("PORT") || 5000

app.use(expess.json({extended:true}))
app.use("/api/link", require("./routes/link.routes"))
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/t", require("./routes/redirect.routes"))

if(process.env.NODE_ENV === "production"){
  app.use("/", express.static(path.join(__dirname, "client","build")))

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  } )
}


async function start (){
  //n2HhsyskyOhKoWpX
  app.listen(PORT, async()=>{
    try {
      await connect(config.get("mongoURI"), {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
      })
      console.log("Application has been started on port: " + PORT )

    } catch (e) {
      console.log("Server Error ",e.message)
      process.exit(1)
    }

  })
}
start()