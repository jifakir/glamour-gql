const User = require("../../models/User");
const Product = require("../../models/Product");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { ApolloError } = require("apollo-server-core");

module.exports.resolvers = {
    Query: {
      products: async () => await Product.find(),
      product: async (_, arg) => await Product.findById(arg.id),
      users: async () => await User.find()
    },
    Mutation: {
      // * Adding a user
      addUser: async (_,{name, email, password}) => {
        const userExist = await User.findOne({email});
        if(userExist){
          return new Error("User already exist")
        }
        const createUser = new User({
          name,
          email,
          password: md5(password),
          created_at: Date.now(),
          updated_at: Date.now()
        });
        return await createUser.save();
      },
      // ! Deleting User
      removeUser: async (_, {id}) => {
        return await User.findByIdAndDelete(id);
      },
      // * Login Function
      login: async (_, {email, password}) => {
        const userProfile = await User.findOne({email});
        if(!userProfile){
          throw new Error("Invalid Email");
        }
        if(userProfile.password !== md5(password)){
          throw new Error("Invalid Password or Email");
        };
        const token = jwt.sign({id: userProfile._id, name: userProfile.name, email: userProfile.email},"jwtsecretkey");
        console.log("UserProfile: ", userProfile);
        return { id: userProfile._id, name: userProfile.name, email: userProfile.email, token}

      },
      // * creating Product
      addProduct: async (_, arg) => {
        // console.log(arg);
        const productExist = await Product.findOne({sku: arg.sku});
        if(productExist){
          throw new ApolloError("Product Already Exist");
        }
        const createProduct = new Product({...arg, created_at: Date.now(), updated_at: Date.now()});
        // console.log("Create Product",createProduct);
        return await createProduct.save();
        
      }
    }
  };

