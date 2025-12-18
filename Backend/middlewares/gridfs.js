// import mongoose from "mongoose";
// import Grid from "gridfs-stream";

// let gfs;
// let gridfsBucket;

// export const initGridFS = () => {
//   const conn = mongoose.connection;
//   gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "resumes",
//   });

//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("resumes");
// };

// export { gfs, gridfsBucket };
