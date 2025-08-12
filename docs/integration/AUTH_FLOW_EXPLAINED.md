# Authentication & Authorization Flow - Complete Explanation

## 🔐 How Authentication Works in Your Railway App

### The Complete Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend (Vercel)
    participant Supabase Auth
    participant Railway API
    participant JWT Validator

    User->>Frontend: 1. Login (email/password)
    Frontend->>Supabase Auth: 2. Authenticate
    Supabase Auth-->>Frontend: 3. Return JWT token
    Frontend->>Railway API: 4. API call with Bearer token
    Railway API->>JWT Validator: 5. Validate token
    JWT Validator->>Supabase Auth: 6. Verify signature
    Supabase Auth-->>JWT Validator: 7. Token valid
    Railway API-->>Frontend: 8. Return protected data
```

## Step-by-Step Breakdown

### Step 1: User Login (Frontend)

User provides credentials on your Vercel frontend:

```typescript
// Frontend code
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});

// This returns a JWT token
const token = data.session.access_token;
// Token looks like: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Step 2: Supabase Creates JWT Token

Supabase generates a JWT containing:

```json
{
  "sub": "user-uuid-12345",           // User ID
  "email": "user@example.com",        
  "role": "authenticated",            // Or custom role
  "user_metadata": {
    "role": "admin"                   // Custom claims
  },
  "aud": "authenticated",
  "iat": 1705320000,                  // Issued at
  "exp": 1705323600                   // Expires at (1 hour)
}
```

### Step 3: Frontend Stores Token

```typescript
// Token is stored (localStorage, sessionStorage, or memory)
localStorage.setItem('access_token', token);
```

### Step 4: Frontend Makes API Call

Every API request includes the token:

```typescript
// Angular HTTP Interceptor automatically adds this
const response = await fetch('https://your-app.railway.app/api/issues', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### Step 5: Railway API Receives Request

Your Railway API receives the request and the authentication middleware kicks in:

```csharp
// This happens automatically in your Program.cs configuration
app.UseAuthentication(); // Validates the JWT token
app.UseAuthorization();  // Checks user permissions
```

### Step 6: JWT Validation Process

Here's what happens inside your Railway API:

```csharp
// Program.cs - Your current configuration
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // 1. Where to get the public key to verify signature
        options.Authority = "https://cmkznjhbwmcgtbnynkft.supabase.co";
        
        // 2. Expected audience claim in the token
        options.Audience = "authenticated";
        
        // 3. Validation parameters
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,  // Verify signature
            ValidateIssuer = true,             // Verify who issued it
            ValidateAudience = true,           // Verify intended audience
            ValidateLifetime = true,           // Check if expired
            ClockSkew = TimeSpan.Zero,        // No time tolerance
            ValidIssuer = supabaseUrl,
            ValidAudience = "authenticated"
        };
    });
```

## 🔍 What Actually Happens During Validation

### 1. Extract Token from Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                      This part is extracted
```

### 2. Decode Token (Without Verification First)
The JWT has three parts separated by dots:
- **Header**: Algorithm and token type
- **Payload**: User claims and data
- **Signature**: Cryptographic signature

### 3. Get Supabase's Public Key
Your API fetches Supabase's public key from:
```
https://cmkznjhbwmcgtbnynkft.supabase.co/.well-known/jwks.json
```

### 4. Verify Signature
Using the public key, verify that:
- The token was actually issued by Supabase
- The token hasn't been tampered with

### 5. Validate Claims
Check that:
- `iss` (issuer) = `https://cmkznjhbwmcgtbnynkft.supabase.co`
- `aud` (audience) = `authenticated`
- `exp` (expiration) > current time
- `nbf` (not before) < current time

### 6. Create User Principal
If valid, create a user identity:
```csharp
// This happens automatically, creating HttpContext.User
var userId = User.FindFirst("sub")?.Value;        // User ID
var email = User.FindFirst("email")?.Value;       // Email
var role = User.FindFirst("role")?.Value;         // Role
```

## 🛡️ Authorization (After Authentication)

### Endpoint Protection Levels

#### 1. Public Endpoints (No Authentication)
```csharp
app.MapGet("/api/issues", async (IIssueService service) =>
{
    // No [Authorize] attribute - anyone can access
    return await service.GetAllAsync();
});
```

#### 2. Authenticated Users Only
```csharp
app.MapPost("/api/issues", async (CreateIssueRequest request, IIssueService service) =>
{
    // User must be logged in
    return await service.CreateAsync(request);
})
.RequireAuthorization(); // ← This requires valid JWT
```

#### 3. Admin Only
```csharp
app.MapGet("/api/admin/pending-issues", async (IAdminService service) =>
{
    // User must have admin role
    return await service.GetPendingIssuesAsync();
})
.RequireAuthorization(AuthorizationPolicies.AdminOnly); // ← Requires admin role
```

### How Roles Are Checked

Your authorization policies:
```csharp
// In Program.cs
options.AddPolicy(AuthorizationPolicies.AdminOnly, policy =>
    policy.RequireClaim("role", "admin"));
```

