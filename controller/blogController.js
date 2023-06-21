const getAllBlogs = (req,res)=> {
    res.json({data: "all blogs"})
}
const postABlog = (req,res)=> {
    res.json({data: "a blog posted"})
}
const getABlog = (req,res)=> {
    res.json({data: "a blogs"})
}
const updateABlog = (req,res)=> {
    res.json({data: "blog updated"})
}
const deleteABlog = (req,res)=> {
    res.json({data: "blog deleted"})
}

module.exports = {
    getABlog,
    getAllBlogs,
    postABlog,
    updateABlog,
    deleteABlog
}