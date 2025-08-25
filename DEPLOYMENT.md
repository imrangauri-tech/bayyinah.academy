# Deployment Guide for Bayyinah Academy

## Vercel Deployment Setup

### Environment Variables

When deploying to Vercel, you need to configure the following environment variables in your Vercel dashboard:

#### Brevo Email Service Configuration
```
BREVO_API_KEY=your_brevo_api_key_here
```

#### Email Configuration
```
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Bayyinah Academy
```

#### Notification Email Addresses
```
NOTIFY_TRIAL=admin@yourdomain.com
NOTIFY_TRIAL_2=backup@yourdomain.com
NOTIFY_TEACHER=hr@yourdomain.com
NOTIFY_TEACHER_2=backup@yourdomain.com
NOTIFY_STUDENT=admissions@yourdomain.com
NOTIFY_STUDENT_2=backup@yourdomain.com
NOTIFY_CONTACT=support@yourdomain.com
NOTIFY_CONTACT_2=backup@yourdomain.com
NOTIFY_CALLBACK=sales@yourdomain.com
NOTIFY_CALLBACK_2=backup@yourdomain.com
NOTIFY_NEWSLETTER=marketing@yourdomain.com
FAQ_INBOUND=support@yourdomain.com
FAQ_INBOUND_2=backup@yourdomain.com
```

#### Brevo Contact Lists
Get these list IDs from your Brevo dashboard:
```
BREVO_LIST_NEWSLETTER=1
BREVO_LIST_TRIAL=2
BREVO_LIST_STUDENT=3
BREVO_LIST_TEACHER=4
BREVO_LIST_CONTACT=5
BREVO_LIST_CALLBACK=6
BREVO_LIST_QUESTION=7
```

#### Brevo Email Templates
Get these template IDs from your Brevo dashboard:
```
BREVO_TEMPLATE_WELCOME=1
BREVO_TEMPLATE_TRIAL_CONFIRMATION=2
BREVO_TEMPLATE_TRIAL_ADMIN_NOTIFICATION=3
BREVO_TEMPLATE_COURSE_ENROLLMENT=4
BREVO_TEMPLATE_CONTACT_CONFIRMATION=5
BREVO_TEMPLATE_STUDENT_WELCOME=6
BREVO_TEMPLATE_TEACHER_AUTO_RESPONSE=7
BREVO_TEMPLATE_TEACHER_ADMIN_NOTIFICATION=8
BREVO_TEMPLATE_STUDENT_ADMIN_NOTIFICATION=9
BREVO_TEMPLATE_CALLBACK_ADMIN_NOTIFICATION=10
```

### Deployment Steps

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   - In your Vercel project dashboard, go to Settings → Environment Variables
   - Add all the environment variables listed above
   - Make sure to set them for all environments (Production, Preview, Development)

4. **Update Domain Configuration**
   - After deployment, update the `metadataBase` URL in `src/app/layout.tsx` to match your actual Vercel domain
   - Replace `https://bayyinah-production.vercel.app` with your actual domain

5. **Test Your Deployment**
   - Test all forms (contact, trial, student registration, teacher application)
   - Verify email notifications are working
   - Check that blog routing is working correctly

### Custom Domain Setup (Optional)

If you want to use a custom domain:

1. **Add Domain in Vercel**
   - Go to your project settings → Domains
   - Add your custom domain

2. **Update DNS Records**
   - Point your domain to Vercel's nameservers or add CNAME records as instructed

3. **Update Metadata Base**
   - Change the production URL in `src/app/layout.tsx` to your custom domain

### Important Notes

- All environment variables must be set in Vercel for the application to work properly
- Email notifications require valid Brevo configuration
- Make sure your Brevo account has sufficient email credits
- Test thoroughly in preview deployments before going live

### Troubleshooting

If you encounter issues:

1. Check Vercel function logs for errors
2. Verify all environment variables are set correctly
3. Ensure Brevo API key has proper permissions
4. Test email templates in Brevo dashboard first
