# MongoDB Atlas Configuration for Render Deployment

This guide explains how to configure your MongoDB Atlas cluster to work with Render deployments.

## Issue Summary

Your application is failing to connect to MongoDB Atlas with the error:
```
Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

## Solution: Whitelist Render IP Addresses

To fix this issue, you need to whitelist Render's IP addresses in your MongoDB Atlas cluster.

### Step-by-Step Instructions

1. **Access MongoDB Atlas Dashboard**
   - Go to https://cloud.mongodb.com/
   - Log in to your account
   - Select your cluster

2. **Navigate to Network Access**
   - In the left sidebar, click "Network Access" under the "Security" section

3. **Add IP Addresses**
   - Click the "Add IP Address" button
   - You have two options:

   **Option A: Whitelist Specific Render IPs (Recommended)**
   Add each of these IP ranges:
   - `143.244.208.0/20`
   - `143.244.224.0/20`
   - `136.49.16.0/20`
   - `165.22.224.0/20`

   **Option B: Allow Access From Anywhere (Less Secure)**
   - Click "Add Current IP Address"
   - Change the IP address to `0.0.0.0/0`
   - Add a description like "Render Deployment"
   - Click "Confirm"

4. **Save Changes**
   - Click "Confirm" to save the IP whitelist entries
   - Wait 1-2 minutes for the changes to propagate

## Verify Connection

After updating the IP whitelist:

1. Restart your Render deployment
2. Check the logs to confirm the connection is successful

## Alternative Solutions

If you continue to experience issues:

1. **Check Credentials**
   - Verify your MongoDB username and password in the MONGO_URI
   - Ensure the user has appropriate permissions

2. **Database User Permissions**
   - Make sure your database user has read/write access to your database

3. **Cluster Status**
   - Ensure your MongoDB Atlas cluster is active and not paused

## Security Best Practices

- Use specific IP ranges rather than `0.0.0.0/0` when possible
- Regularly review and update your IP whitelist
- Use strong passwords for database users
- Consider using MongoDB Atlas's private endpoints for production deployments

## Need Help?

If you're still experiencing issues:
1. Check Render logs for specific error messages
2. Verify your MONGO_URI is correctly formatted
3. Test the connection locally using the same URI