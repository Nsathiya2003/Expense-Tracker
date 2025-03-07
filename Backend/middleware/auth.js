const extractBasicAuthHeaders = (header) => {
    if (header && header.startsWith('Basic ')) {
        // Extract the Base64 encoded part (removing the 'Basic ' prefix)
        const base64Credentials = header.split(' ')[1];
        
        // Decode the Base64 string to get 'email:password'
        const credentials = atob(base64Credentials); // Using atob instead of base64.decode
        
        // Split the 'email:password' string by ':' to get email and password
        const [email, password] = credentials.split(':');
        
        // Return the extracted email and password as an array
        return [email, password];
    }
}


// Buffer decode method for node.js

// const extractBasicAuthHeaders = (header) => {
//     if (header && header.startsWith('Basic ')) {
//         // Extract the Base64 encoded part (removing the 'Basic ' prefix)
//         const base64Credentials = header.split(' ')[1];
        
//         // Decode the Base64 string to get 'email:password'
//         const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        
//         // Split the 'email:password' string by ':' to get email and password
//         const [email, password] = credentials.split(':');
        
//         // Return the extracted email and password as an array
//         return [email, password];
//     }
// }