This checks if the JWT contains:
```json
{
  "role": "admin",
  // or
  "user_metadata": {
    "role": "admin"
  }
}
```

## 🔄 The Complete Request Lifecycle

### Successful Request:
```
1. Frontend: GET https://api.railway.app/api/user/profile
   Headers: Authorization: Bearer eyJhbG...

2. Railway API: 
   - Extract token ✓
   - Validate with Supabase public key ✓
   - Check expiration ✓
   - Check audience ✓
   - User authenticated ✓

3. Check authorization:
   - Endpoint requires: User role ✓
   - User has: authenticated role ✓
   - Access granted ✓

4. Execute endpoint logic:
   - Get user ID from token
   - Query database
   - Return user profile

5. Response: 200 OK
   {
     "id": "123",
     "email": "user@example.com",
     "points": 150
   }
```

### Failed Request (No Token):
```
1. Frontend: GET https://api.railway.app/api/user/profile
   Headers: (no Authorization header)

2. Railway API:
   - No token found ✗
   
3. Response: 401 Unauthorized
   {
     "error": "Missing authentication token"
   }
```

### Failed Request (Invalid Token):
```
1. Frontend: GET https://api.railway.app/api/user/profile
   Headers: Authorization: Bearer invalid-token

2. Railway API:
   - Extract token ✓
   - Validate signature ✗ (doesn't match Supabase's signature)
   
3. Response: 401 Unauthorized
   {
     "error": "Invalid token"
   }
```

### Failed Request (Expired Token):
```
1. Frontend: GET https://api.railway.app/api/user/profile
   Headers: Authorization: Bearer eyJhbG... (expired)

2. Railway API:
   - Extract token ✓
   - Validate signature ✓
   - Check expiration ✗ (exp < current time)
   
3. Response: 401 Unauthorized
   {
     "error": "Token expired"
   }
```

### Failed Request (Wrong Role):
```
1. Frontend: GET https://api.railway.app/api/admin/pending-issues
   Headers: Authorization: Bearer eyJhbG... (user role, not admin)

2. Railway API:
   - Token valid ✓
   - User authenticated ✓
   - Check authorization:
     - Endpoint requires: admin role
     - User has: user role ✗
   
3. Response: 403 Forbidden
   {
     "error": "Insufficient permissions"
   }
```

## 🔑 Key Security Features

### 1. Stateless Authentication
- No sessions stored on server
- Each request is independently verified
- Scalable across multiple servers

### 2. Cryptographic Security
- Tokens are signed with RS256 or HS256
- Only Supabase has the private key
- Your API only has the public key (for verification)

### 3. Automatic Expiration
- Tokens expire (usually 1 hour)
- Frontend must refresh tokens
- Reduces risk if token is compromised

### 4. Role-Based Access Control (RBAC)
- Different permission levels
- Checked on every request
- Defined in your authorization policies

## 🧪 Testing Authentication

### Test with cURL:

```bash
# 1. Get a token (use test-auth.html or Supabase dashboard)
TOKEN="eyJhbGciOiJIUzI1NiIs..."

# 2. Test public endpoint (no auth needed)
curl https://your-app.railway.app/api/health

# 3. Test protected endpoint (auth required)
curl -H "Authorization: Bearer $TOKEN" \
     https://your-app.railway.app/api/user/profile

# 4. Test admin endpoint (admin role required)
curl -H "Authorization: Bearer $TOKEN" \
     https://your-app.railway.app/api/admin/pending-issues
```

### Test with Swagger:
1. Go to: `https://your-app.railway.app/swagger`
2. Click "Authorize" button
3. Paste your JWT token
4. Try different endpoints

## 🚨 Common Issues and Solutions

### Issue: "401 Unauthorized"
**Causes:**
- Token missing
- Token expired
- Token from different Supabase project

**Debug:**
```csharp
// Add logging to see what's happening
options.Events = new JwtBearerEvents
{
    OnAuthenticationFailed = context =>
    {
        Log.Error("Auth failed: {Error}", context.Exception);
        return Task.CompletedTask;
    }
};
```

### Issue: "403 Forbidden"
**Causes:**
- User authenticated but wrong role
- Role claim not in token

**Debug:**
```csharp
// Check user claims
app.MapGet("/debug/claims", (HttpContext context) =>
{
    var claims = context.User.Claims.Select(c => new { c.Type, c.Value });
    return Results.Ok(claims);
}).RequireAuthorization();
```

### Issue: CORS Errors
**Solution:**
Ensure frontend domain is allowed:
```csharp
policy.WithOrigins("https://your-frontend.vercel.app")
```

## 📊 Summary

Your Railway API authentication:
1. **Never stores passwords** - Supabase handles that
2. **Validates every request** - No trust without verification
3. **Uses industry standards** - JWT with RS256/HS256
4. **Stateless and scalable** - Works across multiple instances
5. **Role-based security** - Different access levels

The beauty is that once configured (which you've already done), it all happens automatically for every request!