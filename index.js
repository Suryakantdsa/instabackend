const express=require("express")
const cors=require("cors")
const {v4:uniqKeyGenerate}=require("uuid")
const mongoose=require("mongoose")
const path=require("path")
const fileUpload = require("express-fileupload")
const {postSchema}=require("./models/Posts")
const uri="mongodb+srv://Suryakant:Suryadas@cluster0.mydbwj6.mongodb.net/?retryWrites=true&w=majority"

const app=express()

const port=8030 || process.env.PORT

// app.use(cors())
app.use(cors())
app.use(express.json());
app.use(fileUpload())

mongoose.set('strictQuery', true)

mongoose.connect(uri,(err)=>{
    if(err) {
        console.log("Connection to mongodb failed")
    }
    else{
        console.log("Connected to mongoDB successfully")
    }
        
})

app.listen(port,()=>{
    console.log("Runing on port ",port)
})
// app.get('/',async(req,res)=>{
//     const data=await postSchema.find()
//     if(data){
//         res.send(data)
//         console.log(data)
//     }
//     else{
//         res.json({status:"failed"})
//     }
// })


app.get('/view',async(req,res)=>{
    const data=await postSchema.find()
    if(data){
        res.send(data)
        console.log(data)
    }
    else{
        res.json({status:"failed"})
    }
})
app.post("/add", (req, res) => {
    const {name,location,description}=req.body
    const {image}=req.files    
    // console.log(req.files.image)
    console.log(image)

    // console.log(name,location,description)
    // res.send("pused ok")
   
    const fragments = image.name.split(".")
    const fileExt = fragments[fragments.length - 1]
    const uniqKey = uniqKeyGenerate()
    const fileName = uniqKey + "." + fileExt
    if(["jpeg","jpg",'png','svg'].includes(fileExt))
    {
        image.mv("./uploads/" + fileName,async(err)=>{
            if(err){
                res.json({message:err})
            }
            else{
                const like=parseInt(Math.random()*1000)
                const user=new postSchema({
                    name,
                    location,
                    description,
                    image:fileName,
                    likes:like,
                })
                try{
                    const response=await user.save()
                    res.json({message:response})
                    }
                    // res.send(user)
            
                catch(e){
                    res.json({message:e})
                }
            }
        })
    }
    else{
        res.json({message:'please upload an image file'})
    }

})
app.get("/image/:filename", (req, resp) => {
    resp.sendFile(path.join(__dirname, `/uploads/${req.params.filename}`))
})



