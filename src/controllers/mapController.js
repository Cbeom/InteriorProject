export const kmap=async (req,res)=>{
    return res.render("map/map",{
        JavaScript_KEY:process.env.JavaScript_KEY
    });
};
