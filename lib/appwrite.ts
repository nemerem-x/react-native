// import SignIn from '@/app/(auth)/sign-in';
import { config } from 'process';
import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.nemerem.aora",
  projectId: "669afb9900026cd8101d",
  databaseId: "669afd30002689f6fafa",
  userCollectionId: "669afd85002f4b73d846",
  videoCollectionId: "669afdca0008c71065c0",
  storageId: "669b0122003be2c1279f"
}

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
  ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (username: string, email: string, password: string) => {
  // Register User
  try {
    const newAccount = await account.create(
      ID.unique(), email, password, username
    )

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    )

    return newUser;

  } catch (error: any) {
    console.log(error);
    throw new Error(error);

  }

}

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error: any) {
    throw new Error(error);
  }
}


export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    )
    return posts.documents;
  } catch (error: any) {
    throw new Error(error)
  }
}