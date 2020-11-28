// const products = [
//   {
//     id: "abcdefjk",
//     name: "abc",
//     price: 4000,
//     image:
//       "https://thumbs-prod.si-cdn.com/MXRigU6qbW9_2nLwBvXywDRQJ24=/1072x720/filters:no_upscale()/https://public-media.si-cdn.com/filer/91/91/91910c23-cae4-46f8-b7c9-e2b22b8c1710/lostbook.jpg",
//     catogery: ["story", "fantasy"],
//     description: "some text",
//   },
//   {
//     id: "abcdefjj",
//     name: "cde",
//     price: 2000,
//     image:
//       "https://www.incimages.com/uploaded_files/image/1920x1080/getty_690360222_20001333165376734769_408521.jpg",
//     catogery: ["story", "fantasy"],
//     description: "expensive",
//   },
//   {
//     id: "abcdefjl",
//     name: "alo",
//     price: 5000,
//     image:
//       "https://www.incimages.com/uploaded_files/image/1920x1080/getty_690360222_20001333165376734769_408521.jpg",
//     catogery: ["story", "fantasy"],
//     description: "expensive",
//   },
//   {
//     id: "abcdefjm",
//     name: "qwerty",
//     price: 1500,
//     image:
//       "https://www.incimages.com/uploaded_files/image/1920x1080/getty_690360222_20001333165376734769_408521.jpg",
//     catogery: ["story", "fantasy"],
//     description: "expensive",
//   },
// ];

const Book = require("../databases/book");

module.exports = {
  getAllBook: async () => {
    const books = await Book.find({});
    console.log(books);
    return books;
  },
};
