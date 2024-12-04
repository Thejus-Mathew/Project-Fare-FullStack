const projects = require("../Models/projectSchema")


// add project

exports.addProject=async(req,res)=>{
    console.log("inside add projects");
    const {title,languages,github,website,overview}=req.body
    const projectImage = req.file.filename
    const userId = req.payload
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exists in our collection... add another project")
        }else{
            const newProject = new projects ({title,languages,github,website,overview,projectImage,userId})
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch{
        res.status(401).json(err)
    }
}

// get Home projects

exports.getHomeProjects = async (req,res)=>{
    console.log("inside get Home projects")
    try{
        const allProjects = await projects.find().limit(3)
        res.status(200).json(allProjects)
    }
    catch(err){
        res.status(401).json(err)
    }
    
}

// get User projects

exports.getUserProjects = async (req,res)=>{
    console.log("inside get User projects")
    const userId = req.payload
    try{
        const allProjects = await projects.find({userId})
        res.status(200).json(allProjects)
    }
    catch(err){
        res.status(401).json(err)
    }
    
}

// get All Projects

exports.getAllProjects = async (req,res)=>{
    console.log("inside get All projects")
    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        languages:{$regex:searchKey,$options:"i"}
    }
    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    }
    catch(err){
        res.status(401).json(err)
    }
    
}


// edit Project

exports.editUserProject = async(req,res)=>{
    console.log("inside edit user projects");
    const {title,languages,github,website,overview,projectImage}=req.body
    const uploadImage = req.file?.filename?req.file.filename:projectImage
    const userId = req.payload
    const {pid} = req.params

    try{
        const updateProject = await projects.findByIdAndUpdate(
            {_id:pid},
            {title,languages,github,website,overview,projectImage: uploadImage,userId},
            {new:true}
        )

        await updateProject.save()
        res.status(200).json(updateProject)
    }catch(err){
        res.status(401).json(err)
    }
}

// delete project

exports.deleteUserProject = async (req,res)=>{
    const {pid} = req.params
    try{
        const deleteData = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteData)
    }catch(err){
        res.status(401).json(err)
    }
}
