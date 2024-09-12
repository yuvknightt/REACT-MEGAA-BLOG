import conf from "../conf/conf";
import {Client , Account , ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;


    constructor(){
        this.client
           .setEndpoint(conf.appwriteUrl)
           .setProject(conf.appwriteProjectIdprojectId);
        this.account = new Account(this.client);   
    }

    async createAccount({email,password,name}){
        try{
         const userAccount = await this.account.create(ID.unique(),email,password,name)
       if(userAccount){
        // if it exist then make him login
         return this.login({email,password});
       }
       else{
        return userAccount;
       }  
        } catch(error){
            throw error;
        }
 
 
    }

    async login({email,password}){
       try {
       return await this.account.createEmailSession(email,password);
       } catch (error) {
        throw error;
       }
    }

    async getCurrentUser(){
        try {
           return await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }
}

// we can export by making object so that all the functionality can be used upon it .

const authService = new AuthService();

export default authService
