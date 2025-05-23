import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
    const query = req.query;
  
    try {
      const posts = await prisma.post.findMany({
        where: {
          city: query.city || undefined,
          type: query.type || undefined,
          property: query.property || undefined,
          bedroom: parseInt(query.bedroom) || undefined,
          price: {
            gte: parseInt(query.minPrice) || undefined,
            lte: parseInt(query.maxPrice) || undefined,
          },
        },
      });
  
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get posts" });
    }
};

export const getPost = async (req, res) =>{
    const id = req.params.id;
    try{
        const post = await prisma.post.findUnique({
            where:{id},
            include: {
                postDetail: true,
                user: {
                    select:{
                        username: true,
                        avatar:true
                    }
                },
            }
        })
        res.status(200).json(post) 
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to get any post"})
    }
}

export const addPost = async (req, res) =>{
    const body = req.body;
    const tokenUserId = req.userId;
    console.log(body);
    try{
        const newPost = await prisma.post.create({ 
            data:{
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                  create: body.postDetail,
                },
            }
        })
        res.status(200).json(newPost)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to create any post"})
    }
}

export const updatePost = async (req, res) =>{
    try{
        //const posts = await prisma.post.findMany()
        res.status(200).json()
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to update your post"})
    }
}

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { postDetail: true }, 
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // if (post.userId !== tokenUserId) {
    //   return res.status(403).json({ message: "Not Authorized!" });
    // }

    if (post.postDetail) {
      await prisma.postDetail.delete({
        where: { id: post.postDetail.id }
      });
    }

    await prisma.post.delete({
      where: { id }
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};