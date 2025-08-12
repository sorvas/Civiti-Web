# Authentication & Authorization Guide

## Overview

The Civica API uses **Supabase Auth** with **JWT Bearer tokens** for authentication. This provides a secure, scalable authentication system that works seamlessly between the Vercel frontend and Railway backend.

## How Authentication Works

### 1. Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend (Vercel)
    participant Supabase Auth
    participant Backend API (Railway)
    
    User->>Frontend: Login with email/password or Google OAuth
    Frontend->>Supabase Auth: Authenticate user
    Supabase Auth-->>Frontend: Return JWT token
    Frontend->>Backend API: API request with Bearer token
    Backend API->>Supabase Auth: Validate JWT token
    Supabase Auth-->>Backend API: Token valid
    Backend API-->>Frontend: Return protected data
```

### 2. Current Implementation

#### Backend Configuration (Railway)

The backend validates JWT tokens from Supabase:

```csharp
// Program.cs - JWT Bearer Authentication Setup
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = supabaseUrl; // https://cmkznjhbwmcgtbnynkft.supabase.co
        options.Audience = "authenticated";
        options.RequireHttpsMetadata = builder.Environment.IsProduction();
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
            ValidIssuer = supabaseUrl,
            ValidAudience = "authenticated"
        };
    });
```

#### Authorization Policies

Two authorization policies are configured:

```csharp
// Admin-only endpoints
options.AddPolicy(AuthorizationPolicies.AdminOnly, policy =>
    policy.RequireClaim(AuthorizationPolicies.Claims.Role, AuthorizationPolicies.Roles.Admin));

// User-only endpoints  
options.AddPolicy(AuthorizationPolicies.UserOnly, policy =>
    policy.RequireClaim(AuthorizationPolicies.Claims.Role, AuthorizationPolicies.Roles.User));
```

#### Protected Endpoints

Endpoints are protected using authorization attributes:

```csharp
// Public endpoint - no authentication required
app.MapGet("/api/issues", ...) // Anyone can view issues

// User authentication required
app.MapPost("/api/issues", ...)
    .RequireAuthorization(); // Must be logged in

// Admin-only endpoint
app.MapGet("/api/admin/pending-issues", ...)
    .RequireAuthorization(AuthorizationPolicies.AdminOnly); // Must be admin
```

### 3. Frontend Configuration (Vercel)

The frontend (Angular) needs to:

1. **Initialize Supabase client** with the same project credentials
2. **Handle user authentication** (login/signup)
3. **Include JWT token** in all API requests

#### Angular Service Example

```typescript
// auth.service.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export class AuthService {
  private supabase: SupabaseClient;
  
  constructor() {
    this.supabase = createClient(
      'https://cmkznjhbwmcgtbnynkft.supabase.co',
      'sb_publishable_sUUdTuFo0ijwbIgi1ybMbA_iU6iIzV-' // Anon key (public)
    );
  }
  
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (data.session) {
      // Store the JWT token
      localStorage.setItem('access_token', data.session.access_token);
    }
    return { data, error };
  }
  
  async signInWithGoogle() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    return { data, error };
  }
  
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
```

#### HTTP Interceptor for API Calls

```typescript
// auth.interceptor.ts
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('access_token');
    
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    
    return next.handle(req);
  }
}
```

## Local Development Setup

### Prerequisites

1. **Same Supabase Project**: Both frontend and backend must use the same Supabase project
2. **Environment Variables**: Configure both apps with Supabase credentials
3. **CORS Configuration**: Backend must allow frontend origin

### Backend Setup (Local)

#### 1. Configure appsettings.Development.json

```json
{
  "Supabase": {
    "Url": "https://cmkznjhbwmcgtbnynkft.supabase.co",
    "AnonKey": "sb_publishable_sUUdTuFo0ijwbIgi1ybMbA_iU6iIzV-"
  },
  "Cors": {
    "AllowedOrigins": ["http://localhost:4200"]
  },
  "ConnectionStrings": {
    "PostgreSQL": "Host=localhost;Port=5432;Database=civica_dev;Username=postgres;Password=postgres"
  }
}
```

#### 2. Run Backend API

```bash
cd Civica.Api
dotnet run --launch-profile "Civica.Api"
# API runs on http://localhost:8080
```

### Frontend Setup (Local)

#### 1. Configure environment.ts

```typescript
// environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  supabase: {
    url: 'https://cmkznjhbwmcgtbnynkft.supabase.co',
    anonKey: 'sb_publishable_sUUdTuFo0ijwbIgi1ybMbA_iU6iIzV-'
  }
};
```

#### 2. Update Angular Services

```typescript
// api.service.ts
export class ApiService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}
  
  getIssues() {
    return this.http.get(`${this.apiUrl}/issues`);
  }
  
  createIssue(issue: any) {
    // This will automatically include the Bearer token via interceptor
    return this.http.post(`${this.apiUrl}/issues`, issue);
  }
}
```

#### 3. Run Frontend

```bash
cd civica-frontend
npm install
ng serve
# Frontend runs on http://localhost:4200
```

## Testing Authentication Locally

### 1. Test with Swagger UI

1. Navigate to http://localhost:8080/swagger
2. Click "Authorize" button
3. Enter a valid JWT token from Supabase
4. Test protected endpoints

### 2. Get a Test Token

#### Option A: Use Supabase Dashboard

1. Go to https://supabase.com/dashboard/project/cmkznjhbwmcgtbnynkft/auth/users
2. Create a test user or use existing
3. Use the Supabase client library to get a token

#### Option B: Create Test Script

```javascript
// test-auth.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://cmkznjhbwmcgtbnynkft.supabase.co',
  'sb_publishable_sUUdTuFo0ijwbIgi1ybMbA_iU6iIzV-'
);

async function getTestToken() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'test@example.com',
    password: 'testpassword123'
  });
  
  if (data.session) {
    console.log('Token:', data.session.access_token);
    console.log('\nUse this in Swagger UI or Postman');
  } else {
    console.error('Error:', error);
  }
}

getTestToken();
```

### 3. Test with Postman

1. Create a new request to http://localhost:8080/api/issues
2. Add header: `Authorization: Bearer YOUR_JWT_TOKEN`
3. Send request

### 4. Test with cURL

```bash
# Public endpoint (no auth required)
curl http://localhost:8080/api/issues

# Protected endpoint (auth required)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:8080/api/user/profile

# Admin endpoint (admin role required)
curl -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
     http://localhost:8080/api/admin/pending-issues
```

## Production Deployment

### Vercel Frontend Configuration

Set environment variables in Vercel dashboard:

```bash
NEXT_PUBLIC_API_URL=https://civica-api.railway.app/api
NEXT_PUBLIC_SUPABASE_URL=https://cmkznjhbwmcgtbnynkft.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_sUUdTuFo0ijwbIgi1ybMbA_iU6iIzV-
```

### Railway Backend Configuration

Set environment variables in Railway dashboard:

```bash
SUPABASE_URL=https://cmkznjhbwmcgtbnynkft.supabase.co
SUPABASE_ANON_KEY=sb_publishable_sUUdTuFo0ijwbIgi1ybMbA_iU6iIzV-
DATABASE_URL=postgresql://...
```

Update CORS in appsettings.json for production:

```json
{
  "Cors": {
    "AllowedOrigins": [
      "https://civica.vercel.app",
      "https://civica.ro"
    ]
  }
}
```

## Security Best Practices

### 1. Token Security

- **Never expose service keys** - Only use anon key in frontend
- **Use HTTPS in production** - Tokens should only be sent over encrypted connections
- **Implement token refresh** - Tokens should expire and be refreshed automatically
- **Store tokens securely** - Use httpOnly cookies or secure storage

### 2. CORS Configuration

- **Restrict origins** - Only allow specific frontend domains
- **Don't use wildcards** in production - Explicitly list allowed origins
- **Include credentials** carefully - Only when necessary

### 3. Role-Based Access

- **Implement proper roles** in Supabase Auth
- **Validate roles** on both frontend and backend
- **Use policies** for fine-grained access control

## Troubleshooting

### Common Issues

#### 1. "401 Unauthorized" Error

**Causes:**
- Token expired
- Token not included in request
- Wrong Supabase project

**Solution:**
- Check token expiration
- Verify Authorization header is set
- Confirm Supabase URLs match

#### 2. CORS Errors

**Causes:**
- Frontend origin not in allowed list
- Credentials not configured properly

**Solution:**
- Add frontend URL to CORS allowed origins
- Ensure `AllowCredentials()` is set in CORS policy

#### 3. "403 Forbidden" on Admin Endpoints

**Causes:**
- User doesn't have admin role
- Role claim not included in JWT

**Solution:**
- Set user role in Supabase Auth metadata
- Verify JWT contains role claim

### Debug Authentication

Enable detailed logging in backend:

```csharp
// Program.cs
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                Log.Error("Authentication failed: {Error}", context.Exception);
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                Log.Information("Token validated for user: {User}", 
                    context.Principal?.Identity?.Name);
                return Task.CompletedTask;
            }
        };
    });
```

## Quick Reference

### Environment Variables

#### Frontend (Vercel)
```bash
NEXT_PUBLIC_API_URL=https://civica-api.railway.app/api
NEXT_PUBLIC_SUPABASE_URL=https://cmkznjhbwmcgtbnynkft.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_sUUdTuFo0ijwbIgi1ybMbA_iU6iIzV-
```

#### Backend (Railway)
```bash
SUPABASE_URL=https://cmkznjhbwmcgtbnynkft.supabase.co
SUPABASE_ANON_KEY=sb_publishable_sUUdTuFo0ijwbIgi1ybMbA_iU6iIzV-
DATABASE_URL=postgresql://...
```

### Local Development URLs

- **Backend API**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger
- **Frontend**: http://localhost:4200
- **Supabase Dashboard**: https://supabase.com/dashboard/project/cmkznjhbwmcgtbnynkft

### API Endpoint Protection Levels

| Endpoint | Protection | Required Role |
|----------|------------|---------------|
| GET /api/issues | Public | None |
| POST /api/issues | Authenticated | User |
| GET /api/user/profile | Authenticated | User |
| GET /api/admin/pending-issues | Authenticated | Admin |
| PUT /api/admin/issues/{id}/approve | Authenticated | Admin |

## Next Steps

1. **Set up Supabase Auth** in the Angular frontend
2. **Configure HTTP interceptor** for automatic token inclusion
3. **Test authentication flow** end-to-end
4. **Implement token refresh** mechanism
5. **Add role management** UI for admins
6. **Set up monitoring** for authentication failures